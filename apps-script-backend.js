/**
 * Google Apps Script Backend for Appointment Booking System
 *
 * ISSUES FIXED:
 * 1. YEAR-WISE SHEET STORAGE - Appointments now stored in year-specific sheets (e.g., "2026")
 * 2. BRANCH DATA SAVED - Branch field now correctly mapped to Column I
 * 3. VALIDATION API FIXED - getBookedSlots now returns date, branch, AND time for proper slot validation
 */

// Configuration
const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID_HERE"; // Replace with your Google Sheet ID

/**
 * Main entry point for POST requests (create appointment)
 */
function doPost(e) {
  try {
    const sheet = getOrCreateYearSheet(e);

    // Parse incoming JSON data
    const data = JSON.parse(e.postData.contents);

    // Validate required fields
    if (!data.name || !data.phone || !data.branch || !data.date || !data.time) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: "Missing required fields" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Prepare row data: Name, Phone, Email, Service, Date, Time, Message, Timestamp, Branch
    // Sheet columns: A=Name, B=Phone, C=Email, D=Service, E=Date, F=Time, G=Message, H=Timestamp, I=Branch
    const rowData = [
      data.name,                  // A: Name
      data.phone,                // B: Phone
      data.email || "",          // C: Email
      data.service || "",        // D: Service
      data.date,                  // E: Date
      data.time,                // F: Time
      data.message || "",        // G: Message
      new Date().toISOString(),  // H: Timestamp
      data.branch                // I: Branch (FIX #2 - was not being saved)
    ];

    sheet.appendRow(rowData);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: "Appointment saved" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Main entry point for GET requests (fetch booked slots)
 */
function doGet(e) {
  try {
    const action = e.parameter.action;

    if (action === "getBookedSlots") {
      return getBookedSlots(e);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ error: "Invalid action" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * FIX #1: YEAR-WISE SHEET STORAGE
 *
 * Extracts year from appointment date and finds/creates the appropriate sheet.
 *
 * @param {Object} e - The event object containing appointment data
 * @returns {Sheet} - The year-specific sheet
 */
function getOrCreateYearSheet(e) {
  const data = JSON.parse(e.postData.contents);

  // FIX: Extract year from appointment date field, NOT current date
  // Expected date format: "YYYY-MM-DD" or "DD/MM/YYYY" - adjust parsing as needed
  const appointmentDate = data.date;
  let year;

  // Handle different date formats
  if (appointmentDate.includes("-")) {
    // Format: YYYY-MM-DD
    year = appointmentDate.split("-")[0];
  } else if (appointmentDate.includes("/")) {
    // Format: DD/MM/YYYY or MM/DD/YYYY
    const parts = appointmentDate.split("/");
    year = parts.length === 3 ? parts[2] : new Date().getFullYear().toString();
  } else {
    // Fallback: try to parse as Date
    year = new Date(appointmentDate).getFullYear().toString();
  }

  // Get the spreadsheet
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(year);

  // FIX: Create new year sheet if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(year);
    // Add headers for the new year sheet
    sheet.getRange(1, 1, 1, 9).setValues([["Name", "Phone", "Email", "Service", "Date", "Time", "Message", "Timestamp", "Branch"]]);
    sheet.getRange(1, 1, 1, 9).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  return sheet;
}

/**
 * FIX #3: APPOINTMENT VALIDATION API
 *
 * Fetches all booked slots for a given date and branch.
 * NOW INCLUDES TIME field for proper slot validation.
 *
 * Validation rule: A slot is BOOKED if date + branch + time all match.
 */
function getBookedSlots(e) {
  const date = e.parameter.date;
  const branch = e.parameter.branch;

  if (!date || !branch) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: "Date and branch are required" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // FIX: Determine which year sheet to query based on the appointment date
  let year;
  if (date.includes("-")) {
    year = date.split("-")[0];
  } else if (date.includes("/")) {
    const parts = date.split("/");
    year = parts.length === 3 ? parts[2] : new Date().getFullYear().toString();
  } else {
    year = new Date(date).getFullYear().toString();
  }

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(year);

  // If year sheet doesn't exist, no bookings for that year
  if (!sheet) {
    return ContentService
      .createTextOutput(JSON.stringify({ bookedSlots: [] }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const data = sheet.getDataRange().getValues();
  const rows = data.slice(1); // Data rows (skip header row)

  // Column indices (corrected for actual sheet structure):
  // A=0: Name, B=1: Phone, C=2: Email, D=3: Service, E=4: Date, F=5: Time, G=6: Message, H=7: Timestamp, I=8: Branch
  const branchIndex = 8;  // Column I
  const dateIndex = 4;    // Column E
  const timeIndex = 5;    // Column F

  // FIX #3b: Filter by date AND branch, AND include TIME field
  const bookedSlots = rows
    .filter(row => {
      const rowDate = row[dateIndex];
      const rowBranch = row[branchIndex];
      // Normalize date for comparison (handle both string and Date objects)
      const rowDateStr = typeof rowDate === "string" ? rowDate : formatDate(rowDate);
      return rowDateStr === date && rowBranch === branch;
    })
    .map(row => ({
      date: row[dateIndex],
      branch: row[branchIndex],
      time: row[timeIndex] // FIX #3c: Include TIME in response
    }));

  return ContentService
    .createTextOutput(JSON.stringify({ bookedSlots }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Utility: Format date object to YYYY-MM-DD string
 */
function formatDate(dateObj) {
  const d = new Date(dateObj);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Utility: Legacy function for backward compatibility
 * (can be called directly from Google Sheets for testing)
 */
function testGetBookedSlots() {
  const mockEvent = {
    parameter: {
      date: "2026-03-24",
      branch: "Downtown"
    }
  };
  Logger.log(getBookedSlots(mockEvent));
}
