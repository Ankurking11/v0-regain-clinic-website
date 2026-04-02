"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ContactInfo {
  icon: string
  title: string
  content: string[]
  links?: string[]
}

interface LocationProps {
  title?: string
  subtitle?: string
  sectionBadge?: string
  contactInfo?: ContactInfo[]
  mapEmbedUrl?: string
  mapSearchUrl?: string
  clinicName?: string
  isOpen?: boolean
  openText?: string
  directionText?: string
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MapPin,
  Phone,
  Mail,
}

export default function Location({
  title = "Visit Our Clinic",
  subtitle = "Conveniently located with easy access and ample parking facilities.",
  sectionBadge = "Find Us",
  contactInfo = [
    {
      icon: "MapPin",
      title: "{{Address Label}}",
      content: ["{{Address Line 1}}", "{{Address Line 2}}"],
    },
    {
      icon: "Phone",
      title: "Phone",
      content: ["{{Phone Number}}"],
      links: ["tel:{{Phone Number}}"],
    },
    {
      icon: "Mail",
      title: "Email",
      content: ["{{email@example.com}}"],
      links: ["mailto:{{email@example.com}}"],
    },
  ],
  mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57045.38831695825!2d88.39776271304695!3d26.71725698058567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e441615c7b7c11%3A0x6b38fb08ba4ae39f!2sSiliguri%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1703657600000!5m2!1sen!2sin",
  mapSearchUrl = "https://www.google.com/maps/dir/?api=1&destination=Siliguri,+West+Bengal",
  clinicName = "{{Clinic Name}}",
  isOpen = true,
  openText = "Open Now",
  directionText = "Get Directions",
}: LocationProps) {
  return (
    <section id="location" className="py-24 bg-slate-50">
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

        {/* Contact Info Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => {
            const IconComponent = iconMap[info.icon] || MapPin
            return (
              <motion.div
                key={info.title + index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{info.title}</h3>
                <div className="space-y-1">
                  {info.content.map((line, i) => (
                    <p key={i} className="text-slate-600">
                      {info.links?.[i] ? (
                        <a
                          href={info.links[i]}
                          className="hover:text-teal-600 transition-colors"
                        >
                          {line}
                        </a>
                      ) : (
                        line
                      )}
                    </p>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden shadow-xl"
        >
          <div className="aspect-[16/9] lg:aspect-[21/9]">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={clinicName}
            />
          </div>

          {/* Floating Card */}
          <div className="absolute top-6 left-6 bg-white rounded-2xl p-5 shadow-xl max-w-xs hidden sm:block">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{clinicName}</h3>
                {isOpen && (
                  <span className="inline-flex items-center gap-1 text-sm text-green-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    {openText}
                  </span>
                )}
              </div>
            </div>
            <Button
              asChild
              size="sm"
              className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white"
            >
              <a
                href={mapSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Navigation className="w-4 h-4 mr-2" />
                {directionText}
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Mobile Get Directions */}
        <div className="mt-6 sm:hidden">
          <Button
            asChild
            className="w-full bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white"
          >
            <a
              href={mapSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Navigation className="w-4 h-4 mr-2" />
              {directionText}
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
