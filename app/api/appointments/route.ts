import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

const APPOINTMENTS_TABLE = process.env.SUPABASE_APPOINTMENTS_TABLE || 'appointments'
const DEFAULT_CLIENT_ID = process.env.SUPABASE_DEFAULT_CLIENT_ID
const BOOKED_STATUS = 'booked'
const SLOT_DURATION_MINUTES = 30

type AppointmentRequestBody = {
  branch?: string
  name?: string
  phone?: string
  email?: string
  service?: string
  date?: string
  time?: string
  message?: string
  remark?: string
  staff_name?: string
  created_by?: string
}

type AppointmentSlotRow = {
  start_time: string | null
}

function getDefaultClientIdOrThrow(): string {
  if (!DEFAULT_CLIENT_ID) {
    throw new Error('Missing SUPABASE_DEFAULT_CLIENT_ID environment variable')
  }

  return DEFAULT_CLIENT_ID
}

function errorResponse(error: string, status: number, details?: string) {
  return NextResponse.json({ error, ...(details ? { details } : {}) }, { status })
}

function parseUiTimeToDbTime(uiTime: string): string | null {
  const match = uiTime.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!match) return null

  let hours = Number(match[1])
  const minutes = Number(match[2])
  const period = match[3].toUpperCase()

  if (Number.isNaN(hours) || Number.isNaN(minutes) || minutes < 0 || minutes > 59 || hours < 1 || hours > 12) {
    return null
  }

  if (period === 'AM' && hours === 12) hours = 0
  if (period === 'PM' && hours !== 12) hours += 12

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`
}

function formatDbTimeToUiTime(dbTime: string): string {
  const [h = '00', m = '00'] = dbTime.split(':')
  const hours24 = Number(h)
  const minutes = Number(m)

  if (Number.isNaN(hours24) || Number.isNaN(minutes)) return dbTime

  const period = hours24 >= 12 ? 'PM' : 'AM'
  const hours12 = hours24 % 12 || 12
  return `${hours12}:${String(minutes).padStart(2, '0')} ${period}`
}

function addMinutesToDbTime(dbTime: string, minutesToAdd: number): string | null {
  const [h = '00', m = '00', s = '00'] = dbTime.split(':')
  const hours = Number(h)
  const minutes = Number(m)
  const seconds = Number(s)

  if (Number.isNaN(hours) || Number.isNaN(minutes) || Number.isNaN(seconds)) return null

  const totalMinutes = (hours * 60 + minutes + minutesToAdd) % (24 * 60)
  const nextHours = Math.floor(totalMinutes / 60)
  const nextMinutes = totalMinutes % 60

  return `${String(nextHours).padStart(2, '0')}:${String(nextMinutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function hasRequiredFields(body: AppointmentRequestBody): body is Required<Pick<AppointmentRequestBody, 'name' | 'phone' | 'branch' | 'date' | 'time'>> & AppointmentRequestBody {
  return Boolean(body.name && body.phone && body.branch && body.date && body.time)
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const action = searchParams.get('action')
    const date = searchParams.get('date')
    const branch = searchParams.get('branch')
    const clientId = getDefaultClientIdOrThrow()

    if (action === 'getBookedSlots' && date && branch) {
      const { data, error } = await supabaseAdmin
        .from(APPOINTMENTS_TABLE)
        .select('start_time, status')
        .eq('client_id', clientId)
        .eq('date', date)
        .eq('location', branch)
        .neq('status', 'cancelled')

      if (error) {
        throw new Error(`Supabase GET failed: ${error.message}`)
      }

      const slots = ((data || []) as AppointmentSlotRow[])
        .map((row) => row.start_time)
        .filter((startTime): startTime is string => Boolean(startTime))
        .map((startTime) => formatDbTimeToUiTime(startTime))

      return NextResponse.json({ slots, date, branch })
    }

    return errorResponse('Invalid request', 400)
  } catch (error) {
    console.error('[v0] Error fetching booked slots:', error)
    return errorResponse('Failed to fetch booked slots', 500, error instanceof Error ? error.message : 'Unknown error')
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AppointmentRequestBody
    const clientId = getDefaultClientIdOrThrow()

    console.log('[v0] Received appointment booking:', JSON.stringify(body, null, 2))

    if (!hasRequiredFields(body)) {
      console.error('[v0] Missing required fields:', body)
      return errorResponse('Missing required fields', 400)
    }

    const startTime = parseUiTimeToDbTime(body.time)
    if (!startTime) {
      return errorResponse('Invalid time format. Expected format like 4:00 PM.', 400)
    }

    const endTime = addMinutesToDbTime(startTime, SLOT_DURATION_MINUTES)
    if (!endTime) {
      return errorResponse('Failed to compute appointment end time', 400)
    }

    const { data: conflictRows, error: conflictError } = await supabaseAdmin
      .from(APPOINTMENTS_TABLE)
      .select('id')
      .eq('client_id', clientId)
      .eq('date', body.date)
      .eq('location', body.branch)
      .eq('start_time', startTime)
      .limit(1)

    if (conflictError) {
      throw new Error(`Supabase conflict check failed: ${conflictError.message}`)
    }

    if ((conflictRows || []).length > 0) {
      return errorResponse('This slot is not available. Please choose another slot.', 409)
    }

    const insertPayload = {
      client_id: clientId,
      name: body.name,
      phone: body.phone,
      email: body.email || null,
      service: body.service || null,
      location: body.branch,
      staff_name: body.staff_name || null,
      date: body.date,
      start_time: startTime,
      end_time: endTime,
      status: BOOKED_STATUS,
      remark: body.message || body.remark || null,
      created_by: body.created_by || 'website',
      verified_at: null,
      verified_by: null,
      reminder_sent: false,
      reminder_sent_at: null,
      created_at: new Date().toISOString(),
      tenant_id: clientId,
    }

    const { data: insertData, error: insertError } = await supabaseAdmin
      .from(APPOINTMENTS_TABLE)
      .insert(insertPayload)
      .select('id')
      .single()

    if (insertError) {
      // Handles race conditions if unique constraint exists on (date, location, start_time).
      if (insertError.code === '23505') {
        return errorResponse('This slot is not available. Please choose another slot.', 409)
      }
      throw new Error(`Supabase INSERT failed: ${insertError.message}`)
    }

    console.log('[v0] Appointment submitted to Supabase:', insertData?.id)
    return NextResponse.json(
      {
        success: true,
        message: 'Appointment submitted successfully',
        id: insertData?.id || null,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Error processing appointment:', error)
    return errorResponse('Failed to process appointment request', 500, error instanceof Error ? error.message : 'Unknown error')
  }
}
