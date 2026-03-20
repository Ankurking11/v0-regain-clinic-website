"use client"

import { motion } from "framer-motion"
import {
  Activity,
  Bone,
  Brain,
  Baby,
  Dumbbell,
  Stethoscope,
  Flame,
} from "lucide-react"

const services = [
  {
    icon: Activity,
    title: "Pain Management",
    description:
      "Comprehensive treatment for chronic and acute pain conditions using advanced therapeutic techniques.",
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-50",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
  },
  {
    icon: Bone,
    title: "Joint Replacement Rehab",
    description:
      "Specialized post-operative care for hip, knee, and shoulder replacement recovery.",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Brain,
    title: "Neurological Rehabilitation",
    description:
      "Expert care for stroke recovery, Parkinson's, MS, and other neurological conditions.",
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-50",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    icon: Baby,
    title: "Pediatric Physiotherapy",
    description:
      "Gentle, specialized treatment for children with developmental and motor disorders.",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    icon: Dumbbell,
    title: "Sports Injury Rehab",
    description:
      "Complete rehabilitation for athletic injuries with performance recovery programs.",
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-emerald-50",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    icon: Stethoscope,
    title: "Post Surgical Rehab",
    description:
      "Structured recovery programs following orthopedic and general surgeries.",
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-50",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
  },
  {
    icon: Flame,
    title: "Burn Management",
    description:
      "Specialized therapy for burn rehabilitation, scar management, and mobility restoration.",
    color: "from-red-500 to-orange-500",
    bgColor: "bg-red-50",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 font-serif">
            Comprehensive Care Solutions
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We offer a wide range of specialized physiotherapy services tailored
            to meet your unique rehabilitation needs.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden"
            >
              {/* Top Gradient Border on Hover */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
              />

              <div
                className={`w-14 h-14 ${service.iconBg} rounded-xl flex items-center justify-center mb-5`}
              >
                <service.icon className={`w-7 h-7 ${service.iconColor}`} />
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {service.title}
              </h3>

              <p className="text-slate-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
