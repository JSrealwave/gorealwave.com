"use client";

import { usePathname } from "next/navigation";
import { Show } from "@clerk/nextjs";
import { Header } from "@/components/layout/header";

function shouldHideHubChrome(pathname: string): boolean {
  return (
    pathname.startsWith("/login") || pathname.startsWith("/public/")
  );
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome = shouldHideHubChrome(pathname);

  return (
    <>
      {!hideChrome && (
        <Show when="signed-in">
          <Header />
        </Show>
      )}
      <main
        className={
          hideChrome ? "min-h-screen" : "min-h-[calc(100vh-var(--header-height))]"
        }
      >
        {children}
      </main>
    </>
  );
}
