import Navbar from "@/components/clinic/Navbar"
import Hero from "@/components/clinic/Hero"
import About from "@/components/clinic/About"
import Services from "@/components/clinic/Services"
import Facilities from "@/components/clinic/Facilities"
import WhyChooseUs from "@/components/clinic/WhyChooseUs"
import Testimonials from "@/components/clinic/Testimonials"
import Gallery from "@/components/clinic/Gallery"
import Appointment from "@/components/clinic/Appointment"
import Location from "@/components/clinic/Location"
import Footer from "@/components/clinic/Footer"
import WhatsAppButton from "@/components/clinic/WhatsAppButton"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Facilities />
      <WhyChooseUs />
      <Gallery />
      <Testimonials />
      <Appointment />
      <Location />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
