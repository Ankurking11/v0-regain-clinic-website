import Navbar from "@/components/clinic/Navbar"
import Footer from "@/components/clinic/Footer"
import Hero from "@/template/sections/Hero"
import About from "@/template/sections/About"
import Services from "@/template/sections/Services"
import Facilities from "@/template/sections/Facilities"
import WhyChooseUs from "@/template/sections/WhyChooseUs"
import Testimonials from "@/template/sections/Testimonials"
import Location from "@/template/sections/Location"
import { BookingForm } from "@/modules/booking"
import { BookingAPI } from "@/modules/booking"
import { siteConfig } from "@/config/site"

export default function Home() {
  const { features } = siteConfig

  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <Hero
        title="Advanced Physiotherapy & Stroke Rehabilitation in Siliguri"
        subtitle="Expert Care for Pain, Neuro & Post-Surgical Recovery. Experience world-class rehabilitation with personalized treatment plans."
        location="Siliguri"
        badgeText="Now Accepting New Patients"
        image={siteConfig.heroImage}
        stats={siteConfig.stats.map(stat => ({
          icon: stat.icon,
          value: stat.value,
          label: stat.label,
        }))}
      />

      {/* About Section */}
      <About
        name={siteConfig.doctor.name}
        title={`(${siteConfig.doctor.credentials}) — ${siteConfig.doctor.title}`}
        credentials={siteConfig.credentials.map(cred => ({
          title: cred.title,
          description: cred.description,
        }))}
        bio={`With over ${siteConfig.doctor.experience} years of dedicated experience in physiotherapy and rehabilitation, ${siteConfig.doctor.name} has helped thousands of patients regain their mobility and quality of life. Specializing in neurological rehabilitation and pain management, he combines evidence-based practices with compassionate care.`}
        experience={siteConfig.doctor.experience}
        experienceLabel="Years Experience"
        image={siteConfig.doctor.image}
        sectionBadge="About Your Doctor"
      />

      {/* Services Section */}
      <Services
          title="Comprehensive Care Solutions"
          subtitle="We offer a wide range of specialized physiotherapy services tailored to meet your unique rehabilitation needs."
          sectionBadge="Our Services"
          services={[
            { icon: "Activity", title: "Pain Management", description: "Comprehensive treatment for chronic and acute pain conditions using advanced therapeutic techniques." },
            { icon: "Bone", title: "Joint Replacement Rehab", description: "Specialized post-operative care for hip, knee, and shoulder replacement recovery." },
            { icon: "Brain", title: "Neurological Rehabilitation", description: "Expert care for stroke recovery, Parkinson's, MS, and other neurological conditions." },
            { icon: "Baby", title: "Pediatric Physiotherapy", description: "Gentle, specialized treatment for children with developmental and motor disorders." },
            { icon: "Dumbbell", title: "Sports Injury Rehab", description: "Complete rehabilitation for athletic injuries with performance recovery programs." },
            { icon: "Stethoscope", title: "Post Surgical Rehab", description: "Structured recovery programs following orthopedic and general surgeries." },
            { icon: "Flame", title: "Burn Management", description: "Specialized therapy for burn rehabilitation, scar management, and mobility restoration." },
          ]}
        />

      {/* Facilities Section */}
      {features.facilities && (
        <Facilities
          title="State-of-the-Art Equipment"
          subtitle="Equipped with the latest technology and modern therapeutic equipment for comprehensive rehabilitation care."
          sectionBadge="Our Facilities"
          facilities={siteConfig.facilities.map(f => ({ icon: f.icon, name: f.name }))}
          bannerText="Hygienic & Comfortable Environment"
          bannerSubtext="Designed for your comfort and optimal recovery experience"
        />
      )}

      {/* Why Choose Us Section */}
      <WhyChooseUs
        title="Your Recovery, Our Priority"
        subtitle="Experience the difference of dedicated care and expertise that sets us apart in physiotherapy and rehabilitation."
        sectionBadge="Why Choose Us"
        trustPoints={siteConfig.trustPoints.map(tp => ({
          icon: tp.icon || "UserCheck",
          title: tp.title,
          description: tp.description,
        }))}
        stats={siteConfig.footerStats.map(s => ({
          icon: s.icon,
          value: s.value,
          label: s.label,
        }))}
        statsTitle="Trusted by Thousands"
        statsSubtitle="Our numbers speak for themselves"
      />

      {/* Testimonials Section */}
      {features.testimonials && (
        <Testimonials
          title="What Our Patients Say"
          subtitle="Real stories from real patients who have experienced our care and achieved remarkable recovery outcomes."
          sectionBadge="Patient Stories"
          testimonials={siteConfig.testimonials.map(t => ({
            name: t.name,
            location: t.location,
            condition: t.condition,
            rating: t.rating,
            image: t.image,
            review: t.review,
          }))}
        />
      )}

      {/* Booking Section */}
      {features.booking && (
        <BookingForm
          apiEndpoint="/api/book"
          whatsappNumber={siteConfig.contact.whatsapp}
          whatsappMessage={siteConfig.whatsappMessage}
        />
      )}

      {/* Location Section */}
      <Location
        title="Visit Our Clinic"
        subtitle="Conveniently located in Siliguri with easy access and ample parking facilities."
        sectionBadge="Find Us"
        contactInfo={[
          {
            icon: "MapPin",
            title: "Clinic 1 Address",
            content: ["Opp Lane, Daffodil School,", "Babupura Main Road, Siliguri"],
          },
          {
            icon: "MapPin",
            title: "Clinic 2 Address",
            content: ["Shiv Mandir, Siliguri"],
          },
          {
            icon: "Phone",
            title: "Phone",
            content: siteConfig.contact.phone,
            links: siteConfig.contact.phone.map(p => `tel:${p}`),
          },
          {
            icon: "Mail",
            title: "Email",
            content: [siteConfig.contact.email],
            links: [`mailto:${siteConfig.contact.email}`],
          },
        ]}
        mapEmbedUrl={siteConfig.contact.mapEmbedUrl}
        mapSearchUrl={siteConfig.contact.mapSearchUrl}
        clinicName={siteConfig.business.name}
        isOpen={true}
        openText="Open Now"
        directionText="Get Directions"
      />

      <Footer />

      {/* WhatsApp Button */}
      {features.whatsapp && (
        <BookingAPI
          whatsappNumber={siteConfig.contact.whatsapp}
          whatsappMessage={siteConfig.whatsappMessage}
        />
      )}
    </main>
  )
}
