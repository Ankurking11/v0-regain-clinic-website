"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock, MessageCircle, CheckCircle, Send, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const services = [
  "Pain Management",
  "Joint Replacement Rehab",
  "Neurological Rehabilitation",
  "Pediatric Physiotherapy",
  "Sports Injury Rehab",
  "Post Surgical Rehab",
  "Burn Management",
  "General Consultation",
]

type BranchId = "babupara" | "shivmandir"
type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

type AppointmentFormData = {
  branch: BranchId | ""
  name: string
  phone: string
  email: string
  service: string
  date: string
  message: string
}

type BookedSlotsResponse = {
  slots?: string[]
}

// Clinic branches
const branches = [
  { id: "babupara", name: "REGAIN BABUPARA" },
  { id: "shivmandir", name: "REGAIN MS SHIVMANDIR" },
] as const

type BranchSchedule = {
  days: DayOfWeek[]
  slots: Partial<Record<DayOfWeek, string[]>>
}

// Branch-specific schedule: which days and time slots
const branchSchedule: Record<BranchId, BranchSchedule> = {
  babupara: {
    days: [1, 2, 4, 6], // Mon=1, Tue=2, Thu=4, Sat=6
    slots: {
      // Monday: 4pm-6pm
      1: ["4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM"],
      // Tuesday, Thursday, Saturday: 9am-10am
      2: ["9:00 AM", "9:30 AM"],
      4: ["9:00 AM", "9:30 AM"],
      6: ["9:00 AM", "9:30 AM"],
    }
  },
  shivmandir: {
    days: [0, 3, 6], // Sun=0 (1st & 3rd only), Wed=3, Sat=6
    slots: {
      // 1st & 3rd Sunday: 11am-12pm
      0: ["11:00 AM", "11:30 AM"],
      // Wednesday, Saturday: 4pm-5pm
      3: ["4:00 PM", "4:30 PM"],
      6: ["4:00 PM", "4:30 PM"],
    }
  }
}

// Get available time slots for a branch and day of week
function getTimeSlotsForDay(branchId: BranchId, dayOfWeek: DayOfWeek): string[] {
  const schedule = branchSchedule[branchId]
  if (!schedule || !schedule.days.includes(dayOfWeek)) {
    return []
  }
  return schedule.slots[dayOfWeek] || []
}

// Returns true if the date falls on the 1st or 3rd Sunday of its month
function isFirstOrThirdSunday(dateString: string): boolean {
  if (!dateString) return false
  const date = new Date(dateString)
  if (date.getDay() !== 0) return false
  const weekNumber = Math.ceil(date.getDate() / 7)
  return weekNumber === 1 || weekNumber === 3
}

// Check if branch is open on a given date (handles 1st/3rd Sunday logic for shivmandir)
function isBranchOpen(branchId: BranchId, dateString: string): boolean {
  if (!dateString) return false
  const date = new Date(dateString)
  const dayOfWeek = date.getDay() as DayOfWeek
  const schedule = branchSchedule[branchId]
  if (!schedule || !schedule.days.includes(dayOfWeek)) return false
  if (branchId === 'shivmandir' && dayOfWeek === 0) {
    return isFirstOrThirdSunday(dateString)
  }
  return true
}

// Get a label for the time slots based on branch and day
function getDaySlotLabel(dayOfWeek: DayOfWeek): string {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const dayName = dayNames[dayOfWeek] || ''
  return dayName
}

// Branch display names for UI
const branchNames: Record<BranchId, string> = {
  babupara: "REGAIN BABUPARA",
  shivmandir: "REGAIN MS SHIVMANDIR",
}

function isWeekday(dateString: string): boolean {
  if (!dateString) return false
  const date = new Date(dateString)
  const day = date.getDay()
  return day !== 5 // Friday is closed for all clinics
}

// Get day of week from date string (0 = Sunday, 1 = Monday, etc.)
function getDayOfWeek(dateString: string): DayOfWeek {
  const date = new Date(dateString)
  return date.getDay() as DayOfWeek
}

function getMinDate(): string {
  const today = new Date()
  return today.toISOString().split("T")[0]
}

export default function Appointment() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingSlots, setIsLoadingSlots] = useState(false)
  const [formData, setFormData] = useState<AppointmentFormData>({
    branch: "",
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    message: "",
  })
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [selectedSlot, setSelectedSlot] = useState("")

  // Fetch booked slots when branch/date changes.
  useEffect(() => {
    const branch = formData.branch
    if (!formData.date || !branch || !isWeekday(formData.date)) {
      setBookedSlots([])
      setAvailableSlots([])
      return
    }

    const dayOfWeek = getDayOfWeek(formData.date)
    const todaySlots = getTimeSlotsForDay(branch, dayOfWeek)

    if (todaySlots.length === 0 || !isBranchOpen(branch, formData.date)) {
      setBookedSlots([])
      setAvailableSlots([])
      return
    }

    let isCancelled = false
    const controller = new AbortController()

    async function loadBookedSlots() {
      setIsLoadingSlots(true)
      try {
        const params = new URLSearchParams({
          action: 'getBookedSlots',
          date: formData.date,
          branch,
        })

        const response = await fetch(`/api/appointments?${params.toString()}`, {
          signal: controller.signal,
        })
        if (!response.ok) throw new Error('Failed to fetch booked slots')

        const data = (await response.json()) as BookedSlotsResponse
        const slots = Array.isArray(data.slots) ? data.slots : []

        if (isCancelled) return

        setBookedSlots(slots)
        setAvailableSlots(todaySlots.filter((slot) => !slots.includes(slot)))
      } catch (error) {
        if (isCancelled) return
        console.error('[v0] Failed to fetch booked slots:', error)
        setBookedSlots([])
        setAvailableSlots(todaySlots)
      } finally {
        if (!isCancelled) {
          setIsLoadingSlots(false)
        }
      }
    }

    loadBookedSlots()

    return () => {
      isCancelled = true
      controller.abort()
    }
  }, [formData.date, formData.branch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const branch = formData.branch

    if (!branch) {
      alert("Please select a clinic branch")
      return
    }

    if (!formData.date || !isWeekday(formData.date)) {
      alert("Please select a valid day when the clinic is open")
      return
    }

    // Check if branch is open on selected day
    if (!isBranchOpen(branch, formData.date)) {
      alert("The selected branch is not open on this day. Please select another date.")
      return
    }

    if (!selectedSlot) {
      alert("Please select a time slot")
      return
    }

    // Double-check slot is not booked (in case of race condition)
    if (bookedSlots.includes(selectedSlot)) {
      alert("This time slot was just booked by someone else. Please select another slot.")
      setSelectedSlot("")
      // Refresh slots
      setBookedSlots([])
      setAvailableSlots([])
      return
    }

    setIsSubmitting(true)

    try {
      const bookingPayload = {
        branch,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        service: formData.service,
        date: formData.date,
        time: selectedSlot,
        message: formData.message,
      }
      const response = await fetch('/api/appointments', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingPayload),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || result.message || 'Failed to submit appointment')
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error("[v0] Error saving appointment:", error)
      const message = error instanceof Error ? error.message : "Failed to submit appointment. Please try again."
      alert(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value
    setFormData(prev => ({ ...prev, date: newDate }))
    setSelectedSlot("") // Reset selected slot when date changes
  }

  return (
    <section id="appointment" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-brand-green/10 text-brand-green rounded-full text-sm font-medium mb-4">
            Book Appointment
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-brand-blue mb-6 font-serif">
            Schedule Your Visit
          </h2>
          <p className="text-lg text-brand-blue/70 max-w-2xl mx-auto">
            Take the first step towards recovery. Book your appointment today
            and let us help you regain your mobility.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-brand-blue/5 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-blue rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-blue mb-3">
                    Appointment Schedule
                  </h3>
                  <div className="space-y-3 text-brand-blue/70 text-sm">
                    <div>
                      <p className="font-semibold text-brand-blue mb-1">REGAIN BABUPARA</p>
                      <ul className="space-y-0.5 ml-2">
                        <li>Monday: 4 PM – 6 PM</li>
                        <li>Tuesday: 9 AM – 10 AM</li>
                        <li>Thursday: 9 AM – 10 AM</li>
                        <li>Saturday: 9 AM – 10 AM</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-brand-blue mb-1">REGAIN MS SHIVMANDIR</p>
                      <ul className="space-y-0.5 ml-2">
                        <li>Wednesday: 4 PM – 5 PM</li>
                        <li>Saturday: 4 PM – 5 PM</li>
                        <li>1st &amp; 3rd Sunday: 11 AM – 12 PM</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-blue/5 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-green rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-blue mb-2">
                    Quick Response
                  </h3>
                  <p className="text-brand-blue/70">
                    We typically respond to appointment requests within 2 hours
                    during clinic hours.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/918250588279?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20ReGain%20MS%20Clinic."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 bg-brand-green hover:bg-brand-green/90 text-white rounded-xl font-semibold transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-current"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Book via WhatsApp
            </a>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-brand-blue/10"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-brand-green" />
                </div>
                <h3 className="text-2xl font-bold text-brand-blue mb-2">
                  Appointment Request Sent!
                </h3>
                <p className="text-brand-blue/70 mb-6">
                  We will contact you within 2 hours to confirm your appointment.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="border-brand-blue text-brand-blue hover:bg-brand-blue/5"
                >
                  Book Another Appointment
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Branch Selection */}
                <div className="space-y-2">
                  <Label htmlFor="branch">Clinic</Label>
                  <Select required onValueChange={(value) => setFormData(prev => ({ ...prev, branch: value }))}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select a branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {branches.map((branch) => (
                        <SelectItem key={branch.id} value={branch.id}>
                          {branch.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      required
                      className="h-12"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      required
                      className="h-12"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="h-12"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Service Required</Label>
                  <Select required onValueChange={(value) => setFormData(prev => ({ ...prev, service: value }))}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service.toLowerCase()}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input
                    id="date"
                    type="date"
                    required
                    className="h-12"
                    min={getMinDate()}
                    value={formData.date}
                    onChange={handleDateChange}
                  />
                  {formData.date && !isWeekday(formData.date) && (
                    <p className="text-xs text-brand-blue font-medium mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      No clinic is open on this day. Please select another date.
                    </p>
                  )}
                  {formData.date && isWeekday(formData.date) && formData.branch && !isBranchOpen(formData.branch, formData.date) && (
                    <p className="text-xs text-brand-blue font-medium mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {branchNames[formData.branch]} is closed on this day. Please select another date.
                    </p>
                  )}
                </div>

                {/* Time Slot Selection - Only shows when valid weekday and branch are selected */}
                {formData.date && isWeekday(formData.date) && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <Label>Available Time Slots</Label>
                      {formData.branch && (
                        <span className="text-xs text-brand-blue/60">
                          at {branchNames[formData.branch] || formData.branch}
                        </span>
                      )}
                    </div>
                    {!formData.branch && (
                      <p className="text-sm text-brand-blue font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Please select a branch first to check availability.
                      </p>
                    )}
                    {formData.branch && (
                      <>
                        {isLoadingSlots ? (
                          <div className="flex items-center gap-2 text-brand-blue/60">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Checking availability...
                          </div>
                        ) : (
                          <>
                            {/* Show closed message if branch not open on this day */}
                            {formData.date && !isBranchOpen(formData.branch, formData.date) ? (
                              <p className="text-sm text-brand-blue font-medium flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {branchNames[formData.branch]} is closed on this day. Please select another date.
                              </p>
                            ) : (
                              <>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                  {availableSlots.map((slot) => {
                                    const isBooked = bookedSlots.includes(slot)
                                    const isSelected = selectedSlot === slot

                                    return (
                                      <Button
                                        key={slot}
                                        type="button"
                                        disabled={isBooked}
                                        variant={isSelected ? "default" : "outline"}
                                        className={isBooked
                                          ? "bg-brand-blue/10 text-brand-blue/40 cursor-not-allowed border-brand-blue/20"
                                          : isSelected
                                            ? "bg-brand-blue text-white"
                                            : "border-brand-blue/20 hover:border-brand-blue"
                                        }
                                        onClick={() => !isBooked && setSelectedSlot(slot)}
                                      >
                                        {slot}
                                        {isBooked && (
                                          <span className="absolute -top-1 -right-1 w-3 h-3 bg-brand-green rounded-full" title="Booked" />
                                        )}
                                      </Button>
                                    )
                                  })}
                                </div>
                                <div className="flex items-center gap-4 text-xs">
                                  <p className="text-brand-blue/60">
                                    {formData.date && (
                                      <span>
                                        {formData.branch ? branchNames[formData.branch] : ''} - {getDaySlotLabel(getDayOfWeek(formData.date))}
                                      </span>
                                    )}
                                  </p>
                                  <div className="flex items-center gap-1">
                                    <span className="w-3 h-3 bg-brand-green rounded-full" />
                                    <span className="text-brand-blue/70">Booked</span>
                                  </div>
                                </div>
                              </>
                            )}
                          </>
                        )}
                        {availableSlots.length === 0 && !isLoadingSlots && formData.date && isBranchOpen(formData.branch, formData.date) && (
                          <p className="text-sm text-brand-blue font-medium flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            All slots are booked. Please select another date.
                          </p>
                        )}
                      </>
                    )}
                  </motion.div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="message">Additional Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your condition or any specific requirements..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !formData.branch || !formData.name || !formData.phone || !formData.service || !formData.date || !isWeekday(formData.date) || !isBranchOpen(formData.branch, formData.date) || !selectedSlot}
                  className="w-full h-12 bg-brand-blue hover:bg-brand-blue/90 text-white text-lg"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-5 h-5" />
                      Request Appointment
                    </span>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
