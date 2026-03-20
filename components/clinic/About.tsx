"use client"

import { motion } from "framer-motion"
import { GraduationCap, Brain, FileCheck, Clock } from "lucide-react"
import Image from "next/image"

const credentials = [
  {
    icon: GraduationCap,
    title: "BPT Degree",
    description: "Bachelor of Physiotherapy",
  },
  {
    icon: Brain,
    title: "Master's in Neurological Rehabilitation",
    description: "Advanced Neuro Specialization",
  },
  {
    icon: FileCheck,
    title: "State Council Registration",
    description: "West Bengal Registered",
  },
  {
    icon: Clock,
    title: "15+ Years Clinical Experience",
    description: "Extensive Practice",
  },
]

export default function About() {
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
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80"
                alt="Dr. Sanjeeb Bhattacharjee"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              
              {/* Experience Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute top-6 right-6 bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-3 rounded-full shadow-xl"
              >
                <span className="text-2xl font-bold">15+</span>
                <span className="text-sm ml-1">Years Experience</span>
              </motion.div>
            </div>

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
              About Your Doctor
            </span>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 font-serif">
              Dr. Sanjeeb Bhattacharjee
              <span className="block text-xl lg:text-2xl font-normal text-slate-600 mt-2">
                (PT) — Consultant Physiotherapist
              </span>
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              With over 15 years of dedicated experience in physiotherapy and 
              rehabilitation, Dr. Sanjeeb Bhattacharjee has helped thousands of 
              patients regain their mobility and quality of life. Specializing in 
              neurological rehabilitation and pain management, he combines 
              evidence-based practices with compassionate care.
            </p>

            {/* Credentials Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {credentials.map((cred, index) => (
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
                      <cred.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {cred.title}
                      </h3>
                      <p className="text-sm text-slate-500">{cred.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
