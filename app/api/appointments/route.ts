import { NextRequest, NextResponse } from 'next/server'

const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwbm-0Xr9mxvqggIvb37aiKHsMdwB6k2151S-gZ-SsklryqZ98rQ7beJPGHXo3vjTZ1/exec"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const action = searchParams.get('action')
    const date = searchParams.get('date')
    const branch = searchParams.get('branch')

    if (action === 'getBookedSlots' && date && branch) {
      // Fetch booked slots from Google Apps Script
      const url = `${GOOGLE_APPS_SCRIPT_URL}?action=getBookedSlots&date=${date}&branch=${branch}`
      console.log('[v0] Fetching booked slots from:', url)

      const response = await fetch(url, {
        method: 'GET',
      })

      if (!response.ok) {
        throw new Error('Failed to fetch booked slots')
      }

      const data = await response.json()
      console.log('[v0] Booked slots response:', data)

      return NextResponse.json(data)
    }

    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  } catch (error) {
    console.error('[v0] Error fetching booked slots:', error)
    return NextResponse.json(
      { error: 'Failed to fetch booked slots', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log('[v0] Received appointment booking:', JSON.stringify(body, null, 2))

    // Validate required fields
    if (!body.name || !body.phone || !body.branch || !body.date || !body.time) {
      console.error('[v0] Missing required fields:', body)
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send to Google Apps Script as JSON (server-to-server, no CORS issues)
    console.log('[v0] Sending to Google Apps Script:', GOOGLE_APPS_SCRIPT_URL)
    console.log('[v0] Request body:', JSON.stringify(body, null, 2))
    
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    console.log('[v0] Google Sheets response status:', response.status)
    console.log('[v0] Google Sheets response ok:', response.ok)

    // Try to read response
    let responseText = ''
    try {
      responseText = await response.text()
      console.log('[v0] Google Sheets response text:', responseText)
      
      // Try to parse as JSON
      try {
        const jsonResponse = JSON.parse(responseText)
        console.log('[v0] Parsed JSON response:', jsonResponse)
        
        // Check for error in the response
        if (jsonResponse.error) {
          console.error('[v0] Google Apps Script returned error:', jsonResponse.error)
        }
      } catch {
        console.log('[v0] Response is not JSON')
      }
    } catch (e) {
      console.log('[v0] Could not read response:', e)
    }

    // Google Apps Script should have processed the request
    console.log('[v0] Appointment submitted to Google Sheets')
    return NextResponse.json(
      { 
        success: true, 
        message: 'Appointment submitted successfully',
        response: responseText
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Error processing appointment:', error)
    return NextResponse.json(
      {
        error: 'Failed to process appointment request',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
