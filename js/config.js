/**
 * CLIENT CONFIGURATION - SHINE FOREVER WINDOW CLEANING (CLIENT #24)
 */
const SITE_CONFIG = {
  clientId: 24,
  businessName: "Shine Forever window cleaning",
  legalName: "Shine Forever window cleaning Inc.",
  tagline: "Premium Home & Commercial Cleaning Services in Toronto & GTA",
  phone: "+1 416-555-0199",
  displayPhone: "+1 416-555-0199",
  whatsappPhone: "14165550199",
  email: "info@shineforeverwindowcleaning.ca",
  address: "Shine Forever window cleaning",
  city: "Toronto",
  province: "Ontario",
  postalCode: "L6Y 0A1",
  country: "Canada",
  rating: "4.8",
  reviewsCount: "53",
  googleMapsUrl: "https://www.google.com/maps/place/Shine+Forever+window+cleaning/data=!4m7!3m6!1s0x4cdc67a9a0ecda53:0x89174fed43c5239e!8m2!3d43.7242246!4d-79.6466509!16s%2Fg%2F11vql1bbm8!19sChIJU9rsoKln3EwRniPFQ-1PF4k?authuser=0&hl=en&rclk=1",
  featuredReview: "Came next day and they were fast and efficient at a very fair price.",
  hours: {
    weekdays: "7:00 AM - 9:00 PM",
    weekends: "8:00 AM - 7:00 PM",
    emergency: "24/7 Emergency Cleaning Available"
  },
  trustPillars: [
    { title: "100% Licensed & Insured", icon: "shield-check", desc: "Full liability coverage up to $2M for your total peace of mind." },
    { title: "Background Checked Staff", icon: "user-check", desc: "Every technician passes rigorous background verification." },
    { title: "Eco-Friendly Products", icon: "leaf", desc: "Non-toxic, bio-degradable formulas safe for children & pets." },
    { title: "100% Satisfaction Guarantee", icon: "award", desc: "If you're not delighted, we re-clean within 24 hours free of charge." }
  ],
  pricingPackages: [
    { id: "basic", name: "Basic Maintenance", badge: "Standard", price: "$120", period: "per visit", desc: "Routine upkeep.", features: ["Dusting accessible surfaces", "Vacuuming carpets", "Mopping hard floors", "Kitchen counter wipedown"] },
    { id: "standard", name: "Standard Deep Clean", badge: "Most Popular", price: "$180", period: "per visit", desc: "Top-to-bottom detail.", features: ["Everything in Basic", "Deep scrub bathtubs & tile grout", "Stovetop scrub & microwave interior", "Baseboard dusting"] },
    { id: "deep", name: "Premium Deep Clean", badge: "Luxury Detail", price: "$270", period: "per visit", desc: "Intensive sanitization.", features: ["Everything in Standard", "Oven interior deep scrub", "Fridge interior disinfected", "Inside window wiping"] },
    { id: "moveout", name: "Move-In / Move-Out", badge: "Tenant Guarantee", price: "$340", period: "full property", desc: "Landlord inspection approved.", features: ["Inside all cabinets & drawers", "Full appliance detailing", "Baseboard wash"] }
  ],
  serviceAreas: [
    { name: "Toronto", region: "Primary Service Area", active: true, popular: true },
    { name: "Brampton", region: "Peel Region", active: true, popular: true },
    { name: "Toronto", region: "GTA Core", active: true, popular: true },
    { name: "Mississauga", region: "Peel Region", active: true, popular: true }
  ],
  services: [
    { id: "regular", name: "Regular House Cleaning", category: "residential", desc: "Routine cleaning to keep your Canadian home fresh week after week.", duration: "2 - 3 Hours", icon: "home" },
    { id: "deep", name: "Deep Cleaning", category: "deep", desc: "Thorough restorative deep scrub targeting hidden dirt, grime, and grout.", duration: "4 - 6 Hours", icon: "sparkles" },
    { id: "move-in", name: "Move-In Cleaning", category: "move", desc: "Prepare your new residence for a fresh start with 100% sanitized rooms.", duration: "4 - 5 Hours", icon: "box" },
    { id: "move-out", name: "Move-Out Cleaning", category: "move", desc: "Inspection-ready cleaning to ensure full security deposit returns.", duration: "4 - 6 Hours", icon: "key" }
  ],
  faqs: [
    { q: "How much does home cleaning cost with Shine Forever window cleaning?", a: "Our cleaning packages start at $120. Total cost depends on square footage. Use our instant quote generator!" },
    { q: "Are your cleaning staff licensed and insured?", a: "Yes, 100%! Every technician at Shine Forever window cleaning undergoes background checks and training." }
  ]
};

Object.freeze(SITE_CONFIG);
