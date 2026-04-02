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

interface Facility {
  icon: string
  name: string
}

interface FacilitiesProps {
  title?: string
  subtitle?: string
  sectionBadge?: string
  facilities?: Facility[]
  bannerText?: string
  bannerSubtext?: string
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Radio,
  Magnet,
  Zap,
  Sparkles,
  Thermometer,
  ArrowDownUp,
  MonitorSpeaker,
  Heart,
  Dumbbell,
  Accessibility,
  ClipboardCheck,
  Footprints,
}

export default function Facilities({
  title = "State-of-the-Art Equipment",
  subtitle = "Equipped with the latest technology and modern equipment for comprehensive care.",
  sectionBadge = "Our Facilities",
  facilities = [
    { icon: "Radio", name: "{{Facility 1}}" },
    { icon: "Magnet", name: "{{Facility 2}}" },
    { icon: "Zap", name: "{{Facility 3}}" },
    { icon: "Sparkles", name: "{{Facility 4}}" },
    { icon: "Thermometer", name: "{{Facility 5}}" },
    { icon: "ArrowDownUp", name: "{{Facility 6}}" },
    { icon: "MonitorSpeaker", name: "{{Facility 7}}" },
    { icon: "Heart", name: "{{Facility 8}}" },
  ],
  bannerText = "Hygienic & Comfortable Environment",
  bannerSubtext = "Designed for your comfort and optimal recovery",
}: FacilitiesProps) {
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
            {sectionBadge}
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 font-serif">
            {title}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {facilities.map((facility, index) => {
            const IconComponent = iconMap[facility.icon] || Zap
            return (
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
                  <IconComponent className="w-7 h-7 text-teal-600" />
                </div>
                <p className="text-sm font-medium text-slate-700">
                  {facility.name}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-8 text-center"
        >
          <p className="text-xl font-semibold text-white">
            {bannerText}
          </p>
          <p className="text-teal-100 mt-2">
            {bannerSubtext}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
