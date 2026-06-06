import type { Metadata } from "next";
import { ClerkProvider, Show, UserButton } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Realwave Enablement Hub",
  description: "Internal tools and assets for ePlus sellers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">
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
          <Show when="signed-in">
            <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-slate-950/80">
              <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                {/* Left: Branding */}
                <div className="flex items-center gap-x-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#12498a]">
                    <span className="font-bold text-2xl tracking-tighter text-white">e+</span>
                  </div>
                  <div>
                    <div className="font-semibold tracking-tight text-lg">Realwave</div>
                    <div className="text-[10px] text-slate-500 -mt-1">Enablement Hub</div>
                  </div>
                </div>

                {/* Right: User Menu */}
                <div className="flex items-center gap-x-4">
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "h-9 w-9 rounded-full ring-1 ring-slate-700 hover:ring-slate-600 transition",
                      }
                    }}
                  />
                </div>
              </div>
            </header>
          </Show>

          <main className="min-h-[calc(100vh-65px)]">
            {children}
          </main>
        </ClerkProvider>
      </body>
    </html>
  );
}
