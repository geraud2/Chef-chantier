import { useEffect, useState } from "react";
import { Wifi, WifiOff } from "lucide-react";

export function OfflineIndicator() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    if (typeof navigator === "undefined") return;
    setOnline(navigator.onLine);
    const up = () => setOnline(true);
    const down = () => setOnline(false);
    window.addEventListener("online", up);
    window.addEventListener("offline", down);
    return () => {
      window.removeEventListener("online", up);
      window.removeEventListener("offline", down);
    };
  }, []);

  if (online) return null;
  return (
    <div className="flex items-center justify-center gap-2 bg-destructive py-1 text-xs font-medium text-destructive-foreground">
      <WifiOff className="h-3 w-3" />
      Hors ligne — synchro auto au retour
    </div>
  );
}

export function OnlineDot({ online }: { online: boolean }) {
  return online ? (
    <span className="inline-flex items-center gap-1 text-xs text-success">
      <Wifi className="h-3 w-3" /> En ligne
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-xs text-destructive">
      <WifiOff className="h-3 w-3" /> Hors ligne
    </span>
  );
}
