"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { HiEnvelope, HiLockClosed } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    });
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-melanin-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center">
              <span className="text-deep-900 font-display font-bold text-xl">M</span>
            </div>
          </Link>
          <h1 className="font-display text-3xl font-bold text-cream-50 mt-4">
            Welcome Back
          </h1>
          <p className="text-melanin-300 mt-2">
            Sign in to manage your bookings and rewards
          </p>
        </div>

        {/* Form */}
        <div className="card-luxury p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-cream-100 text-sm font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <HiEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-melanin-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="input-luxury pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-cream-100 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-melanin-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-luxury pl-10"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-melanin-300">
                <input type="checkbox" className="rounded border-gold-700/30" />
                <span>Remember me</span>
              </label>
              <Link href="/auth/forgot-password" className="text-gold-400 hover:text-gold-300">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
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
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-gold-400 hover:text-gold-300 font-medium">
              Join Us
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
