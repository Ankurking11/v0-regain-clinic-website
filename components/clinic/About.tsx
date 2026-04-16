"use client"

import { motion } from "framer-motion"
import { GraduationCap, Brain, FileCheck, Clock } from "lucide-react"
import Image from "next/image"

const credentials = [
  {
    icon: GraduationCap,
    title: "PT – RGUHS (Bengaluru)",
    description: "Regd No: 03T1437",
  },
  {
    icon: Brain,
    title: "GM – Prechtl (Austria)",
    description: "Germany Certified",
  },
  {
    icon: FileCheck,
    title: "FIMT – Bengaluru",
    description: "Fellowship Certified",
  },
  {
    icon: Clock,
    title: "NCAHP ID: 99-8238-7328-7350",
    description: "Registered Practitioner",
  },
]

export default function About() {
  return (
    <section id="about" className="py-24 bg-brand-white">
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
                src="/images/doctor/doctor-profile.jpg"
                alt="Dr. Sanjeeb Bhattacharjee"
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-brand-blue/30" />
              
              {/* Experience Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute top-6 right-6 bg-brand-blue text-white px-4 py-2 rounded-2xl shadow-xl"
              >
                <span className="text-xl font-bold">15+</span>
                <span className="text-xs ml-1">Years Experience</span>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-blue rounded-3xl -z-10 opacity-20" />
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-green rounded-3xl -z-10 opacity-20" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-brand-green/10 text-brand-green rounded-full text-sm font-medium mb-4">
              About Your Doctor
            </span>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-brand-blue mb-6 font-serif">
              Dr. Sanjeeb Bhattacharjee
              <span className="block text-xl lg:text-2xl font-normal text-brand-blue/70 mt-2">
                (P.T.) — Consultant Physiotherapist
              </span>
            </h2>

            <p className="text-lg text-brand-blue/80 leading-relaxed mb-8">
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
                  className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-brand-blue/10"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-blue rounded-xl flex items-center justify-center flex-shrink-0">
                      <cred.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-blue">
                        {cred.title}
                      </h3>
                      <p className="text-sm text-brand-blue/60">{cred.description}</p>
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
