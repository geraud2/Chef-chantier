import { MapPin, HardHat, Users, AlertTriangle } from "lucide-react";

export type ActivityType = "travaux" | "effectif" | "incident";

interface Props {
  type: ActivityType;
  text: string;
  photo?: string;
  time: string;
  location?: string;
  pendingSync?: boolean;
}

const typeMeta = {
  travaux: { icon: HardHat, label: "Travaux", cls: "bg-info/15 text-info" },
  effectif: { icon: Users, label: "Effectif", cls: "bg-success/15 text-success" },
  incident: {
    icon: AlertTriangle,
    label: "Incident",
    cls: "bg-destructive/15 text-destructive",
  },
};

export function ActivityBubble({
  type,
  text,
  photo,
  time,
  location,
  pendingSync,
}: Props) {
  const { icon: Icon, label, cls } = typeMeta[type];
  return (
    <div className="flex gap-2">
      <span
        className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${cls}`}
      >
        <Icon className="h-4 w-4" />
      </span>
      <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-card p-3 shadow-card">
        <div className="flex items-center justify-between gap-3">
          <span className={`text-xs font-semibold ${cls.split(" ")[1]}`}>
            {label}
          </span>
          <span className="text-[11px] text-muted-foreground">{time}</span>
        </div>
        <p className="mt-1 text-sm text-foreground">{text}</p>
        {photo && (
          <img
            src={photo}
            alt=""
            className="mt-2 h-32 w-full rounded-xl object-cover"
          />
        )}
        <div className="mt-2 flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
          {location && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {location}
            </span>
          )}
          {pendingSync && (
            <span className="rounded-full bg-warning/20 px-2 py-0.5 font-medium text-warning">
              En attente synchro
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
