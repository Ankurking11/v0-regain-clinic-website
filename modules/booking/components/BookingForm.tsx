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
import {
  defaultBookingConfig,
  getTimeSlotsForDay,
  isBranchOpen,
  isWeekday,
  getDayOfWeek,
  getDaySlotLabel,
  getMinDate,
  type BookingConfig,
} from "../config/booking.config"

interface BookingFormProps {
  config?: BookingConfig
  apiEndpoint?: string
  whatsappNumber?: string
  whatsappMessage?: string
  onSuccess?: () => void
}

// Google Apps Script Web App URL for saving appointments to Google Sheets
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz9lxEwoviV5aXpdsYf4hO92yYf5bHhS75ixuR1SvONrfrqNbMPiZTauqayqZgst4wD/exec"

export default function BookingForm({
  config = defaultBookingConfig,
  apiEndpoint = "/api/book",
  whatsappNumber = "919876543210",
  whatsappMessage = "Hello%2C%20I%20would%20like%20to%20book%20an%20appointment.",
  onSuccess,
}: BookingFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingSlots, setIsLoadingSlots] = useState(false)
  const [formData, setFormData] = useState({
    branch: "",
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    message: "",
  })
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [selectedSlot, setSelectedSlot] = useState("")

  // Fetch booked slots from Google Sheets when date changes
  useEffect(() => {
    if (formData.date && formData.branch && isWeekday(formData.date)) {
      setIsLoadingSlots(true)

      // Get time slots for this branch on this day
      const dayOfWeek = getDayOfWeek(formData.date)
      const todaySlots = getTimeSlotsForDay(formData.branch, dayOfWeek, config)

      // If branch is not open on this day, clear slots
      if (todaySlots.length === 0) {
        setBookedSlots([])
        setAvailableSlots([])
        setIsLoadingSlots(false)
        return
      }

      // Fetch booked slots for the selected date and branch from our API
      fetch(`${apiEndpoint}?action=getBookedSlots&date=${formData.date}&branch=${formData.branch}`)
        .then(res => {
          if (!res.ok) throw new Error('Network response was not ok')
          return res.json()
        })
        .then(data => {
          console.log('Fetched booked slots:', data)
          if (data.slots && Array.isArray(data.slots)) {
            setBookedSlots(data.slots)
            // Available slots = branch's slots for this day minus booked ones
            setAvailableSlots(todaySlots.filter(slot => !data.slots.includes(slot)))
          } else {
            setBookedSlots([])
            setAvailableSlots(todaySlots)
          }
        })
        .catch(err => {
          console.error('Error fetching booked slots:', err)
          setBookedSlots([])
          setAvailableSlots(todaySlots)
        })
        .finally(() => {
          setIsLoadingSlots(false)
        })
    } else {
      setBookedSlots([])
      setAvailableSlots([])
    }
  }, [formData.date, formData.branch, config])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.branch) {
      alert("Please select a clinic branch")
      return
    }

    if (!formData.date || !isWeekday(formData.date)) {
      alert("Please select a valid day when the clinic is open")
      return
    }

    // Check if branch is open on selected day
    const selectedDay = getDayOfWeek(formData.date)
    if (!isBranchOpen(formData.branch, selectedDay, config)) {
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

    const bookingData = {
      ...formData,
      time: selectedSlot,
      timestamp: new Date().toISOString(),
      status: "pending",
    }

    try {
      // Prepare data for API
      const bookingPayload = {
        branch: bookingData.branch,
        name: bookingData.name,
        phone: bookingData.phone,
        email: bookingData.email,
        service: bookingData.service,
        date: bookingData.date,
        time: bookingData.time,
        message: bookingData.message,
        timestamp: bookingData.timestamp,
        status: bookingData.status
      }

      console.log('[v0] Sending booking to API:', bookingPayload)

      // Send to our API endpoint
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingPayload),
      })

      console.log('[v0] API response status:', response.status)
      const result = await response.json()
      console.log('[v0] API result:', result)

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit appointment')
      }

      console.log("[v0] Booking saved successfully:", bookingData)
      setIsSubmitted(true)
      onSuccess?.()
    } catch (error) {
      console.error("[v0] Error saving appointment:", error)
      alert("Failed to submit appointment. Please try again.")
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
          <span className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
            Book Appointment
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 font-serif">
            Schedule Your Visit
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
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
            <div className="bg-slate-50 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Clinic Hours
                  </h3>
                  <div className="space-y-1 text-slate-600">
                    <p>Monday - Saturday: 9:00 AM - 8:00 PM</p>
                    <p>Sunday: By Appointment Only</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    Quick Response
                  </h3>
                  <p className="text-slate-600">
                    We typically respond to appointment requests within 2 hours
                    during clinic hours.
                  </p>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-colors"
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
            className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Appointment Request Sent!
                </h3>
                <p className="text-slate-600 mb-6">
                  We will contact you within 2 hours to confirm your appointment.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="border-teal-600 text-teal-600 hover:bg-teal-50"
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
                      {config.branches.map((branch) => (
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
                      {config.services.map((service) => (
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
                    <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Clinic is closed on this day. Please select Mon-Sat.
                    </p>
                  )}
                  {formData.date && isWeekday(formData.date) && formData.branch && !isBranchOpen(formData.branch, getDayOfWeek(formData.date), config) && (
                    <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {config.branchNames[formData.branch]} is closed on this day. Please select another date.
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
                        <span className="text-xs text-slate-500">
                          at {config.branchNames[formData.branch] || formData.branch}
                        </span>
                      )}
                    </div>
                    {!formData.branch && (
                      <p className="text-sm text-amber-600 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Please select a branch first to check availability.
                      </p>
                    )}
                    {formData.branch && (
                      <>
                        {isLoadingSlots ? (
                          <div className="flex items-center gap-2 text-slate-500">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Checking availability...
                          </div>
                        ) : (
                          <>
                            {/* Show closed message if branch not open on this day */}
                            {formData.date && !isBranchOpen(formData.branch, getDayOfWeek(formData.date), config) ? (
                              <p className="text-sm text-amber-600 flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {config.branchNames[formData.branch]} is closed on this day. Please select another date.
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
                                          ? "bg-slate-100 text-slate-400 cursor-not-allowed border-slate-200"
                                          : isSelected
                                            ? "bg-teal-600 text-white"
                                            : "border-teal-200 hover:border-teal-400"
                                        }
                                        onClick={() => !isBooked && setSelectedSlot(slot)}
                                      >
                                        {slot}
                                        {isBooked && (
                                          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" title="Booked" />
                                        )}
                                      </Button>
                                    )
                                  })}
                                </div>
                                <div className="flex items-center gap-4 text-xs">
                                  <p className="text-slate-500">
                                    {formData.date && (
                                      <span>
                                        {config.branchNames[formData.branch]} - {getDaySlotLabel(formData.branch, getDayOfWeek(formData.date))}
                                      </span>
                                    )}
                                  </p>
                                  <div className="flex items-center gap-1">
                                    <span className="w-3 h-3 bg-red-500 rounded-full" />
                                    <span className="text-slate-600">Booked</span>
                                  </div>
                                </div>
                              </>
                            )}
                          </>
                        )}
                        {availableSlots.length === 0 && !isLoadingSlots && formData.date && isBranchOpen(formData.branch, getDayOfWeek(formData.date), config) && (
                          <p className="text-sm text-amber-600 flex items-center gap-2">
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
                  disabled={isSubmitting || !formData.branch || !formData.name || !formData.phone || !formData.service || !formData.date || !isWeekday(formData.date) || !isBranchOpen(formData.branch, getDayOfWeek(formData.date), config) || !selectedSlot}
                  className="w-full h-12 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white text-lg"
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
