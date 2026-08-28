"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";
import { BrandMark } from "@/components/layout/brand-mark";
import { isNavLinkActive, navLinks } from "@/components/layout/nav-config";
import { hubShellClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

/**
 * Minimal header — slim bar with underline active states.
 * Aligned to the same wide content shell as page layouts.
 */
export function HeaderMinimal() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <header className="sticky top-0 z-40 border-b border-card-border bg-background/90 backdrop-blur-lg supports-[backdrop-filter]:bg-background/75">
      <div
        className={cn(
          hubShellClass,
          "flex h-[3.75rem] items-center justify-between gap-6 lg:gap-10"
        )}
      >
        <BrandMark />

        <nav
          className="hidden items-center gap-0.5 md:flex"
          aria-label="Main"
        >
          {navLinks.map((link) => {
            const isActive = isNavLinkActive(link, pathname, searchParams);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-4 text-[0.9375rem] font-medium transition-colors",
                  isActive
                    ? "text-navy dark:text-teal"
                    : "text-muted hover:text-foreground"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
                {isActive && (
                  <span className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-teal" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2.5">
          <ThemeToggle />
          <UserButton
            appearance={{
              elements: {
                avatarBox:
                  "h-8 w-8 rounded-full ring-1 ring-card-border transition hover:ring-teal/30",
              },
            }}
          />
        </div>
      </div>

      <nav
        className={cn(
          hubShellClass,
          "flex gap-5 overflow-x-auto border-t border-card-border/60 py-3 md:hidden"
        )}
        aria-label="Main mobile"
      >
        {navLinks.map((link) => {
          const isActive = isNavLinkActive(link, pathname, searchParams);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "shrink-0 border-b-2 pb-1 text-sm font-medium transition-colors",
                isActive
                  ? "border-teal text-navy dark:text-teal"
                  : "border-transparent text-muted"
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
