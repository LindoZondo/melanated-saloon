"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

const stylists = [
  {
    name: "Amara Johnson",
    specialty: "Braids & Locs Specialist",
    rating: 4.9,
    reviews: 127,
    image: "/images/stylists/stylist-1.jpg",
  },
  {
    name: "Zuri Williams",
    specialty: "Color & Transformation Artist",
    rating: 4.8,
    reviews: 98,
    image: "/images/stylists/stylist-2.jpg",
  },
  {
    name: "Kai Mitchell",
    specialty: "Natural Hair Expert",
    rating: 5.0,
    reviews: 156,
    image: "/images/stylists/stylist-3.jpg",
  },
  {
    name: "Nia Thompson",
    specialty: "Precision Cuts & Styling",
    rating: 4.9,
    reviews: 112,
    image: "/images/stylists/stylist-4.jpg",
  },
];

export function StylistsPreview() {
  return (
    <section className="py-24 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold-400 font-accent text-lg tracking-widest uppercase">
            Meet Our Artists
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-cream-50">
            Expert <span className="text-gradient-gold">Stylists</span>
          </h2>
          <p className="text-melanin-300 mt-4 max-w-xl mx-auto">
            Our team of certified professionals specialize in melanin-rich hair
            textures and bring years of expertise to every appointment.
          </p>
        </motion.div>

        {/* Stylists Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stylists.map((stylist, index) => (
            <motion.div
              key={stylist.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-luxury overflow-hidden group"
            >
              {/* Image Placeholder */}
              <div className="h-64 bg-gradient-to-br from-melanin-600 to-melanin-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gold-500/5 group-hover:bg-gold-500/10 transition-colors" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-1">
                    <FaStar className="text-gold-400 text-sm" />
                    <span className="text-gold-400 text-sm font-semibold">
                      {stylist.rating}
                    </span>
                    <span className="text-melanin-300 text-xs">
                      ({stylist.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
              {/* Info */}
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-cream-50">
                  {stylist.name}
                </h3>
                <p className="text-melanin-300 text-sm mt-1">
                  {stylist.specialty}
                </p>
                <Link
                  href={`/booking?stylist=${stylist.name}`}
                  className="inline-block mt-3 text-gold-400 text-sm font-medium hover:text-gold-300 transition-colors"
                >
                  Book with {stylist.name.split(" ")[0]} →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/stylists" className="btn-outline-gold">
            Meet All Stylists
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
