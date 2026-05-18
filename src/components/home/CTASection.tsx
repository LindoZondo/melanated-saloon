"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-luxury p-12 md:p-16 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gold-500/5 rounded-full blur-2xl" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-gold-500/5 rounded-full blur-2xl" />

          <span className="text-gold-400 font-accent text-lg tracking-widest uppercase">
            Ready to Glow?
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-4 text-cream-50">
            Your Crown Deserves
            <br />
            <span className="text-gradient-gold">Royal Treatment</span>
          </h2>
          <p className="text-melanin-300 mt-4 max-w-lg mx-auto">
            Join our community of melanated queens and kings. Get exclusive
            discounts, earn loyalty points, and receive AI-powered style
            recommendations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link href="/booking" className="btn-gold text-lg px-8 py-4">
              Book Now
            </Link>
            <Link href="/auth/register" className="btn-outline-gold text-lg px-8 py-4">
              Create Account
            </Link>
          </div>
          <p className="text-melanin-400 text-sm mt-6">
            🎁 New members get 25 bonus loyalty points on signup
          </p>
        </motion.div>
      </div>
    </section>
  );
}
