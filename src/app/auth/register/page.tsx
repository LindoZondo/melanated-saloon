"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiEnvelope, HiLockClosed, HiUser, HiPhone, HiGift } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          callbackUrl: "/dashboard",
        });
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-melanin-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center">
              <span className="text-deep-900 font-display font-bold text-xl">M</span>
            </div>
          </Link>
          <h1 className="font-display text-3xl font-bold text-cream-50 mt-4">
            Join the Family
          </h1>
          <p className="text-melanin-300 mt-2">
            Create your account and get 25 bonus loyalty points 🎁
          </p>
        </div>

        <div className="card-luxury p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-cream-100 text-sm font-medium mb-2">Full Name</label>
              <div className="relative">
                <HiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-melanin-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="input-luxury pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-cream-100 text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <HiEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-melanin-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="input-luxury pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-cream-100 text-sm font-medium mb-2">Phone</label>
              <div className="relative">
                <HiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-melanin-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(404) 555-0123"
                  className="input-luxury pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-cream-100 text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-melanin-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input-luxury pl-10"
                  required
                  minLength={8}
                />
              </div>
            </div>

            <div>
              <label className="block text-cream-100 text-sm font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-melanin-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input-luxury pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-cream-100 text-sm font-medium mb-2">
                <HiGift className="inline mr-1 text-gold-400" />
                Referral Code (Optional)
              </label>
              <input
                type="text"
                name="referralCode"
                value={formData.referralCode}
                onChange={handleChange}
                placeholder="Friend's referral code"
                className="input-luxury"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full mt-2 disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="section-divider" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-melanin-800 px-3 text-melanin-400 text-sm">
              or
            </span>
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center space-x-3 bg-melanin-800/50 border border-gold-700/20 rounded-full py-3 hover:bg-melanin-700/50 transition-colors"
          >
            <FcGoogle size={20} />
            <span className="text-cream-100">Continue with Google</span>
          </button>

          <p className="text-center text-melanin-300 text-sm mt-6">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-gold-400 hover:text-gold-300 font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
