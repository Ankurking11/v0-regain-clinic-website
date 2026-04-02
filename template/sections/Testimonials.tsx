"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

interface Testimonial {
  name: string
  location: string
  condition: string
  rating: number
  image: string
  review: string
}

interface TestimonialsProps {
  title?: string
  subtitle?: string
  sectionBadge?: string
  testimonials?: Testimonial[]
}

export default function Testimonials({
  title = "What Our Patients Say",
  subtitle = "Real stories from real patients who have experienced our care.",
  sectionBadge = "Patient Stories",
  testimonials = [
    {
      name: "{{Patient Name}}",
      location: "{{Location}}",
      condition: "{{Condition}}",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
      review: "{{Patient review text}}",
    },
    {
      name: "{{Patient Name}}",
      location: "{{Location}}",
      condition: "{{Condition}}",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
      review: "{{Patient review text}}",
    },
    {
      name: "{{Patient Name}}",
      location: "{{Location}}",
      condition: "{{Condition}}",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
      review: "{{Patient review text}}",
    },
  ],
}: TestimonialsProps) {
  return (
    <section className="py-24 bg-slate-50">
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

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name + index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 right-8">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full flex items-center justify-center">
                  <Quote className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="text-slate-600 leading-relaxed mb-6">
                &quot;{testimonial.review}&quot;
              </p>

              {/* Patient Info */}
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-slate-500">{testimonial.location}</p>
                </div>
              </div>

              {/* Condition Badge */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-medium">
                  {testimonial.condition}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
