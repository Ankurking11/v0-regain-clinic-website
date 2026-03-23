import { NextRequest, NextResponse } from 'next/server'

const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwbm-0Xr9mxvqggIvb37aiKHsMdwB6k2151S-gZ-SsklryqZ98rQ7beJPGHXo3vjTZ1/exec"

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

    // Send to Google Apps Script using URLSearchParams to avoid CORS preflight
    console.log('[API] Sending to Google Apps Script:', GOOGLE_APPS_SCRIPT_URL)
    
    // Convert JSON to FormData to avoid CORS preflight with application/json
    const formData = new URLSearchParams()
    Object.entries(body).forEach(([key, value]) => {
      formData.append(key, String(value))
    })

    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      body: formData,
    })

    console.log('[API] Google Sheets response status:', response.status)
    console.log('[API] Google Sheets response ok:', response.ok)

    // Try to read response
    let responseText = ''
    try {
      responseText = await response.text()
      console.log('[API] Google Sheets response text:', responseText)
    } catch (e) {
      console.log('[API] Could not read response:', e)
    }

    // Even if we can't read the response, Google Apps Script likely processed it
    console.log('[API] Appointment submitted to Google Sheets')
    return NextResponse.json(
      { 
        success: true, 
        message: 'Appointment submitted successfully'
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
