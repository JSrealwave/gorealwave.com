import { ExternalLink } from "lucide-react";

type PublicShareNoteProps = {
  href: string;
};

export function PublicShareNote({ href }: PublicShareNoteProps) {
  return (
    <div className="mb-8 rounded-xl border border-teal/25 bg-teal/10 px-4 py-3 text-sm text-slate-700">
      <p className="font-medium text-teal-dark">Shareable public link</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 inline-flex items-center gap-1.5 break-all text-slate-800 hover:text-teal-dark"
      >
        {href}
        <ExternalLink className="h-3.5 w-3.5 shrink-0" />
      </a>
    </div>
  );
}
