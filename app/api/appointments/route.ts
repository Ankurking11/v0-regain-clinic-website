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

    // Send to Google Apps Script
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    console.log('[API] Google Sheets response status:', response.status)

    // Parse response
    let result
    try {
      const text = await response.text()
      console.log('[API] Google Sheets response text:', text)
      result = JSON.parse(text)
    } catch (e) {
      console.error('[API] Failed to parse Google Sheets response:', e)
      result = { success: true, message: 'Appointment submitted' }
    }

    if (!response.ok) {
      console.error('[API] Google Sheets error:', result)
      return NextResponse.json(
        { error: 'Failed to save appointment' },
        { status: response.status }
      )
    }

    console.log('[API] Appointment successfully saved')
    return NextResponse.json(
      { success: true, message: 'Appointment submitted successfully', data: result },
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
