import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: {
    default: "ePlus Realwave Enablement | Seller Portal",
    template: "%s | ePlus Realwave Enablement",
  },
  description:
    "Internal sales enablement portal for ePlus Realwave sellers — one-pagers, guides, TCO tools, and weekly briefs.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${lato.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased bg-background text-foreground transition-colors duration-200">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-card-border bg-card py-5">
            <div className="mx-auto max-w-7xl space-y-1 px-4 text-center sm:px-6 lg:px-8">
              <p className="text-xs text-muted">
                © {new Date().getFullYear()} ePlus Realwave Enablement · Internal Use Only
              </p>
              <p className="text-[11px] text-muted/70">
                Where Technology Means More<sup className="text-[9px]">®</sup>
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
