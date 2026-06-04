"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserCircle2 } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/library", label: "Content Library" },
  { href: "/weekly-brief", label: "Weekly Brief" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-card-border bg-card/95 backdrop-blur-sm">
      <div className="mx-auto flex h-[3.75rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-navy">
              <span className="text-[10px] font-bold tracking-tight text-white">RW</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm leading-tight">
                <span className="font-bold text-navy dark:text-teal">Realwave</span>
                <span className="font-normal text-foreground/80 dark:text-slate-300">
                  {" "}
                  Enablement
                </span>
              </p>
              <p className="text-[11px] text-muted">
                Internal Tool – Authorized Sellers Only
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-navy text-white dark:bg-navy-light"
                      : "text-muted hover:bg-background hover:text-navy dark:hover:bg-slate-800 dark:hover:text-slate-100"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <div className="hidden items-center gap-2 rounded-md border border-card-border bg-background px-3 py-1.5 sm:flex">
            <UserCircle2 className="h-4 w-4 text-muted" />
            <span className="text-xs font-medium text-foreground/80">
              Seller
            </span>
          </div>
        </div>
      </div>

      <nav className="flex gap-1 overflow-x-auto border-t border-card-border/60 px-4 py-2 md:hidden">
        {navLinks.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                isActive
                  ? "bg-navy text-white"
                  : "bg-background text-muted"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
