import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  HardHat,
  Calendar,
  Camera,
  LogOut,
  WifiOff,
  Wifi,
} from "lucide-react";
import { PageHeader } from "../components/PageHeader";

export default function ProfilChef() {
  const [photo, setPhoto] = useState<string | undefined>();
  const [offline, setOffline] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const onPhoto = (f?: File) => {
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setPhoto(r.result as string);
    r.readAsDataURL(f);
  };

  return (
    <>
      <PageHeader title="Profil" />
      <div className="flex flex-col gap-4 p-4">
        <section className="flex flex-col items-center gap-3 rounded-3xl bg-gradient-to-br from-brand to-brand/70 p-6 text-brand-foreground shadow-card">
          <button
            onClick={() => fileRef.current?.click()}
            className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white/40 bg-white/20"
          >
            {photo ? (
              <img src={photo} alt="" className="h-full w-full object-cover" />
            ) : (
              <HardHat className="m-auto h-12 w-12" />
            )}
            <span className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-card text-foreground shadow">
              <Camera className="h-4 w-4" />
            </span>
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onPhoto(e.target.files?.[0])}
          />
          <div className="text-center">
            <h2 className="text-xl font-bold">Mehdi Bensalem</h2>
            <p className="text-sm opacity-90">Chef de chantier</p>
            <p className="mt-1 text-xs opacity-80">📍 Lyon Confluence</p>
          </div>
        </section>

        <section className="flex flex-col divide-y divide-border rounded-2xl bg-card shadow-card">
          {[
            { Icon: Mail, label: "Email", value: "mehdi.b@btp.fr" },
            { Icon: Phone, label: "Téléphone", value: "06 12 34 56 78" },
            { Icon: HardHat, label: "Chantier", value: "Lyon Confluence — Bât. B" },
            { Icon: Calendar, label: "Ancienneté", value: "8 ans" },
          ].map(({ Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 p-3.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                <Icon className="h-4 w-4" />
              </span>
              <div className="flex-1">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
                <p className="text-sm font-semibold">{value}</p>
              </div>
            </div>
          ))}
        </section>

        <section>
          <h2 className="mb-2 px-1 text-sm font-semibold text-muted-foreground">Ce mois</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { v: 47, l: "Activités" },
              { v: 132, l: "Photos" },
              { v: 21, l: "Rapports" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-card p-3 text-center shadow-card">
                <p className="text-2xl font-bold text-brand-foreground">{s.v}</p>
                <p className="text-[11px] text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-card p-4 shadow-card">
          <button
            onClick={() => {
              setOffline((v) => !v);
              toast.message(
                !offline ? "Mode hors ligne activé" : "Mode hors ligne désactivé",
                { description: "Les données seront synchronisées automatiquement" },
              );
            }}
            className="flex w-full items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  offline ? "bg-warning/15 text-warning" : "bg-success/15 text-success"
                }`}
              >
                {offline ? <WifiOff className="h-5 w-5" /> : <Wifi className="h-5 w-5" />}
              </span>
              <div className="text-left">
                <p className="text-sm font-semibold">Mode hors ligne</p>
                <p className="text-[11px] text-muted-foreground">
                  Synchro auto au retour réseau
                </p>
              </div>
            </div>
            <span
              className={`relative h-7 w-12 rounded-full transition ${
                offline ? "bg-warning" : "bg-secondary"
              }`}
            >
              <span
                className={`absolute top-0.5 h-6 w-6 rounded-full bg-card shadow transition ${
                  offline ? "left-5" : "left-0.5"
                }`}
              />
            </span>
          </button>
        </section>

        <button
          onClick={() => toast.error("Déconnexion (démo)")}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-destructive py-3.5 text-base font-bold text-destructive-foreground"
        >
          <LogOut className="h-5 w-5" /> Se déconnecter
        </button>
      </div>
    </>
  );
}
