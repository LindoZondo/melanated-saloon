"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiCalendar,
  HiCurrencyDollar,
  HiUsers,
  HiChartBar,
  HiCog,
  HiGift,
  HiTicket,
  HiSparkles,
  HiClipboardDocument,
} from "react-icons/hi2";

type Tab = "overview" | "bookings" | "clients" | "loyalty" | "promos" | "settings";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const tabs = [
    { id: "overview" as Tab, label: "Overview", icon: HiChartBar },
    { id: "bookings" as Tab, label: "Bookings", icon: HiCalendar },
    { id: "clients" as Tab, label: "Clients", icon: HiUsers },
    { id: "loyalty" as Tab, label: "Loyalty", icon: HiGift },
    { id: "promos" as Tab, label: "Promos", icon: HiTicket },
    { id: "settings" as Tab, label: "Settings", icon: HiCog },
  ];

  return (
    <main className="min-h-screen bg-deep-950">
      {/* Admin Header */}
      <header className="glass-panel border-b border-gold-700/10 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
              <span className="text-deep-900 font-display font-bold">M</span>
            </div>
            <div>
              <h1 className="font-display text-xl text-cream-50">Admin Dashboard</h1>
              <p className="text-melanin-400 text-xs">MELANATED SALOON</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-melanin-300 text-sm">Admin</span>
            <div className="w-8 h-8 rounded-full bg-melanin-700" />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex overflow-x-auto space-x-2 mb-8 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-gold-500 text-deep-900"
                  : "text-melanin-300 hover:text-cream-50 hover:bg-melanin-800/50"
              }`}
            >
              <tab.icon className="text-lg" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Revenue (Month)", value: "R124,500", change: "+12%", icon: HiCurrencyDollar },
                { label: "Bookings (Month)", value: "156", change: "+8%", icon: HiCalendar },
                { label: "Active Clients", value: "342", change: "+15%", icon: HiUsers },
                { label: "Avg Rating", value: "4.9", change: "+0.1", icon: HiSparkles },
              ].map((stat) => (
                <div key={stat.label} className="card-luxury p-5">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="text-gold-400 text-xl" />
                    <span className="text-green-400 text-xs font-medium">{stat.change}</span>
                  </div>
                  <p className="text-2xl font-bold text-cream-50">{stat.value}</p>
                  <p className="text-melanin-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Bookings */}
            <div className="card-luxury p-6">
              <h3 className="font-display text-lg text-cream-50 mb-4 flex items-center">
                <HiClipboardDocument className="mr-2 text-gold-400" />
                Recent Bookings
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gold-700/20">
                      <th className="text-left py-3 text-melanin-400 font-medium">Client</th>
                      <th className="text-left py-3 text-melanin-400 font-medium">Service</th>
                      <th className="text-left py-3 text-melanin-400 font-medium">Stylist</th>
                      <th className="text-left py-3 text-melanin-400 font-medium">Date</th>
                      <th className="text-left py-3 text-melanin-400 font-medium">Status</th>
                      <th className="text-right py-3 text-melanin-400 font-medium">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { client: "Jasmine R.", service: "Box Braids", stylist: "Amara", date: "Jan 28", status: "Confirmed", amount: "R1,500" },
                      { client: "Tasha M.", service: "Silk Press", stylist: "Nia", date: "Jan 28", status: "Completed", amount: "R850" },
                      { client: "DeAndre W.", service: "Precision Fade", stylist: "Kai", date: "Jan 27", status: "Completed", amount: "R550" },
                      { client: "Keisha L.", service: "Color Treatment", stylist: "Zuri", date: "Jan 27", status: "Pending", amount: "R1,800" },
                    ].map((booking, i) => (
                      <tr key={i} className="border-b border-gold-700/10">
                        <td className="py-3 text-cream-100">{booking.client}</td>
                        <td className="py-3 text-melanin-200">{booking.service}</td>
                        <td className="py-3 text-melanin-200">{booking.stylist}</td>
                        <td className="py-3 text-melanin-300">{booking.date}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            booking.status === "Confirmed" ? "bg-blue-500/10 text-blue-400" :
                            booking.status === "Completed" ? "bg-green-500/10 text-green-400" :
                            "bg-yellow-500/10 text-yellow-400"
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-3 text-right text-gold-400 font-medium">{booking.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Loyalty Tab */}
        {activeTab === "loyalty" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="card-luxury p-6">
              <h3 className="font-display text-xl text-cream-50 mb-6">
                Loyalty Program Configuration
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-cream-100 text-sm font-medium mb-2">
                    Points Per Visit
                  </label>
                  <input type="number" defaultValue={10} className="input-luxury" />
                </div>
                <div>
                  <label className="block text-cream-100 text-sm font-medium mb-2">
                    Points Per Dollar Spent
                  </label>
                  <input type="number" defaultValue={1} className="input-luxury" />
                </div>
                <div>
                  <label className="block text-cream-100 text-sm font-medium mb-2">
                    Redemption Threshold (Points)
                  </label>
                  <input type="number" defaultValue={100} className="input-luxury" />
                </div>
                <div>
                  <label className="block text-cream-100 text-sm font-medium mb-2">
                    Discount Per Redemption ($)
                  </label>
                  <input type="number" defaultValue={10} className="input-luxury" />
                </div>
                <div>
                  <label className="block text-cream-100 text-sm font-medium mb-2">
                    Referral Bonus (Points)
                  </label>
                  <input type="number" defaultValue={50} className="input-luxury" />
                </div>
                <div>
                  <label className="block text-cream-100 text-sm font-medium mb-2">
                    Welcome Bonus (Points)
                  </label>
                  <input type="number" defaultValue={25} className="input-luxury" />
                </div>
              </div>
              <button className="btn-gold mt-6">Save Configuration</button>
            </div>
          </motion.div>
        )}

        {/* Promos Tab */}
        {activeTab === "promos" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl text-cream-50">Promo Codes</h3>
              <button className="btn-gold text-sm">+ Create Promo</button>
            </div>
            <div className="card-luxury p-6">
              <div className="space-y-4">
                {[
                  { code: "NEWQUEEN25", type: "Percentage", value: "25%", uses: "45/100", status: "Active" },
                  { code: "SUMMER15", type: "Fixed", value: "$15", uses: "89/200", status: "Active" },
                  { code: "LOYALTY50", type: "Percentage", value: "50%", uses: "12/20", status: "Active" },
                ].map((promo) => (
                  <div key={promo.code} className="flex items-center justify-between p-4 bg-melanin-800/30 rounded-xl border border-gold-700/10">
                    <div>
                      <p className="text-cream-50 font-mono font-semibold">{promo.code}</p>
                      <p className="text-melanin-400 text-sm">{promo.type}: {promo.value} off</p>
                    </div>
                    <div className="text-right">
                      <p className="text-melanin-300 text-sm">Uses: {promo.uses}</p>
                      <span className="text-green-400 text-xs">{promo.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Placeholder for other tabs */}
        {(activeTab === "bookings" || activeTab === "clients" || activeTab === "settings") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card-luxury p-12 text-center"
          >
            <HiCog className="text-gold-400 text-4xl mx-auto mb-4" />
            <h3 className="font-display text-xl text-cream-50 mb-2">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
            </h3>
            <p className="text-melanin-400">
              Full {activeTab} management interface with search, filters, and bulk actions.
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
