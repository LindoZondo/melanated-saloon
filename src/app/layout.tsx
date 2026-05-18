import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "MELANATED SALOON | Premium Beauty Experience",
  description:
    "Luxurious salon services celebrating melanated beauty. Book online, explore AI-powered style recommendations, and enjoy a premium beauty experience.",
  keywords: [
    "salon",
    "beauty",
    "melanated",
    "hairstyles",
    "booking",
    "premium",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} ${cormorant.variable} font-body bg-deep-950 text-cream-50 antialiased`}
      >
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#2D1810",
                color: "#FFFDF7",
                border: "1px solid #D4A017",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
