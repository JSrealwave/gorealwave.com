"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";
import { BrandMark } from "@/components/layout/brand-mark";
import { isNavLinkActive, navLinks } from "@/components/layout/nav-config";
import { cn } from "@/lib/utils";

/**
 * Command-bar header — centered nav capsule, actions on the right.
 * Best for: a dashboard feel with navigation as the focal point.
 */
export function HeaderCommand() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <header className="sticky top-0 z-40 border-b border-card-border bg-card/90 backdrop-blur-md">
      <div className="mx-auto grid h-[3.75rem] max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <BrandMark className="justify-self-start" />

        <nav
          className="hidden items-center rounded-full border border-card-border bg-background/60 p-1 md:flex"
          aria-label="Main"
        >
          {navLinks.map((link) => {
            const isActive = isNavLinkActive(link, pathname, searchParams);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-navy text-white shadow-sm dark:bg-navy-light"
                    : "text-muted hover:text-navy dark:hover:text-slate-100"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center justify-self-end gap-2.5">
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
        className="flex gap-1 overflow-x-auto px-4 py-2 md:hidden"
        aria-label="Main mobile"
      >
        {navLinks.map((link) => {
          const isActive = isNavLinkActive(link, pathname, searchParams);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                isActive
                  ? "bg-navy text-white"
                  : "border border-card-border bg-background text-muted"
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
