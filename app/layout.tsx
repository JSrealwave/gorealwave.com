import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteChrome } from "@/components/layout/site-chrome";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Realwave Enablement Hub",
  description: "Internal tools and assets for Realwave sellers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${lato.variable} min-h-screen bg-background font-sans text-base text-foreground antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider
            signInUrl="/login"
            signUpUrl="/login"
            afterSignOutUrl="/login"
            signInFallbackRedirectUrl="/"
            signUpFallbackRedirectUrl="/"
            signInForceRedirectUrl="/"
            appearance={{
              layout: {
                unsafe_disableDevelopmentModeWarnings: true,
              },
            }}
          >
            <SiteChrome>{children}</SiteChrome>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
