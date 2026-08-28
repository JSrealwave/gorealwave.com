"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";
import { BrandMark } from "@/components/layout/brand-mark";
import { isNavLinkActive, navLinks } from "@/components/layout/nav-config";
import { cn } from "@/lib/utils";

/**
 * Classic header — pill-style active nav, mobile scroll strip.
 * Best for: familiar app chrome with clear section highlighting.
 */
export function HeaderClassic() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <header className="sticky top-0 z-40 border-b border-card-border bg-card/95 backdrop-blur-md supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto flex h-[3.75rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-6 lg:gap-8">
          <BrandMark />

          <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main">
            {navLinks.map((link) => {
              const isActive = isNavLinkActive(link, pathname, searchParams);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-navy text-white shadow-sm dark:bg-navy-light"
                      : "text-muted hover:bg-background hover:text-navy dark:hover:bg-slate-800/80 dark:hover:text-slate-100"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-2.5">
          <ThemeToggle />
          <UserButton
            appearance={{
              elements: {
                avatarBox:
                  "h-8 w-8 rounded-full ring-1 ring-card-border hover:ring-navy/30 dark:hover:ring-teal/40 transition",
              },
            }}
          />
        </div>
      </div>

      <nav
        className="flex gap-1 overflow-x-auto border-t border-card-border/60 px-4 py-2 md:hidden"
        aria-label="Main mobile"
      >
        {navLinks.map((link) => {
          const isActive = isNavLinkActive(link, pathname, searchParams);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                isActive
                  ? "bg-navy text-white dark:bg-navy-light"
                  : "bg-background text-muted hover:text-navy dark:hover:text-slate-200"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
