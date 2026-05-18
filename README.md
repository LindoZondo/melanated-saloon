# ✨ MELANATED SALOON

> A luxurious, mobile-first salon platform celebrating melanated beauty. Premium online bookings, AI-powered style recommendations, loyalty rewards, and more.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![Prisma](https://img.shields.io/badge/Prisma-5.9-2D3748)

## 🌟 Features

### Client Experience
- **Online Booking** — Multi-step booking flow with service, stylist, date/time selection
- **Stylist Selection** — Browse stylist profiles, specialties, ratings, and availability
- **Stripe Payments** — Secure online payment processing
- **AI Chatbot** — Beauty assistant for style advice, product recommendations, and booking help
- **AI Style Recommendations** — Personalized hairstyle suggestions based on hair type and preferences
- **AI Gallery** — DALL-E generated hairstyle inspiration gallery
- **Appointment Reminders** — Automated 24-hour notifications via email/SMS
- **Customer Accounts** — Profile management, booking history, and preferences

### Loyalty & Rewards
- **Customizable Loyalty Program** — Admin-configurable points per visit/dollar
- **Automatic Discounts** — Points auto-redeem at threshold for returning clients
- **Referral Rewards** — Unique referral codes with bonus points for both parties
- **Promo Codes** — Percentage or fixed-amount discounts with usage limits
- **Welcome Bonus** — New member signup rewards

### Admin Dashboard
- **Revenue Analytics** — Monthly revenue, booking counts, client growth
- **Booking Management** — View, confirm, cancel, and manage all appointments
- **Client Management** — View client profiles, visit history, loyalty status
- **Loyalty Configuration** — Customize points, thresholds, and bonuses
- **Promo Code Management** — Create, edit, and track promotional codes
- **AI Gallery Generation** — Generate new hairstyle images for the gallery

## 🎨 Design Aesthetic

The platform features a **premium melanated beauty aesthetic**:
- Deep brown/black backgrounds with gold accents
- Warm cream text on dark surfaces
- Gold gradient CTAs and highlights
- Elegant serif display fonts (Playfair Display)
- Smooth animations with Framer Motion
- Glass-morphism panels with subtle borders
- Mobile-first responsive design

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth.js (Credentials + Google) |
| Payments | Stripe |
| AI | OpenAI GPT-4o-mini + DALL-E 3 |
| Animations | Framer Motion |
| Deployment | Vercel (recommended) |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Stripe account
- OpenAI API key

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd melanated-saloon

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Run development server
npm run dev
```

### Environment Variables

See `.env.example` for all required variables:
- `DATABASE_URL` — PostgreSQL connection string
- `NEXTAUTH_SECRET` — Random secret for session encryption
- `STRIPE_SECRET_KEY` — Stripe API key for payments
- `OPENAI_API_KEY` — OpenAI key for AI features
- `SMTP_*` — Email configuration for reminders

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── booking/              # Multi-step booking flow
│   ├── services/             # Services & pricing
│   ├── stylists/             # Stylist profiles
│   ├── gallery/              # AI-powered style gallery
│   ├── dashboard/            # Client dashboard
│   ├── admin/                # Admin dashboard
│   ├── auth/                 # Login & registration
│   └── api/
│       ├── auth/             # NextAuth + registration
│       ├── bookings/         # Booking CRUD
│       ├── payments/         # Stripe integration
│       ├── chat/             # AI chatbot
│       ├── recommendations/  # AI style recommendations
│       ├── reminders/        # Appointment reminders
│       ├── gallery/          # AI image generation
│       ├── admin/            # Admin APIs (loyalty, promos)
│       └── webhooks/         # Stripe webhooks
├── components/
│   ├── layout/               # Navbar, Footer
│   ├── home/                 # Landing page sections
│   └── chat/                 # AI chatbot widget
├── lib/
│   └── prisma.ts             # Database client
└── middleware.ts             # Route protection
```

## 📱 Mobile-First Design

The entire platform is designed mobile-first with:
- Responsive navigation with hamburger menu
- Touch-friendly booking interface
- Optimized card layouts for small screens
- Bottom-positioned chat widget
- Swipeable galleries

## 🔒 Security

- Password hashing with bcrypt (12 rounds)
- JWT session strategy
- Role-based access control (Client/Stylist/Admin)
- Stripe webhook signature verification
- Input validation with Zod
- Protected API routes via middleware

## 📄 License

Private — All rights reserved.
