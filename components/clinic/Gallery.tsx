"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, ZoomIn } from "lucide-react"

const galleryItems = [
  {
    src: "/images/gallery/gallery-01.jpg",
    alt: "Physiotherapy treatment room",
    category: "Staff",
    caption: "Modern Treatment Room",
  },
  {
    src: "/images/gallery/gallery-02.jpg",
    alt: "Clinic reception area",
    category: "Staff",
    caption: "Reception & Waiting Area",
  },
  {
    src: "/images/gallery/gallery-03.jpg",
    alt: "Dr. Sanjeeb Bhattacharjee",
    category: "Clinic",
    caption: "Dr. Sanjeeb Bhattacharjee",
  },
  {
    src: "/images/gallery/gallery-04.jpg",
    alt: "Physiotherapy session",
    category: "Staff",
    caption: "Rehabilitation Session",
  },
  {
    src: "/images/gallery/gallery-05.jpg",
    alt: "Physiotherapy equipment",
    category: "Staff",
    caption: "Advanced Equipment",
  },
  {
    src: "/images/gallery/gallery-06.jpg",
    alt: "Staff team",
    category: "Clinic",
    caption: "Our Care Team",
  },
]

const categories = ["All", "Clinic", "Staff"]

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null))
  const nextImage = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null))

  return (
    <section id="gallery" className="py-24 bg-brand-blue/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-brand-green/10 text-brand-green rounded-full text-sm font-medium mb-4">
            Photo Gallery
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-brand-blue mb-6 font-serif">
            Our Clinic & Team
          </h2>
          <p className="text-lg text-brand-blue/70 max-w-2xl mx-auto">
            Take a look inside ReGain MS Clinic — our state-of-the-art facilities and
            the dedicated team that makes your recovery possible.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-brand-blue text-white shadow-md"
                  : "bg-white text-brand-blue border border-brand-blue/20 hover:border-brand-blue/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.div
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -4 }}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-brand-blue/0 group-hover:bg-brand-blue/25 transition-all duration-300" />
                {/* Zoom Icon */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev / Next */}
            <button
              className="absolute left-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-xl transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); prevImage() }}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              className="absolute right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-xl transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); nextImage() }}
              aria-label="Next image"
            >
              ›
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-3xl aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].alt}
                fill
                className="object-contain rounded-xl"
              />
              <p className="absolute bottom-0 left-0 right-0 text-center text-white bg-black/40 py-2 rounded-b-xl text-sm">
                {filtered[lightboxIndex].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
