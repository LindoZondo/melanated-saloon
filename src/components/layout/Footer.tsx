import Link from "next/link";
import { FaInstagram, FaFacebookF, FaTiktok, FaYoutube } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-deep-950 border-t border-gold-700/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                <span className="text-deep-900 font-display font-bold text-lg">
                  M
                </span>
              </div>
              <span className="font-display text-xl text-gradient-gold">
                MELANATED
              </span>
            </div>
            <p className="text-melanin-300 text-sm leading-relaxed">
              Celebrating the beauty of melanin-rich skin and hair. Premium
              salon services crafted for queens and kings.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-melanin-300 hover:text-gold-400 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-melanin-300 hover:text-gold-400 transition-colors">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-melanin-300 hover:text-gold-400 transition-colors">
                <FaTiktok size={20} />
              </a>
              <a href="#" className="text-melanin-300 hover:text-gold-400 transition-colors">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-gold-400 text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Services", "Stylists", "Gallery", "Book Now", "Pricing"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-melanin-300 hover:text-gold-400 transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-gold-400 text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              {["FAQ", "Contact Us", "Privacy Policy", "Terms of Service", "Refund Policy"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                      className="text-melanin-300 hover:text-gold-400 transition-colors text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-gold-400 text-lg mb-4">Visit Us</h4>
            <div className="space-y-3 text-melanin-300 text-sm">
              <p>123 Beauty Boulevard</p>
              <p>Suite 200, Atlanta, GA 30301</p>
              <p className="pt-2">
                <span className="text-gold-400">Phone:</span> (404) 555-GLOW
              </p>
              <p>
                <span className="text-gold-400">Email:</span> hello@melanatedsaloon.com
              </p>
              <p className="pt-2">
                <span className="text-gold-400">Hours:</span>
                <br />
                Mon-Sat: 9AM - 8PM
                <br />
                Sun: 10AM - 6PM
              </p>
            </div>
          </div>
        </div>

        <div className="section-divider mt-12 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between text-melanin-400 text-sm">
          <p>&copy; 2024 MELANATED SALOON. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Crafted with love for melanated beauty ✨
          </p>
        </div>
      </div>
    </footer>
  );
}
