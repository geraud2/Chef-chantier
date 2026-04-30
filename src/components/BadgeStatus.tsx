import {
  CheckCircle2,
  Clock,
  XCircle,
  AlertOctagon,
  Loader2,
  Hourglass,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type StatusKey =
  | "en_cours"
  | "termine"
  | "bloque"
  | "en_attente"
  | "valide"
  | "refuse";

const map: Record<
  StatusKey,
  { label: string; icon: LucideIcon; cls: string }
> = {
  en_cours: { label: "En cours", icon: Loader2, cls: "bg-info/15 text-info" },
  termine: {
    label: "Terminé",
    icon: CheckCircle2,
    cls: "bg-success/15 text-success",
  },
  bloque: {
    label: "Bloqué",
    icon: AlertOctagon,
    cls: "bg-destructive/15 text-destructive",
  },
  en_attente: {
    label: "En attente",
    icon: Hourglass,
    cls: "bg-warning/15 text-warning",
  },
  valide: {
    label: "Validé",
    icon: CheckCircle2,
    cls: "bg-success/15 text-success",
  },
  refuse: {
    label: "Refusé",
    icon: XCircle,
    cls: "bg-destructive/15 text-destructive",
  },
};

export function BadgeStatus({ status }: { status: StatusKey }) {
  const { label, icon: Icon, cls } = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${cls}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}
