"use client"

import { motion } from "framer-motion"
import {
  UserCheck,
  Award,
  BookOpen,
  Clock,
  Heart,
  Home,
  Users,
  Star,
  Headphones,
} from "lucide-react"

interface TrustPoint {
  icon: string
  title: string
  description: string
}

interface Stat {
  icon: string
  value: string
  label: string
}

interface WhyChooseUsProps {
  title?: string
  subtitle?: string
  sectionBadge?: string
  trustPoints?: TrustPoint[]
  stats?: Stat[]
  statsTitle?: string
  statsSubtitle?: string
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  UserCheck,
  Award,
  BookOpen,
  Clock,
  Heart,
  Home,
  Users,
  Star,
  Headphones,
}

export default function WhyChooseUs({
  title = "Your Recovery, Our Priority",
  subtitle = "Experience the difference of dedicated care and expertise.",
  sectionBadge = "Why Choose Us",
  trustPoints = [
    { icon: "UserCheck", title: "{{Trust Point 1}}", description: "{{Description}}" },
    { icon: "Award", title: "{{Trust Point 2}}", description: "{{Description}}" },
    { icon: "BookOpen", title: "{{Trust Point 3}}", description: "{{Description}}" },
    { icon: "Clock", title: "{{Trust Point 4}}", description: "{{Description}}" },
    { icon: "Heart", title: "{{Trust Point 5}}", description: "{{Description}}" },
    { icon: "Home", title: "{{Trust Point 6}}", description: "{{Description}}" },
  ],
  stats = [
    { icon: "Users", value: "{{value}}", label: "Happy Patients" },
    { icon: "Star", value: "{{value}}", label: "Success Rate" },
    { icon: "Headphones", value: "{{value}}", label: "Support" },
  ],
  statsTitle = "Trusted by Thousands",
  statsSubtitle = "Our numbers speak for themselves",
}: WhyChooseUsProps) {
  return (
    <section className="py-24 bg-white">
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

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left Column */}
          <div className="space-y-6">
            {trustPoints.slice(0, 3).map((point, index) => {
              const IconComponent = iconMap[point.icon] || UserCheck
              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="flex gap-4 p-5 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">
                      {point.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Center - Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-3xl p-8 text-white lg:mt-8"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">{statsTitle}</h3>
              <p className="text-slate-400">
                {statsSubtitle}
              </p>
            </div>

            <div className="space-y-6">
              {stats.map((stat, index) => {
                const IconComponent = iconMap[stat.icon] || Users
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-slate-400">{stat.label}</div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="space-y-6">
            {trustPoints.slice(3, 6).map((point, index) => {
              const IconComponent = iconMap[point.icon] || Heart
              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: -4 }}
                  className="flex gap-4 p-5 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">
                      {point.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
