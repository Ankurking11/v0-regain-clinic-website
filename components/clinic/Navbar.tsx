"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, Menu, X, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const navLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Facilities", href: "#facilities" },
  { name: "Contact", href: "#location" },
]

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {/* Announcement Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-8 bg-brand-blue/5 border-b border-brand-blue/10 flex items-center justify-center">
        <p className="text-xs text-brand-blue text-center">
          Built by{" "}
          <a
            href="https://www.evolvnex.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:underline"
          >
            EvolvNex
          </a>
          {" "}— High-converting websites for clinics
        </p>
      </div>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-8 left-0 right-0 z-50 bg-brand-white shadow-lg transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto pl-2 pr-4 sm:pl-3 sm:pr-6 lg:pl-4 lg:pr-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="#"
              onClick={(e) => { e.preventDefault(); handleScrollToTop(); }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <Image
                src="/favicon.png"
                alt="ReGain MS Clinic Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-brand-blue">
                  ReGain MS Clinic
                </span>
                <span className="text-xs text-brand-blue/60 tracking-wider">
                  Touching Mobility
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-brand-blue hover:text-brand-green transition-colors font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+918250588279"
                className="flex items-center gap-2 text-brand-blue hover:text-brand-green transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">+91 82505 88279</span>
              </a>
              <Button
                asChild
                className="bg-brand-blue/10 text-brand-blue border border-brand-blue/30 transition-all duration-300 hover:bg-brand-blue hover:text-white hover:scale-105"
              >
                <Link href="#appointment">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-brand-blue"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-brand-white shadow-2xl lg:hidden"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center mb-8">
                <button
                  onClick={() => { handleScrollToTop(); setIsMobileMenuOpen(false); }}
                  className="flex items-center gap-3 cursor-pointer text-left"
                >
                  <Image
                    src="/favicon.png"
                    alt="ReGain MS Clinic Logo"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-brand-blue">
                      ReGain MS Clinic
                    </span>
                    <span className="text-xs text-brand-blue/60">
                      Touching Mobility
                    </span>
                  </div>
                </button>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-brand-blue"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 text-lg font-medium text-brand-blue hover:text-brand-green border-b border-brand-blue/10"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto space-y-4">
                <a
                  href="tel:+918250588279"
                  className="flex items-center gap-3 p-4 bg-brand-blue/5 rounded-lg"
                >
                  <Phone className="w-5 h-5 text-brand-blue" />
                  <span className="font-medium text-brand-blue">
                    +91 82505 88279
                  </span>
                </a>
                <Button
                  asChild
                  className="w-full bg-brand-blue/10 text-brand-blue border border-brand-blue/30 transition-all duration-300 hover:bg-brand-blue hover:text-white hover:scale-105"
                >
                  <Link
                    href="#appointment"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Appointment
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-brand-blue/50 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  )
}
