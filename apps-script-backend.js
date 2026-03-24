/**
 * Google Apps Script - FIXED VERSION
 *
 * FIXES APPLIED:
 * 1. YEAR-WISE SHEET STORAGE - Creates/uses year-specific sheets (e.g., "2026")
 * 2. BRANCH DATA SAVED - Now correctly written to Column I
 * 3. VALIDATION API FIXED - Queries correct year sheet, matches date+branch+time
 */

function doGet(e) {
  try {
    if (e.parameter.action == 'getBookedSlots') {
      var date = e.parameter.date;
      var branch = e.parameter.branch;

      // FIX #1: Extract year from appointment date to query correct sheet
      var year = date.split("-")[0];  // date format: YYYY-MM-DD

      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var sheet = ss.getSheetByName(year);

      // If year sheet doesn't exist, no bookings for that year
      if (!sheet) {
        return ContentService.createTextOutput(JSON.stringify({
          slots: [],
          date: date,
          branch: branch
        })).setMimeType(ContentService.MimeType.JSON);
      }

      var data = sheet.getDataRange().getValues();

      var bookedSlots = [];
      for (var i = 1; i < data.length; i++) {
        var rowDate = data[i][4];      // Column E - Date
        var rowBranch = data[i][8];    // Column I - Branch
        var rowTime = data[i][5];      // Column F - Time

        // Normalize dates for comparison
        var rowDateStr = (typeof rowDate === 'string') ? rowDate.trim() : formatDate(rowDate);
        var dateNormalized = date.trim();
        var branchNormalized = (typeof rowBranch === 'string') ? rowBranch.trim().toLowerCase() : String(rowBranch).trim().toLowerCase();
        var branchParam = branch.trim().toLowerCase();

        // Match date AND branch (case-insensitive for branch)
        if (rowDateStr.indexOf(dateNormalized) !== -1 || rowDateStr === dateNormalized) {
          if (branchNormalized === branchParam) {
            // Format time - handle both Date objects (serial) and strings
            var formattedTime = formatTime(rowTime);
            if (formattedTime) {
              bookedSlots.push(formattedTime);
            }
          }
        }
      }

      return ContentService.createTextOutput(JSON.stringify({
        slots: bookedSlots,
        date: date,
        branch: branch
      })).setMimeType(ContentService.MimeType.JSON);
    }
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      error: err.toString(),
      stack: err.stack,
      slots: []
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // FIX #1: Extract year from appointment date to determine target sheet
    var appointmentDate = data.date;
    var year = appointmentDate.split("-")[0];  // date format: YYYY-MM-DD

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(year);

    // FIX #1: Create year sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(year);
      // Add headers for the new year sheet
      sheet.getRange(1, 1, 1, 9).setValues([[
        "Name", "Phone", "Email", "Service", "Date", "Time", "Message", "Timestamp", "Branch"
      ]]);
      sheet.getRange(1, 1, 1, 9).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    // FIX #2: Ensure branch is included in the row data (Column I)
    sheet.appendRow([
      data.name,          // A
      data.phone,         // B
      data.email || "",   // C
      data.service || "", // D
      data.date,          // E
      data.time,          // F
      data.message || "", // G
      data.timestamp || new Date().toISOString(),  // H
      data.branch         // I - Branch was not being saved before
    ]);

    return ContentService.createTextOutput(JSON.stringify({result: "success"}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({error: err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Helper: Format Date object to YYYY-MM-DD string
 */
function formatDate(dateObj) {
  try {
    var d = new Date(dateObj);
    var year = d.getFullYear();
    var month = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return year + "-" + month + "-" + day;
  } catch (e) {
    return String(dateObj);
  }
}

/**
 * Helper: Format time - handles Google Sheets time values (strings, Date objects, or serial numbers)
 * Returns a time string like "4:00 PM"
 */
function formatTime(timeValue) {
  try {
    // Handle string values (e.g., "4:00 PM")
    if (typeof timeValue === 'string') {
      var trimmed = timeValue.trim();
      if (trimmed.match(/AM|PM/i) || trimmed.match(/^\d{1,2}:\d{2}/)) {
        return normalizeTimeString(trimmed);
      }
      return trimmed;
    }

    // Handle Date objects - check constructor name or toString()
    if (timeValue && timeValue.constructor && timeValue.constructor.name === 'Date') {
      return formatDateObj(timeValue);
    }

    // Alternative check: if it has getHours method, it's a Date
    if (timeValue && typeof timeValue.getHours === 'function') {
      return formatDateObj(timeValue);
    }

    // Handle numbers (time serial - fractional days)
    if (typeof timeValue === 'number') {
      // Convert serial to Date
      var d = new Date(1899, 11, 30); // Base date for Excel/GSheets serial
      d.setTime(d.getTime() + Math.round(timeValue * 24 * 60 * 60 * 1000));
      return formatDateObj(d);
    }

    return String(timeValue);
  } catch (e) {
    return String(timeValue);
  }
}

/**
 * Format a Date object to "H:MM AM/PM" format
 */
function formatDateObj(d) {
  try {
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
  } catch (e) {
    return '';
  }
}

/**
 * Normalize time strings to "H:MM AM/PM" format
 */
function normalizeTimeString(timeStr) {
  try {
    // Handle "4:00 PM" format
    var match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    if (match) {
      var hours = parseInt(match[1], 10);
      var minutes = match[2];
      var ampm = match[3].toUpperCase();
      // Convert 12-hour to 24-hour for consistency
      if (ampm === 'PM' && hours !== 12) hours += 12;
      if (ampm === 'AM' && hours === 12) hours = 0;
      var d = new Date(2000, 0, 1, hours, minutes);
      return formatDateObj(d);
    }
    return timeStr;
  } catch (e) {
    return timeStr;
  }
}
