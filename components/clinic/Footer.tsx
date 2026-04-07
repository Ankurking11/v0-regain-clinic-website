"use client"

import { motion } from "framer-motion"
import { ChevronUp, Facebook, Instagram, Youtube } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const quickLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Facilities", href: "#facilities" },
  { name: "Appointment", href: "#appointment" },
  { name: "Contact", href: "#location" },
]

const services = [
  "Pain Management",
  "Joint Replacement Rehab",
  "Neurological Rehabilitation",
  "Pediatric Physiotherapy",
  "Sports Injury Rehab",
  "Post Surgical Rehab",
]

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-brand-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="#" className="inline-block mb-4">
              <span className="text-2xl font-bold text-white">
                ReGain MS Clinic
              </span>
              <p className="text-sm text-white/70 mt-1">Touching Mobility</p>
            </Link>
            <p className="text-white/70 mb-6 leading-relaxed">
              Your trusted partner in rehabilitation and physiotherapy care.
              Helping you regain your mobility and quality of life.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/10 hover:bg-brand-green rounded-lg flex items-center justify-center transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-brand-green transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="#services"
                    className="text-white/70 hover:text-brand-green transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4 text-white/70">
              <p>
                <span className="block text-white font-medium">REGAIN BABUPARA:</span>
                Opp Lane, Daffodil School, Babupura Main Road, Siliguri
                <br />
                <span className="block text-white font-medium mt-2">REGAIN MS SHIVMANDIR:</span>
                Kadamtala, Opp BSF Camp, Shivmandir, Sainath Road (Below Govindo Residency)
              </p>
              <p>
                <span className="block text-white font-medium">Phone:</span>
                <a
                  href="tel:+918250588279"
                  className="hover:text-brand-green transition-colors"
                >
                  +91 82505 88279
                </a>
                <br />
                <a
                  href="tel:+918637569844"
                  className="hover:text-brand-green transition-colors"
                >
                  +91 86375 69844
                </a>
              </p>
              <p>
                <span className="block text-white font-medium">Email:</span>
                <a
                  href="mailto:sanjeebbhattacharjee0@gmail.com"
                  className="hover:text-brand-green transition-colors"
                >
                  sanjeebbhattacharjee0@gmail.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/70 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} ReGain MS Clinic Physiotherapy.
              All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="text-sm text-white/70 hover:text-brand-green transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-white/70 hover:text-brand-green transition-colors"
              >
                Terms of Service
              </Link>
              <button
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className="w-10 h-10 bg-brand-green hover:bg-brand-green/90 rounded-lg flex items-center justify-center transition-all duration-300"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
            </div>
          </div>
          <p className="text-xs text-white text-center mt-3">
            Website by{" "}
            <a
              href="https://www.evolvnex.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:underline hover:text-white transition-colors"
            >
              <Image
                src="/Light_full_logo.png"
                alt="EvolvNex"
                width={110}
                height={30}
                className="inline-block transition-opacity"
              />
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
