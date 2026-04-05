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

const trustPoints = [
  {
    icon: UserCheck,
    title: "Personalized Treatment Plans",
    description:
      "Custom-tailored rehabilitation programs designed specifically for your condition and goals.",
  },
  {
    icon: Award,
    title: "15+ Years of Excellence",
    description:
      "Proven track record of successful treatments and thousands of satisfied patients.",
  },
  {
    icon: BookOpen,
    title: "Evidence-Based Approach",
    description:
      "Treatment protocols backed by the latest scientific research and clinical studies.",
  },
  {
    icon: Clock,
    title: "Flexible Appointment Hours",
    description:
      "Convenient scheduling options including early morning and evening slots.",
  },
  {
    icon: Heart,
    title: "Compassionate Care",
    description:
      "Patient-centered approach with genuine care for your well-being and recovery.",
  },
  {
    icon: Home,
    title: "Home Visit Services",
    description:
      "Professional physiotherapy services available at your doorstep when needed.",
  },
]

const stats = [
  { icon: Users, value: "10K+", label: "Happy Patients" },
  { icon: Star, value: "98%", label: "Success Rate" },
  { icon: Headphones, value: "24/7", label: "Support" },
]

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-brand-green/10 text-brand-green rounded-full text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-brand-blue mb-6 font-serif">
            Your Recovery, Our Priority
          </h2>
          <p className="text-lg text-brand-blue/80 max-w-2xl mx-auto">
            Experience the difference of dedicated care and expertise that sets
            us apart in physiotherapy and rehabilitation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left Column */}
          <div className="space-y-6">
            {trustPoints.slice(0, 3).map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 4 }}
                className="flex gap-4 p-5 bg-brand-blue/5 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 bg-brand-blue rounded-xl flex items-center justify-center flex-shrink-0">
                  <point.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-blue mb-1">
                    {point.title}
                  </h3>
                  <p className="text-sm text-brand-blue/80 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center - Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-brand-blue rounded-3xl p-8 text-white lg:mt-8"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Trusted by Thousands</h3>
              <p className="text-white/70">
                Our numbers speak for themselves
              </p>
            </div>

            <div className="space-y-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-white/10 rounded-xl"
                >
                  <div className="w-12 h-12 bg-brand-green rounded-xl flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="space-y-6">
            {trustPoints.slice(3, 6).map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: -4 }}
                className="flex gap-4 p-5 bg-brand-green/5 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 bg-brand-green rounded-xl flex items-center justify-center flex-shrink-0">
                  <point.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-blue mb-1">
                    {point.title}
                  </h3>
                  <p className="text-sm text-brand-blue/80 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
