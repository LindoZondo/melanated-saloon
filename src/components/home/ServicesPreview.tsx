"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GiComb, GiHairStrands, GiSparkles } from "react-icons/gi";
import { TbColorSwatch } from "react-icons/tb";
import { PiScissors } from "react-icons/pi";
import { MdSpa } from "react-icons/md";

const services = [
  {
    icon: GiHairStrands,
    title: "Braids & Locs",
    description: "Intricate braiding styles, loc maintenance, and protective styling for all textures.",
    price: "From R850",
  },
  {
    icon: PiScissors,
    title: "Cuts & Styling",
    description: "Precision cuts, silk presses, and custom styling that celebrates your natural beauty.",
    price: "From R550",
  },
  {
    icon: TbColorSwatch,
    title: "Color & Highlights",
    description: "Vibrant color transformations with products formulated for melanin-rich hair.",
    price: "From R1,200",
  },
  {
    icon: GiComb,
    title: "Natural Hair Care",
    description: "Deep conditioning, twist-outs, wash-and-go perfection for your crown.",
    price: "From R650",
  },
  {
    icon: MdSpa,
    title: "Scalp Treatments",
    description: "Rejuvenating scalp therapies to promote healthy growth and relaxation.",
    price: "From R450",
  },
  {
    icon: GiSparkles,
    title: "Special Occasions",
    description: "Bridal, prom, and event styling that makes you the center of attention.",
    price: "From R1,500",
  },
];

export function ServicesPreview() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold-400 font-accent text-lg tracking-widest uppercase">
            Our Services
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-cream-50">
            Crafted for Your <span className="text-gradient-gold">Crown</span>
          </h2>
          <p className="text-melanin-300 mt-4 max-w-xl mx-auto">
            Every service is designed with melanin-rich hair and skin in mind.
            Premium products, expert techniques, and pure luxury.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-luxury p-6 group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-gold-500/10 flex items-center justify-center mb-4 group-hover:bg-gold-500/20 transition-colors">
                <service.icon className="text-gold-400 text-2xl" />
              </div>
              <h3 className="font-display text-xl font-semibold text-cream-50 mb-2">
                {service.title}
              </h3>
              <p className="text-melanin-300 text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-gold-400 font-semibold">{service.price}</span>
                <span className="text-melanin-400 text-sm group-hover:text-gold-400 transition-colors">
                  Learn more →
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/services" className="btn-outline-gold">
            View All Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
