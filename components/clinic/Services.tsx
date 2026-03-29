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
    color: "bg-brand-blue",
    iconBg: "bg-brand-blue/10",
    iconColor: "text-brand-blue",
  },
  {
    icon: Bone,
    title: "Joint Replacement Rehab",
    description:
      "Specialized post-operative care for hip, knee, and shoulder replacement recovery.",
    color: "bg-brand-green",
    iconBg: "bg-brand-green/10",
    iconColor: "text-brand-green",
  },
  {
    icon: Brain,
    title: "Neurological Rehabilitation",
    description:
      "Expert care for stroke recovery, Parkinson's, MS, and other neurological conditions.",
    color: "bg-brand-blue",
    iconBg: "bg-brand-blue/10",
    iconColor: "text-brand-blue",
  },
  {
    icon: Baby,
    title: "Pediatric Physiotherapy",
    description:
      "Gentle, specialized treatment for children with developmental and motor disorders.",
    color: "bg-brand-green",
    iconBg: "bg-brand-green/10",
    iconColor: "text-brand-green",
  },
  {
    icon: Dumbbell,
    title: "Sports Injury Rehab",
    description:
      "Complete rehabilitation for athletic injuries with performance recovery programs.",
    color: "bg-brand-blue",
    iconBg: "bg-brand-blue/10",
    iconColor: "text-brand-blue",
  },
  {
    icon: Stethoscope,
    title: "Post Surgical Rehab",
    description:
      "Structured recovery programs following orthopedic and general surgeries.",
    color: "bg-brand-green",
    iconBg: "bg-brand-green/10",
    iconColor: "text-brand-green",
  },
  {
    icon: Flame,
    title: "Burn Management",
    description:
      "Specialized therapy for burn rehabilitation, scar management, and mobility restoration.",
    color: "bg-brand-blue",
    iconBg: "bg-brand-blue/10",
    iconColor: "text-brand-blue",
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
          <span className="inline-block px-4 py-2 bg-brand-green/10 text-brand-green rounded-full text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-brand-blue mb-6 font-serif">
            Comprehensive Care Solutions
          </h2>
          <p className="text-lg text-brand-blue/70 max-w-2xl mx-auto">
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
              className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-blue/10 overflow-hidden"
            >
              {/* Top color bar on hover */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 ${service.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
              />

              <div
                className={`w-14 h-14 ${service.iconBg} rounded-xl flex items-center justify-center mb-5`}
              >
                <service.icon className={`w-7 h-7 ${service.iconColor}`} />
              </div>

              <h3 className="text-xl font-semibold text-brand-blue mb-3">
                {service.title}
              </h3>

              <p className="text-brand-blue/70 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
