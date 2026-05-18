"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HiFunnel } from "react-icons/hi2";

const categories = ["All", "Braids", "Locs", "Natural", "Color", "Cuts", "Protective", "Updos"];

const galleryItems = [
  { id: "1", title: "Knotless Box Braids", category: "Braids", featured: true },
  { id: "2", title: "Honey Blonde Locs", category: "Locs", featured: false },
  { id: "3", title: "Defined Twist Out", category: "Natural", featured: true },
  { id: "4", title: "Burgundy Highlights", category: "Color", featured: false },
  { id: "5", title: "Tapered Fade", category: "Cuts", featured: false },
  { id: "6", title: "Goddess Locs", category: "Locs", featured: true },
  { id: "7", title: "Bantu Knot Out", category: "Protective", featured: false },
  { id: "8", title: "Silk Press Waves", category: "Natural", featured: false },
  { id: "9", title: "Fulani Braids", category: "Braids", featured: true },
  { id: "10", title: "Loc Updo Crown", category: "Updos", featured: false },
  { id: "11", title: "Copper Balayage", category: "Color", featured: false },
  { id: "12", title: "Passion Twists", category: "Protective", featured: true },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = galleryItems.filter((item) => {
    if (activeCategory !== "All" && item.category !== activeCategory) return false;
    return true;
  });

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-gold-400 font-accent text-lg tracking-widest uppercase">
            Style Inspiration
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-3 text-cream-50">
            <span className="text-gradient-gold">Style Gallery</span>
          </h1>
          <p className="text-melanin-300 mt-4 max-w-xl mx-auto">
            Explore stunning hairstyle inspirations curated by our
            expert stylists. Find your next signature look.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-gold-500 text-deep-900"
                    : "bg-melanin-800/50 text-melanin-300 hover:text-cream-50 border border-gold-700/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer"
            >
              {/* Gradient placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-melanin-500 via-melanin-700 to-melanin-900" />
              <div className="absolute inset-0 bg-gold-500/5 group-hover:bg-gold-500/15 transition-all duration-300" />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1">
                {item.featured && (
                  <span className="bg-purple-500/20 backdrop-blur-sm text-purple-300 text-xs px-2 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-deep-950/90 via-deep-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-melanin-300 text-xs bg-melanin-800/50 px-2 py-1 rounded-full w-fit">
                  {item.category}
                </span>
                <h3 className="text-cream-50 font-semibold mt-2">{item.title}</h3>
                <button className="mt-2 text-gold-400 text-sm font-medium">
                  Book this style →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Style Recommendations CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-luxury p-8 mt-12 text-center"
        >
          <h3 className="font-display text-2xl text-cream-50 mb-2">
            Get Personalised Style Recommendations
          </h3>
          <p className="text-melanin-300 max-w-md mx-auto mb-6">
            Tell us about your hair type, face shape, and preferences, and our
            stylists will suggest the perfect look just for you.
          </p>
          <button className="btn-gold">
            Get My Recommendations
          </button>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
