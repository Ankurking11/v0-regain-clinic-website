"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Siliguri",
    condition: "Post Stroke Recovery",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    review:
      "After my stroke, I thought I would never walk again. Dr. Bhattacharjee's expertise and dedicated care helped me regain my mobility. His personalized approach made all the difference.",
  },
  {
    name: "Priya Sharma",
    location: "Darjeeling",
    condition: "Knee Replacement Rehab",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    review:
      "The post-surgery rehabilitation at Regain Clinic was exceptional. Within weeks, I was able to climb stairs again. The facilities are modern and the staff is incredibly supportive.",
  },
  {
    name: "Amit Ghosh",
    location: "Jalpaiguri",
    condition: "Chronic Back Pain",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    review:
      "Years of back pain kept me from enjoying life. The comprehensive treatment plan here addressed not just symptoms but the root cause. I'm now pain-free and active again.",
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-brand-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-brand-green/10 text-brand-green rounded-full text-sm font-medium mb-4">
            Patient Stories
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-brand-blue mb-6 font-serif">
            What Our Patients Say
          </h2>
          <p className="text-lg text-brand-blue/70 max-w-2xl mx-auto">
            Real stories from real patients who have experienced our care and
            achieved remarkable recovery outcomes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 right-8">
                <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center">
                  <Quote className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-brand-green text-brand-green"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="text-brand-blue/70 leading-relaxed mb-6">
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
                  <h4 className="font-semibold text-brand-blue">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-brand-blue/60">{testimonial.location}</p>
                </div>
              </div>

              {/* Condition Badge */}
              <div className="mt-4 pt-4 border-t border-brand-blue/10">
                <span className="inline-block px-3 py-1 bg-brand-green/10 text-brand-green rounded-full text-sm font-medium">
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
