"use client"

import { motion } from "framer-motion"
import { ChevronUp, Facebook, Instagram, Youtube } from "lucide-react"
import Link from "next/link"
import { siteConfig } from "@/config/site"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="#" className="inline-block mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                {siteConfig.business.logoText}
              </span>
              <p className="text-sm text-slate-400 mt-1">{siteConfig.business.tagline}</p>
            </Link>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Your trusted partner in rehabilitation and physiotherapy care.
              Helping you regain your mobility and quality of life.
            </p>
            <div className="flex gap-4">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 bg-slate-800 hover:bg-gradient-to-r hover:from-teal-600 hover:to-blue-600 rounded-lg flex items-center justify-center transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 bg-slate-800 hover:bg-gradient-to-r hover:from-teal-600 hover:to-blue-600 rounded-lg flex items-center justify-center transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 bg-slate-800 hover:bg-gradient-to-r hover:from-teal-600 hover:to-blue-600 rounded-lg flex items-center justify-center transition-all duration-300"
              >
                <Youtube className="w-5 h-5" />
              </a>
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
              {siteConfig.footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-teal-400 transition-colors"
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
              {siteConfig.services.slice(0, 6).map((service) => (
                <li key={service}>
                  <Link
                    href="#services"
                    className="text-slate-400 hover:text-teal-400 transition-colors"
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
            <div className="space-y-4 text-slate-400">
              {siteConfig.locations.map((loc, i) => (
                <p key={loc.id}>
                  <span className="block text-white font-medium">{loc.label}:</span>
                  {loc.address}
                </p>
              ))}
              <p>
                <span className="block text-white font-medium">Phone:</span>
                {siteConfig.contact.phone.map((phone, i) => (
                  <span key={phone}>
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="hover:text-teal-400 transition-colors"
                    >
                      {phone}
                    </a>
                    {i < siteConfig.contact.phone.length - 1 && <br />}
                  </span>
                ))}
              </p>
              <p>
                <span className="block text-white font-medium">Email:</span>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-teal-400 transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} {siteConfig.business.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="text-sm text-slate-400 hover:text-teal-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-slate-400 hover:text-teal-400 transition-colors"
              >
                Terms of Service
              </Link>
              <button
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className="w-10 h-10 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 rounded-lg flex items-center justify-center transition-all duration-300"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
