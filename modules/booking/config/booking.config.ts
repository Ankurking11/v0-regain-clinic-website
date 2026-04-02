/**
 * Booking Module Configuration
 * Contains schedule, services, and branch configurations
 * Extracted from Appointment.tsx for reusability
 */

export interface Branch {
  id: string
  name: string
}

export interface ScheduleEntry {
  days: number[] // 0=Sunday, 1=Monday, etc.
  slots: Record<number, string[]> // day of week -> available time slots
}

export interface BookingConfig {
  branches: Branch[]
  branchSchedule: Record<string, ScheduleEntry>
  services: string[]
  branchNames: Record<string, string>
}

// Default config matching original Appointment.tsx
export const defaultBookingConfig: BookingConfig = {
  branches: [
    { id: "babupara", name: "Babupara" },
    { id: "shivmandir", name: "Shivmandir" },
  ],
  branchSchedule: {
    babupara: {
      days: [1, 2, 4, 6], // Mon=1, Tue=2, Thu=4, Sat=6
      slots: {
        1: ["4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM"], // Monday
        2: ["9:00 AM", "9:30 AM"], // Tuesday
        4: ["9:00 AM", "9:30 AM"], // Thursday
        6: ["9:00 AM", "9:30 AM"], // Saturday
      },
    },
    shivmandir: {
      days: [3, 6], // Wed=3, Sat=6
      slots: {
        3: ["4:00 PM", "4:30 PM"], // Wednesday
        6: ["4:00 PM", "4:30 PM"], // Saturday
      },
    },
  },
  services: [
    "Pain Management",
    "Joint Replacement Rehab",
    "Neurological Rehabilitation",
    "Pediatric Physiotherapy",
    "Sports Injury Rehab",
    "Post Surgical Rehab",
    "Burn Management",
    "General Consultation",
  ],
  branchNames: {
    babupara: "Babupara",
    shivmandir: "Shivmandir",
  },
}

// Helper functions for booking logic
export function getTimeSlotsForDay(
  branchId: string,
  dayOfWeek: number,
  config: BookingConfig = defaultBookingConfig
): string[] {
  const schedule = config.branchSchedule[branchId]
  if (!schedule || !schedule.days.includes(dayOfWeek)) {
    return []
  }
  return schedule.slots[dayOfWeek] || []
}

export function isBranchOpen(
  branchId: string,
  dayOfWeek: number,
  config: BookingConfig = defaultBookingConfig
): boolean {
  const schedule = config.branchSchedule[branchId]
  return schedule ? schedule.days.includes(dayOfWeek) : false
}

export function isWeekday(dateString: string): boolean {
  if (!dateString) return false
  const date = new Date(dateString)
  const day = date.getDay()
  return day >= 1 && day <= 6 // 1 = Monday, 6 = Saturday
}

export function getDayOfWeek(dateString: string): number {
  const date = new Date(dateString)
  return date.getDay()
}

export function getDaySlotLabel(branchId: string, dayOfWeek: number): string {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return dayNames[dayOfWeek] || ''
}

export function getMinDate(): string {
  const today = new Date()
  return today.toISOString().split("T")[0]
}
