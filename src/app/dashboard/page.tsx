"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import {
  HiCalendar,
  HiGift,
  HiStar,
  HiClock,
  HiSparkles,
  HiTicket,
  HiUserGroup,
} from "react-icons/hi2";

const upcomingBookings = [
  {
    id: "1",
    service: "Box Braids",
    stylist: "Amara Johnson",
    date: "Jan 28, 2024",
    time: "10:00 AM",
    status: "Confirmed",
  },
];

const recentActivity = [
  { text: "Earned 10 loyalty points", date: "Jan 15", type: "loyalty" },
  { text: "Booking completed - Silk Press", date: "Jan 10", type: "booking" },
  { text: "Referral bonus: +50 points", date: "Jan 5", type: "referral" },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold text-cream-50">
            Welcome back, <span className="text-gradient-gold">Queen</span> 👑
          </h1>
          <p className="text-melanin-300 mt-2">
            Manage your bookings, track rewards, and discover new styles.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: HiStar, label: "Loyalty Points", value: "285", color: "text-gold-400" },
            { icon: HiCalendar, label: "Total Visits", value: "12", color: "text-green-400" },
            { icon: HiGift, label: "Rewards Available", value: "2", color: "text-purple-400" },
            { icon: HiUserGroup, label: "Referrals", value: "3", color: "text-blue-400" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-luxury p-5"
            >
              <stat.icon className={`${stat.color} text-2xl mb-2`} />
              <p className="text-2xl font-bold text-cream-50">{stat.value}</p>
              <p className="text-melanin-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Bookings */}
          <div className="lg:col-span-2">
            <div className="card-luxury p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl text-cream-50 flex items-center">
                  <HiClock className="mr-2 text-gold-400" />
                  Upcoming Bookings
                </h2>
                <Link href="/booking" className="text-gold-400 text-sm hover:text-gold-300">
                  + New Booking
                </Link>
              </div>
              {upcomingBookings.length > 0 ? (
                <div className="space-y-3">
                  {upcomingBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 bg-melanin-800/30 rounded-xl border border-gold-700/10"
                    >
                      <div>
                        <p className="text-cream-50 font-medium">{booking.service}</p>
                        <p className="text-melanin-400 text-sm">
                          with {booking.stylist}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-cream-100 text-sm">{booking.date}</p>
                        <p className="text-gold-400 text-sm">{booking.time}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs rounded-full">
                        {booking.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-melanin-400 text-center py-8">
                  No upcoming bookings.{" "}
                  <Link href="/booking" className="text-gold-400">
                    Book now
                  </Link>
                </p>
              )}
            </div>

            {/* AI Recommendations */}
            <div className="card-luxury p-6 mt-6">
              <h2 className="font-display text-xl text-cream-50 flex items-center mb-4">
                <HiSparkles className="mr-2 text-gold-400" />
                Style Recommendations
              </h2>
              <p className="text-melanin-300 text-sm mb-4">
                Based on your hair type and previous styles, we recommend:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {["Goddess Locs", "Honey Highlights", "Twist Out Updo"].map((style) => (
                  <div
                    key={style}
                    className="p-4 bg-melanin-800/30 rounded-xl border border-gold-700/10 text-center"
                  >
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-gold-500/20 to-melanin-600 mb-2" />
                    <p className="text-cream-100 text-sm font-medium">{style}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/gallery"
                className="inline-block mt-4 text-gold-400 text-sm hover:text-gold-300"
              >
                Explore more styles →
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Loyalty Progress */}
            <div className="card-luxury p-6">
              <h3 className="font-display text-lg text-cream-50 flex items-center mb-4">
                <HiTicket className="mr-2 text-gold-400" />
                Loyalty Rewards
              </h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-melanin-300">Progress to next reward</span>
                  <span className="text-gold-400">285/300</span>
                </div>
                <div className="w-full h-2 bg-melanin-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full"
                    style={{ width: "95%" }}
                  />
                </div>
              </div>
              <p className="text-melanin-400 text-xs">
                15 more points until your next R100 discount!
              </p>
            </div>

            {/* Referral */}
            <div className="card-luxury p-6">
              <h3 className="font-display text-lg text-cream-50 flex items-center mb-4">
                <HiGift className="mr-2 text-gold-400" />
                Refer a Friend
              </h3>
              <p className="text-melanin-300 text-sm mb-3">
                Share your code and earn 50 points when they book!
              </p>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value="QUEEN-A7X2"
                  readOnly
                  className="input-luxury text-center text-gold-400 font-mono"
                />
                <button className="btn-gold text-sm px-4 py-3">Copy</button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card-luxury p-6">
              <h3 className="font-display text-lg text-cream-50 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                {recentActivity.map((activity, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-gold-400 mt-2" />
                    <div>
                      <p className="text-cream-100 text-sm">{activity.text}</p>
                      <p className="text-melanin-400 text-xs">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
