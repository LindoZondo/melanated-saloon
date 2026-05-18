"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const serviceCategories = [
  {
    name: "Braids & Locs",
    description: "Protective styles that celebrate our heritage",
    services: [
      { name: "Box Braids (Small)", duration: "4-5 hrs", price: "R1,800" },
      { name: "Box Braids (Medium)", duration: "3-4 hrs", price: "R1,500" },
      { name: "Knotless Braids", duration: "4-6 hrs", price: "R2,000" },
      { name: "Goddess Locs", duration: "3-4 hrs", price: "R1,600" },
      { name: "Faux Locs", duration: "4-5 hrs", price: "R1,750" },
      { name: "Loc Retwist", duration: "1.5-2 hrs", price: "R950" },
      { name: "Loc Styling", duration: "1-2 hrs", price: "R750" },
      { name: "Fulani Braids", duration: "3-4 hrs", price: "R1,650" },
    ],
  },
  {
    name: "Cuts & Styling",
    description: "Precision cuts and styling for every occasion",
    services: [
      { name: "Precision Fade", duration: "45 min", price: "R550" },
      { name: "Silk Press", duration: "1.5 hrs", price: "R850" },
      { name: "Roller Set", duration: "1.5 hrs", price: "R700" },
      { name: "Blowout & Style", duration: "1 hr", price: "R650" },
      { name: "Trim & Shape", duration: "30 min", price: "R350" },
      { name: "Pixie Cut", duration: "1 hr", price: "R750" },
    ],
  },
  {
    name: "Color & Highlights",
    description: "Vibrant transformations for melanin-rich hair",
    services: [
      { name: "Full Color", duration: "2-3 hrs", price: "R1,500" },
      { name: "Highlights", duration: "2-3 hrs", price: "R1,300" },
      { name: "Balayage", duration: "3-4 hrs", price: "R2,000" },
      { name: "Color Correction", duration: "3-5 hrs", price: "R2,500+" },
      { name: "Root Touch-Up", duration: "1.5 hrs", price: "R800" },
    ],
  },
  {
    name: "Natural Hair Care",
    description: "Nurturing your natural crown",
    services: [
      { name: "Wash & Deep Condition", duration: "1 hr", price: "R550" },
      { name: "Twist Out", duration: "1.5 hrs", price: "R650" },
      { name: "Wash & Go", duration: "1 hr", price: "R600" },
      { name: "Protein Treatment", duration: "1.5 hrs", price: "R750" },
      { name: "Detangle & Moisturize", duration: "1 hr", price: "R500" },
    ],
  },
  {
    name: "Scalp Treatments",
    description: "Healthy scalp, healthy growth",
    services: [
      { name: "Scalp Detox", duration: "45 min", price: "R450" },
      { name: "Hot Oil Treatment", duration: "30 min", price: "R400" },
      { name: "Growth Stimulation", duration: "1 hr", price: "R650" },
      { name: "Scalp Massage", duration: "30 min", price: "R350" },
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-gold-400 font-accent text-lg tracking-widest uppercase">
            Our Services
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-3 text-cream-50">
            Services & <span className="text-gradient-gold">Pricing</span>
          </h1>
          <p className="text-melanin-300 mt-4 max-w-xl mx-auto">
            Premium services crafted specifically for melanin-rich hair and beauty.
            All prices are starting rates and may vary based on length and complexity.
          </p>
        </motion.div>

        <div className="space-y-12">
          {serviceCategories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
            >
              <div className="mb-4">
                <h2 className="font-display text-2xl text-cream-50">{category.name}</h2>
                <p className="text-melanin-400 text-sm">{category.description}</p>
              </div>
              <div className="card-luxury divide-y divide-gold-700/10">
                {category.services.map((service) => (
                  <div
                    key={service.name}
                    className="flex items-center justify-between p-4 hover:bg-melanin-800/20 transition-colors"
                  >
                    <div>
                      <p className="text-cream-100 font-medium">{service.name}</p>
                      <p className="text-melanin-400 text-sm">{service.duration}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-gold-400 font-semibold">{service.price}</span>
                      <Link
                        href="/booking"
                        className="text-xs btn-outline-gold px-3 py-1.5"
                      >
                        Book
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
