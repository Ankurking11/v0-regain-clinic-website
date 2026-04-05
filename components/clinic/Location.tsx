"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"

const contactInfo = [
  {
    icon: MapPin,
    title: "REGAIN BABUPARA",
    content: ["Opp Lane, Daffodil School,", "Babupura Main Road, Siliguri"],
  },
  {
    icon: MapPin,
    title: "REGAIN MS SHIVMANDIR",
    content: ["Kadamtala, Opp BSF Camp,", "Shivmandir, Sainath Road", "(Below Govindo Residency)"],
  },
  {
    icon: Phone,
    title: "Phone",
    content: ["+91 82505 88279", "+91 86375 69844"],
    links: ["tel:+918250588279", "tel:+918637569844"],
  },
  {
    icon: Mail,
    title: "Email",
    content: ["sanjeebbhattacharjee0@gmail.com"],
    links: ["mailto:sanjeebbhattacharjee0@gmail.com"],
  },
]

export default function Location() {
  return (
    <section id="location" className="py-24 bg-brand-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-brand-green/10 text-brand-green rounded-full text-sm font-medium mb-4">
            Find Us
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-brand-blue mb-6 font-serif">
            Visit Our Clinic
          </h2>
          <p className="text-lg text-brand-blue/70 max-w-2xl mx-auto">
            Conveniently located in Siliguri with easy access and ample parking
            facilities.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 bg-brand-blue rounded-xl flex items-center justify-center mb-4">
                <info.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-brand-blue mb-2">{info.title}</h3>
              <div className="space-y-1">
                {info.content.map((line, i) => (
                  <p key={i} className="text-brand-blue/70">
                    {info.links?.[i] ? (
                      <a
                        href={info.links[i]}
                        className="hover:text-brand-green transition-colors"
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
          ))}
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57045.38831695825!2d88.39776271304695!3d26.71725698058567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e441615c7b7c11%3A0x6b38fb08ba4ae39f!2sSiliguri%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1703657600000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Regain Clinic Location"
            />
          </div>

          {/* Floating Card */}
          <div className="absolute top-6 left-6 bg-white rounded-2xl p-5 shadow-xl max-w-xs hidden sm:block">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-brand-blue">ReGain MS Clinic</h3>
                <span className="inline-flex items-center gap-1 text-sm text-brand-green">
                  <span className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
                  Open Now
                </span>
              </div>
            </div>
            <p className="text-sm text-brand-blue/70 mb-4">
              Clinic 1 - Babupura Main Road, Siliguri (REGAIN BABUPARA)
            </p>
            <Button
              asChild
              size="sm"
              className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white"
            >
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Siliguri,+West+Bengal"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Get Directions
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Mobile Get Directions */}
        <div className="mt-6 sm:hidden">
          <Button
            asChild
            className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white"
          >
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Siliguri,+West+Bengal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Navigation className="w-4 h-4 mr-2" />
              Get Directions
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
