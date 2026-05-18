"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { HiBars3, HiXMark } from "react-icons/hi2";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/stylists", label: "Stylists" },
  { href: "/gallery", label: "Gallery" },
  { href: "/booking", label: "Book Now" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-gold-700/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
              <span className="text-deep-900 font-display font-bold text-lg">
                M
              </span>
            </div>
            <span className="font-display text-xl md:text-2xl text-gradient-gold">
              MELANATED
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-cream-100 hover:text-gold-400 transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <Link
                href="/dashboard"
                className="btn-outline-gold text-sm px-4 py-2"
              >
                My Account
              </Link>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-cream-100 hover:text-gold-400 transition-colors"
                >
                  Sign In
                </Link>
                <Link href="/auth/register" className="btn-gold text-sm px-4 py-2">
                  Join Us
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-cream-100 hover:text-gold-400 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <HiXMark size={28} /> : <HiBars3 size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-t border-gold-700/10"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-cream-100 hover:text-gold-400 transition-colors py-2 text-lg"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gold-700/20 space-y-3">
                {session ? (
                  <Link
                    href="/dashboard"
                    className="block btn-outline-gold text-center"
                  >
                    My Account
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="block text-center text-cream-100 py-2"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/register"
                      className="block btn-gold text-center"
                    >
                      Join Us
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
