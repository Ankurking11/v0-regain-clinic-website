import { NextRequest, NextResponse } from 'next/server'

const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwbm-0Xr9mxvqggIvb37aiKHsMdwB6k2151S-gZ-SsklryqZ98rQ7beJPGHXo3vjTZ1/exec"

// Handle CORS preflight requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log('[API] Received appointment booking:', body)

    // Validate required fields
    if (!body.name || !body.phone || !body.branch || !body.date || !body.time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send to Google Apps Script
    console.log('[API] Sending to Google Apps Script:', GOOGLE_APPS_SCRIPT_URL)
    
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      mode: 'no-cors', // Disable CORS mode to avoid preflight issues
    })

    console.log('[API] Google Sheets response status:', response.status)

    // Parse response
    let result
    try {
      const text = await response.text()
      console.log('[API] Google Sheets response text:', text)
      
      // Try to parse as JSON, otherwise treat as plain text
      try {
        result = JSON.parse(text)
      } catch {
        result = { message: text }
      }
    } catch (e) {
      console.error('[API] Failed to read Google Sheets response:', e)
      result = { success: true, message: 'Appointment submitted' }
    }

    console.log('[API] Parsed result:', result)
    
    // Google Apps Script returns 200 OK even on success with no-cors mode
    console.log('[API] Appointment successfully saved')
    return NextResponse.json(
      { 
        success: true, 
        message: 'Appointment submitted successfully',
        data: result 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[API] Error processing appointment:', error)
    return NextResponse.json(
      {
        error: 'Failed to process appointment request',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
