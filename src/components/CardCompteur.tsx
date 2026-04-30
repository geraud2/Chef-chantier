import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  value: number | string;
  label: string;
  tone?: "default" | "danger" | "success" | "info";
  badge?: boolean;
}

const tones = {
  default: "text-foreground bg-secondary",
  danger: "text-destructive bg-destructive/10",
  success: "text-success bg-success/10",
  info: "text-info bg-info/10",
};

export function CardCompteur({
  icon: Icon,
  value,
  label,
  tone = "default",
  badge,
}: Props) {
  return (
    <div className="relative flex flex-col items-center justify-center gap-1 rounded-2xl bg-card p-3 shadow-card">
      {badge && (
        <span className="absolute right-2 top-2 h-2.5 w-2.5 animate-pulse rounded-full bg-destructive" />
      )}
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full ${tones[tone]}`}
      >
        <Icon className="h-5 w-5" />
      </span>
      <span className="text-2xl font-bold leading-none">{value}</span>
      <span className="text-center text-[11px] font-medium text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
