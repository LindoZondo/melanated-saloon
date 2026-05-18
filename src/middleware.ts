import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Admin routes require ADMIN role
    if (path.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        // Public routes
        if (
          path === "/" ||
          path.startsWith("/auth") ||
          path.startsWith("/services") ||
          path.startsWith("/stylists") ||
          path.startsWith("/gallery") ||
          path.startsWith("/api/webhooks")
        ) {
          return true;
        }

        // Protected routes require authentication
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/booking/:path*",
    "/admin/:path*",
    "/api/bookings/:path*",
    "/api/payments/:path*",
    "/api/recommendations/:path*",
    "/api/admin/:path*",
  ],
};
