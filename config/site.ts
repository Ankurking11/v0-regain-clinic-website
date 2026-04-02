/**
 * Site Configuration - Business-specific values
 * This file contains all hardcoded business data extracted from components
 * Used by template components and modules via props/config
 */

export const siteConfig = {
  business: {
    name: "ReGain MS Clinic",
    tagline: "Touching Mobility",
    // Placeholder logo text - replace with actual logo
    logoText: "ReGain MS Clinic",
  },
  meta: {
    title: "Regain Clinic & Rehabilitation | Advanced Physiotherapy in Siliguri",
    description:
      "Expert physiotherapy care for pain management, stroke rehabilitation, neurological conditions, and post-surgical recovery. Dr. Sanjeeb Bhattacharjee - 15+ years experience in Siliguri, West Bengal.",
    keywords:
      "physiotherapy, rehabilitation, Siliguri, stroke recovery, pain management, neurological rehabilitation, Dr. Sanjeeb Bhattacharjee",
    author: "Regain Clinic & Rehabilitation",
    locale: "en_IN",
  },
  contact: {
    phone: ["+91 82505 88279", "+91 86375 69844"],
    email: "sanjeebbhattacharjee0@gmail.com",
    whatsapp: "918250588279",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57045.38831695825!2d88.39776271304695!3d26.71725698058567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e441615c7b7c11%3A0x6b38fb08ba4ae39f!2sSiliguri%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1703657600000!5m2!1sen!2sin",
    mapSearchUrl: "https://www.google.com/maps/dir/?api=1&destination=Siliguri,+West+Bengal",
  },
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
  },
  doctor: {
    name: "Dr. Sanjeeb Bhattacharjee",
    credentials: "P.T.",
    title: "Consultant Physiotherapist",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
    experience: "15+",
    registration: "NCAHP ID: 99-8238-7328-7350",
  },
  locations: [
    {
      id: "babupara",
      name: "Babupara",
      label: "Clinic 1",
      address: "Opp Lane, Daffodil School, Babupura Main Road, Siliguri",
      shortAddress: "Babupura Main Road, Siliguri",
    },
    {
      id: "shivmandir",
      name: "Shivmandir",
      label: "Clinic 2",
      address: "Shiv Mandir, Siliguri",
      shortAddress: "Shiv Mandir, Siliguri",
    },
  ],
  // Branch-specific schedule: which days and time slots
  // day values: 0=Sunday, 1=Monday, ..., 6=Saturday
  branchSchedule: {
    babupara: {
      days: [1, 2, 4, 6] as number[], // Mon=1, Tue=2, Thu=4, Sat=6
      slots: {
        1: ["4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM"], // Monday
        2: ["9:00 AM", "9:30 AM"], // Tuesday
        4: ["9:00 AM", "9:30 AM"], // Thursday
        6: ["9:00 AM", "9:30 AM"], // Saturday
      },
    },
    shivmandir: {
      days: [3, 6] as number[], // Wed=3, Sat=6
      slots: {
        3: ["4:00 PM", "4:30 PM"], // Wednesday
        6: ["4:00 PM", "4:30 PM"], // Saturday
      },
    },
  },
  services: [
    "Pain Management",
    "Joint Replacement Rehab",
    "Neurological Rehabilitation",
    "Pediatric Physiotherapy",
    "Sports Injury Rehab",
    "Post Surgical Rehab",
    "Burn Management",
    "General Consultation",
  ],
  facilities: [
    { icon: "Radio", name: "Ultrasound Therapy" },
    { icon: "Magnet", name: "IFT" },
    { icon: "Zap", name: "TENS" },
    { icon: "Sparkles", name: "Laser Therapy" },
    { icon: "Thermometer", name: "Shockwave Therapy" },
    { icon: "Thermometer", name: "SWD" },
    { icon: "ArrowDownUp", name: "Electronic Traction" },
    { icon: "Zap", name: "Faradic & Galvanic" },
    { icon: "MonitorSpeaker", name: "Russian Current" },
    { icon: "Heart", name: "Cryotherapy (Ice)" },
    { icon: "Dumbbell", name: "Deep Heat Therapy" },
    { icon: "Accessibility", name: "Manual Techniques" },
    { icon: "ClipboardCheck", name: "Dry Needling" },
    { icon: "Heart", name: "Deep Tissue Massage" },
    { icon: "Footprints", name: "Kinesio Taping" },
    { icon: "Dumbbell", name: "Exercise Therapy" },
    { icon: "Footprints", name: "Gait & Balance Training" },
    { icon: "MonitorSpeaker", name: "Biofeedback" },
  ],
  credentials: [
    { title: "PT – RGUHS (Bengaluru)", description: "Regd No: 03T1437" },
    { title: "GM – Prechtl (Austria)", description: "Germany Certified" },
    { title: "FIMT – Bengaluru", description: "Fellowship Certified" },
    { title: "NCAHP ID: 99-8238-7328-7350", description: "Registered Practitioner" },
  ],
  testimonials: [
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
  ],
  stats: [
    { icon: "Award", value: "15+", label: "Years Experience" },
    { icon: "Users", value: "10K+", label: "Patients Treated" },
    { icon: "TrendingUp", value: "98%", label: "Success Rate" },
  ],
  trustPoints: [
    { title: "Personalized Treatment Plans", description: "Custom-tailored rehabilitation programs designed specifically for your condition and goals." },
    { title: "15+ Years of Excellence", description: "Proven track record of successful treatments and thousands of satisfied patients." },
    { title: "Evidence-Based Approach", description: "Treatment protocols backed by the latest scientific research and clinical studies." },
    { title: "Flexible Appointment Hours", description: "Convenient scheduling options including early morning and evening slots." },
    { title: "Compassionate Care", description: "Patient-centered approach with genuine care for your well-being and recovery." },
    { title: "Home Visit Services", description: "Professional physiotherapy services available at your doorstep when needed." },
  ],
  footerStats: [
    { icon: "Users", value: "10K+", label: "Happy Patients" },
    { icon: "Star", value: "98%", label: "Success Rate" },
    { icon: "Headphones", value: "24/7", label: "Support" },
  ],
  heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80",
  navLinks: [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Facilities", href: "#facilities" },
    { name: "Contact", href: "#location" },
  ],
  footerLinks: [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Facilities", href: "#facilities" },
    { name: "Appointment", href: "#appointment" },
    { name: "Contact", href: "#location" },
  ],
  whatsappMessage: "Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20ReGain%20MS%20Clinic.",
  colors: {
    primary: "teal",
    primaryGradient: "from-teal-600 to-blue-600",
    primaryGradientHover: "from-teal-700 to-blue-700",
    themeColor: "#0d9488",
  },
  themeConfig: {
    backgroundImage: {
      src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80",
      alt: "Physiotherapy session",
    },
    mapTitle: "Regain Clinic Location",
  },
  /** Feature flags - toggle modules on/off */
  features: {
    booking: true,
    testimonials: true,
    facilities: true,
    whatsapp: true,
    onlineConsult: true,
  },
} as const

export type SiteConfig = typeof siteConfig
