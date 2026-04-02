"use client"

import { motion } from "framer-motion"
import { GraduationCap, Brain, FileCheck, Clock } from "lucide-react"
import Image from "next/image"

interface Credential {
  title: string
  description: string
  icon?: string
}

interface AboutProps {
  name?: string
  title?: string
  credentials?: Credential[]
  bio?: string
  experience?: string
  experienceLabel?: string
  image?: string
  sectionBadge?: string
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  Brain,
  FileCheck,
  Clock,
}

export default function About({
  name = "{{Doctor Name}}",
  title = "{{Title}}",
  credentials = [
    { title: "{{Credential 1}}", description: "{{Description}}", icon: "GraduationCap" },
    { title: "{{Credential 2}}", description: "{{Description}}", icon: "Brain" },
    { title: "{{Credential 3}}", description: "{{Description}}", icon: "FileCheck" },
    { title: "{{Credential 4}}", description: "{{Description}}", icon: "Clock" },
  ],
  bio = "{{Add a compelling bio here about the practitioner's experience and expertise.}}",
  experience = "{{experience}}",
  experienceLabel = "Years Experience",
  image,
  sectionBadge = "About Your Doctor",
}: AboutProps) {
  return (
    <section id="about" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <Image
                src={image || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80"}
                alt={name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
            </div>

            {/* Experience Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute top-6 right-6 bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-3 rounded-full shadow-xl"
            >
              <span className="text-2xl font-bold">{experience}</span>
              <span className="text-sm ml-1">{experienceLabel}</span>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-teal-600 to-blue-600 rounded-3xl -z-10 opacity-20" />
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl -z-10 opacity-20" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
              {sectionBadge}
            </span>

            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 font-serif">
              {name}
              <span className="block text-xl lg:text-2xl font-normal text-slate-600 mt-2">
                {title}
              </span>
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              {bio}
            </p>

            {/* Credentials Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {credentials.map((cred, index) => {
                const IconComponent = iconMap[cred.icon || "GraduationCap"] || GraduationCap
                return (
                  <motion.div
                    key={cred.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {cred.title}
                        </h3>
                        <p className="text-sm text-slate-500">{cred.description}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
