"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const galleryItems = [
  { title: "Box Braids", category: "Braids" },
  { title: "Silk Press", category: "Styling" },
  { title: "Loc Updo", category: "Locs" },
  { title: "Twist Out", category: "Natural" },
  { title: "Honey Blonde", category: "Color" },
  { title: "Bantu Knots", category: "Protective" },
];

export function GalleryPreview() {
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
            Style Inspiration
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-cream-50">
            Style <span className="text-gradient-gold">Gallery</span>
          </h2>
          <p className="text-melanin-300 mt-4 max-w-xl mx-auto">
            Explore stunning hairstyle inspirations tailored for melanin-rich
            beauty. Find your next signature style.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
            >
              {/* Placeholder gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-melanin-600 via-melanin-700 to-melanin-800" />
              <div className="absolute inset-0 bg-gold-500/5 group-hover:bg-gold-500/15 transition-all duration-300" />

              {/* Overlay Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-deep-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center space-x-2">
                  <span className="text-melanin-300 text-xs bg-melanin-800/50 px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-cream-50 font-semibold mt-2">{item.title}</h3>
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
          <Link href="/gallery" className="btn-outline-gold">
            Explore Full Gallery
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
