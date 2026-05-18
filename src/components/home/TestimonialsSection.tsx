"use client";

import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Jasmine R.",
    text: "MELANATED SALOON changed my hair game completely. The stylists truly understand our hair texture and the AI recommendations helped me find my perfect style.",
    rating: 5,
    service: "Box Braids",
  },
  {
    name: "Tasha M.",
    text: "The loyalty program is amazing! I've saved so much on my regular appointments. Plus the online booking makes everything so convenient.",
    rating: 5,
    service: "Natural Hair Care",
  },
  {
    name: "DeAndre W.",
    text: "Finally a salon that gets it. The precision fade I got here was the best I've ever had. The whole experience feels premium from start to finish.",
    rating: 5,
    service: "Precision Cut",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold-400 font-accent text-lg tracking-widest uppercase">
            Client Love
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-cream-50">
            What Our <span className="text-gradient-gold">Community</span> Says
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="card-luxury p-6"
            >
              <div className="flex items-center space-x-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <FaStar key={i} className="text-gold-400 text-sm" />
                ))}
              </div>
              <p className="text-melanin-200 text-sm leading-relaxed mb-4 italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cream-50 font-semibold text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-melanin-400 text-xs">{testimonial.service}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
