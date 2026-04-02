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
  Zap,
} from "lucide-react"

interface Service {
  icon: string
  title: string
  description: string
  color?: string
}

interface ServicesProps {
  title?: string
  subtitle?: string
  sectionBadge?: string
  services?: Service[]
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Activity,
  Bone,
  Brain,
  Baby,
  Dumbbell,
  Stethoscope,
  Flame,
  Zap,
}

const defaultColors = [
  "from-rose-500 to-pink-500",
  "from-blue-500 to-cyan-500",
  "from-violet-500 to-purple-500",
  "from-amber-500 to-orange-500",
  "from-emerald-500 to-green-500",
  "from-teal-500 to-cyan-500",
  "from-red-500 to-orange-500",
]

export default function Services({
  title = "Comprehensive Care Solutions",
  subtitle = "We offer a wide range of specialized services tailored to meet your unique needs.",
  sectionBadge = "Our Services",
  services = [
    { icon: "Activity", title: "{{Service 1}}", description: "{{Service description}}" },
    { icon: "Bone", title: "{{Service 2}}", description: "{{Service description}}" },
    { icon: "Brain", title: "{{Service 3}}", description: "{{Service description}}" },
    { icon: "Baby", title: "{{Service 4}}", description: "{{Service description}}" },
    { icon: "Dumbbell", title: "{{Service 5}}", description: "{{Service description}}" },
    { icon: "Stethoscope", title: "{{Service 6}}", description: "{{Service description}}" },
  ],
}: ServicesProps) {
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
            {sectionBadge}
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 font-serif">
            {title}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Activity
            const color = service.color || defaultColors[index % defaultColors.length]
            const bgColor = color.replace("from-", "bg-").replace(" to-", "-").split("-").slice(0, 2).join("-").replace("-500", "-50").replace("from-", "")
            const iconBg = bgColor.replace("-50", "-100")
            const iconColor = iconBg.replace("-100", "-600")

            return (
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
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                />

                <div
                  className={`w-14 h-14 ${iconBg} rounded-xl flex items-center justify-center mb-5`}
                >
                  <IconComponent className={`w-7 h-7 ${iconColor}`} />
                </div>

                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {service.title}
                </h3>

                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
