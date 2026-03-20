"use client"

import { motion } from "framer-motion"
import {
  Zap,
  Radio,
  Magnet,
  Thermometer,
  Footprints,
  ArrowDownUp,
  Dumbbell,
  MonitorSpeaker,
  Accessibility,
  ClipboardCheck,
  Heart,
  Sparkles,
} from "lucide-react"

const facilities = [
  { icon: Zap, name: "Electrotherapy Units" },
  { icon: Radio, name: "Ultrasound Therapy" },
  { icon: Magnet, name: "Magnetotherapy" },
  { icon: Thermometer, name: "Heat & Cold Therapy" },
  { icon: Footprints, name: "Gait Training" },
  { icon: ArrowDownUp, name: "Traction Units" },
  { icon: Dumbbell, name: "Exercise Equipment" },
  { icon: MonitorSpeaker, name: "Biofeedback" },
  { icon: Accessibility, name: "Accessibility" },
  { icon: ClipboardCheck, name: "Assessment Tools" },
  { icon: Heart, name: "Cardiac Rehab" },
  { icon: Sparkles, name: "Laser Therapy" },
]

export default function Facilities() {
  return (
    <section id="facilities" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
            Our Facilities
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 font-serif">
            State-of-the-Art Equipment
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Equipped with the latest technology and modern therapeutic equipment
            for comprehensive rehabilitation care.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-white rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100"
            >
              <div className="w-14 h-14 mx-auto bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl flex items-center justify-center mb-3">
                <facility.icon className="w-7 h-7 text-teal-600" />
              </div>
              <p className="text-sm font-medium text-slate-700">
                {facility.name}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-8 text-center"
        >
          <p className="text-xl font-semibold text-white">
            Hygienic & Comfortable Environment
          </p>
          <p className="text-teal-100 mt-2">
            Designed for your comfort and optimal recovery experience
          </p>
        </motion.div>
      </div>
    </section>
  )
}
