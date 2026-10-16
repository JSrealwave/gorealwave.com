import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <a
      href="https://gorealwave.com"
      className={cn("flex items-center", className)}
      aria-label="Realwave home"
    >
      <img
        src="/assets/logo-wordmark.png"
        alt="Realwave"
        className="h-8 w-auto sm:h-9 dark:invert"
      />
    </a>
  );
}
