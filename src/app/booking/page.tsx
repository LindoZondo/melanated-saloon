"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HiCalendar, HiClock, HiUser, HiSparkles } from "react-icons/hi2";

const steps = ["Service", "Stylist", "Date & Time", "Confirm"];

const services = [
  { id: "1", name: "Box Braids", duration: 180, price: 1500, category: "Braids" },
  { id: "2", name: "Silk Press", duration: 90, price: 850, category: "Styling" },
  { id: "3", name: "Loc Retwist", duration: 120, price: 950, category: "Locs" },
  { id: "4", name: "Natural Twist Out", duration: 60, price: 650, category: "Natural" },
  { id: "5", name: "Precision Fade", duration: 45, price: 550, category: "Cuts" },
  { id: "6", name: "Color Treatment", duration: 150, price: 1800, category: "Color" },
];

const stylists = [
  { id: "1", name: "Amara Johnson", specialty: "Braids & Locs", rating: 4.9 },
  { id: "2", name: "Zuri Williams", specialty: "Color Artist", rating: 4.8 },
  { id: "3", name: "Kai Mitchell", specialty: "Natural Hair", rating: 5.0 },
  { id: "4", name: "Nia Thompson", specialty: "Cuts & Styling", rating: 4.9 },
];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM",
];

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedStylist, setSelectedStylist] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState("");

  const service = services.find((s) => s.id === selectedService);
  const stylist = stylists.find((s) => s.id === selectedStylist);

  const canProceed = () => {
    switch (currentStep) {
      case 0: return !!selectedService;
      case 1: return !!selectedStylist;
      case 2: return !!selectedDate && !!selectedTime;
      default: return true;
    }
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-cream-50">
            Book Your <span className="text-gradient-gold">Experience</span>
          </h1>
          <p className="text-melanin-300 mt-3">
            Select your service, choose your stylist, and pick your perfect time.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  index <= currentStep
                    ? "bg-gold-500 text-deep-900"
                    : "bg-melanin-800 text-melanin-400"
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`hidden sm:block ml-2 text-sm ${
                  index <= currentStep ? "text-gold-400" : "text-melanin-400"
                }`}
              >
                {step}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`w-8 sm:w-16 h-0.5 mx-2 ${
                    index < currentStep ? "bg-gold-500" : "bg-melanin-700"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {currentStep === 0 && (
            <motion.div
              key="service"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {services.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedService(s.id)}
                  className={`card-luxury p-5 text-left transition-all ${
                    selectedService === s.id
                      ? "border-gold-500 shadow-gold"
                      : ""
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-cream-50 font-semibold">{s.name}</h3>
                      <p className="text-melanin-400 text-sm mt-1">
                        {s.category} • {s.duration} min
                      </p>
                    </div>
                    <span className="text-gold-400 font-bold">R{s.price}</span>
                  </div>
                </button>
              ))}
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="stylist"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {stylists.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedStylist(s.id)}
                  className={`card-luxury p-5 text-left transition-all ${
                    selectedStylist === s.id
                      ? "border-gold-500 shadow-gold"
                      : ""
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-melanin-500 to-melanin-700 flex items-center justify-center">
                      <HiUser className="text-gold-400 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-cream-50 font-semibold">{s.name}</h3>
                      <p className="text-melanin-400 text-sm">{s.specialty}</p>
                      <p className="text-gold-400 text-sm">★ {s.rating}</p>
                    </div>
                  </div>
                </button>
              ))}
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="datetime"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-cream-100 font-medium mb-2">
                  <HiCalendar className="inline mr-2 text-gold-400" />
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="input-luxury"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div>
                <label className="block text-cream-100 font-medium mb-2">
                  <HiClock className="inline mr-2 text-gold-400" />
                  Select Time
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        selectedTime === time
                          ? "bg-gold-500 text-deep-900"
                          : "bg-melanin-800/50 text-melanin-200 hover:bg-melanin-700/50 border border-gold-700/20"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="card-luxury p-8"
            >
              <h3 className="font-display text-2xl text-cream-50 mb-6">
                Booking Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gold-700/20">
                  <span className="text-melanin-300">Service</span>
                  <span className="text-cream-50 font-medium">{service?.name}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gold-700/20">
                  <span className="text-melanin-300">Stylist</span>
                  <span className="text-cream-50 font-medium">{stylist?.name}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gold-700/20">
                  <span className="text-melanin-300">Date</span>
                  <span className="text-cream-50 font-medium">{selectedDate}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gold-700/20">
                  <span className="text-melanin-300">Time</span>
                  <span className="text-cream-50 font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gold-700/20">
                  <span className="text-melanin-300">Duration</span>
                  <span className="text-cream-50 font-medium">{service?.duration} min</span>
                </div>

                {/* Promo Code */}
                <div className="pt-4">
                  <label className="block text-melanin-300 text-sm mb-2">
                    <HiSparkles className="inline mr-1 text-gold-400" />
                    Promo or Referral Code
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="input-luxury flex-1"
                    />
                    <button className="btn-outline-gold text-sm px-4 py-2">
                      Apply
                    </button>
                  </div>
                </div>

                <div className="flex justify-between py-4 border-t border-gold-500/30 mt-4">
                  <span className="text-cream-50 font-semibold text-lg">Total</span>
                  <span className="text-gold-400 font-bold text-2xl">
                    R{service?.price}
                  </span>
                </div>
              </div>

              <button className="btn-gold w-full mt-6 text-lg py-4">
                Confirm & Pay
              </button>
              <p className="text-melanin-400 text-xs text-center mt-3">
                You&apos;ll receive a confirmation email and SMS reminder 24 hours before your appointment.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            className={`btn-outline-gold ${currentStep === 0 ? "opacity-0 pointer-events-none" : ""}`}
          >
            Back
          </button>
          {currentStep < 3 && (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceed()}
              className="btn-gold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
