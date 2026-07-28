import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ current }: { current: string }) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-muted sm:text-sm">
      <a href="/" className="hover:text-brand">
        Home
      </a>
      <ChevronRight size={13} />
      <span className="font-medium text-ink">{current}</span>
    </nav>
  );
}
