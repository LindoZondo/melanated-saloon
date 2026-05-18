"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FaStar } from "react-icons/fa";
import { HiCalendar } from "react-icons/hi2";

const stylists = [
  {
    id: "1",
    name: "Amara Johnson",
    title: "Master Braider & Loc Specialist",
    bio: "With 12 years of experience, Amara is known for her intricate braiding patterns and loc artistry. She specializes in protective styles that promote healthy hair growth.",
    specialties: ["Box Braids", "Goddess Locs", "Fulani Braids", "Loc Maintenance"],
    rating: 4.9,
    reviews: 127,
    experience: 12,
  },
  {
    id: "2",
    name: "Zuri Williams",
    title: "Color & Transformation Artist",
    bio: "Zuri brings vibrant color to life on melanin-rich hair. Her expertise in color theory ensures stunning results that complement every skin tone beautifully.",
    specialties: ["Balayage", "Full Color", "Highlights", "Color Correction"],
    rating: 4.8,
    reviews: 98,
    experience: 8,
  },
  {
    id: "3",
    name: "Kai Mitchell",
    title: "Natural Hair Expert",
    bio: "Kai is passionate about natural hair care and helping clients embrace their texture. From wash-and-go perfection to twist outs, Kai makes natural hair shine.",
    specialties: ["Twist Outs", "Wash & Go", "Natural Styling", "Hair Health"],
    rating: 5.0,
    reviews: 156,
    experience: 10,
  },
  {
    id: "4",
    name: "Nia Thompson",
    title: "Precision Cuts & Styling",
    bio: "Nia's precision cutting technique and eye for detail make her the go-to for flawless fades, pixie cuts, and silk presses that last.",
    specialties: ["Precision Fades", "Silk Press", "Pixie Cuts", "Event Styling"],
    rating: 4.9,
    reviews: 112,
    experience: 7,
  },
  {
    id: "5",
    name: "Malik Davis",
    title: "Barber & Grooming Specialist",
    bio: "Malik combines classic barbering with modern techniques. His attention to detail and steady hand deliver the cleanest fades and lineups in the city.",
    specialties: ["Fades", "Lineups", "Beard Grooming", "Hair Design"],
    rating: 4.9,
    reviews: 89,
    experience: 9,
  },
];

export default function StylistsPage() {
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
            Our Team
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-3 text-cream-50">
            Meet Our <span className="text-gradient-gold">Artists</span>
          </h1>
          <p className="text-melanin-300 mt-4 max-w-xl mx-auto">
            Our certified professionals specialize in melanin-rich hair textures
            and bring passion and expertise to every appointment.
          </p>
        </motion.div>

        <div className="space-y-6">
          {stylists.map((stylist, index) => (
            <motion.div
              key={stylist.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-luxury p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar */}
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-melanin-500 to-melanin-700 flex-shrink-0 mx-auto md:mx-0" />

                {/* Info */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="font-display text-2xl text-cream-50">{stylist.name}</h2>
                  <p className="text-gold-400 text-sm font-medium">{stylist.title}</p>

                  <div className="flex items-center justify-center md:justify-start space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <FaStar className="text-gold-400 text-sm" />
                      <span className="text-cream-100 text-sm">{stylist.rating}</span>
                      <span className="text-melanin-400 text-sm">({stylist.reviews} reviews)</span>
                    </div>
                    <span className="text-melanin-400 text-sm">
                      {stylist.experience} years exp.
                    </span>
                  </div>

                  <p className="text-melanin-300 text-sm mt-3 leading-relaxed">
                    {stylist.bio}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                    {stylist.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="px-3 py-1 bg-gold-500/10 text-gold-400 text-xs rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/booking?stylist=${stylist.id}`}
                    className="inline-flex items-center space-x-2 btn-gold text-sm mt-4 px-5 py-2.5"
                  >
                    <HiCalendar />
                    <span>Book with {stylist.name.split(" ")[0]}</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
