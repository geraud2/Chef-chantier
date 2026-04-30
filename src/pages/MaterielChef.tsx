import { useState } from "react";
import { toast } from "sonner";
import { Send, AlertTriangle, Package, Calendar, Clock } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { BadgeStatus, type StatusKey } from "../components/BadgeStatus";

const categories = [
  { value: "ciment", label: "🧱 Ciment / Béton" },
  { value: "acier", label: "🔩 Acier / Ferraillage" },
  { value: "bois", label: "🪵 Bois / Coffrage" },
  { value: "outillage", label: "🔧 Outillage" },
  { value: "epi", label: "🦺 EPI / Sécurité" },
  { value: "autre", label: "📦 Autre" },
];

interface Demande {
  id: string;
  type: string;
  qty: number;
  urgent: boolean;
  status: StatusKey;
  date: string;
  heure: string;
  dateComplete: string;
}

const seed: Demande[] = [
  { 
    id: "1", 
    type: "🧱 Ciment / Béton", 
    qty: 30, 
    urgent: true, 
    status: "en_attente", 
    date: "15 janvier 2024",
    heure: "08:15",
    dateComplete: "2024-01-15T08:15:00"
  },
  { 
    id: "2", 
    type: "🦺 EPI / Sécurité", 
    qty: 10, 
    urgent: false, 
    status: "valide", 
    date: "14 janvier 2024",
    heure: "14:30",
    dateComplete: "2024-01-14T14:30:00"
  },
  { 
    id: "3", 
    type: "🪵 Bois / Coffrage", 
    qty: 50, 
    urgent: false, 
    status: "refuse", 
    date: "13 janvier 2024",
    heure: "09:00",
    dateComplete: "2024-01-13T09:00:00"
  },
];

export default function MaterielChef() {
  const [type, setType] = useState(categories[0].value);
  const [qty, setQty] = useState(1);
  const [urgent, setUrgent] = useState(false);
  const [demandes, setDemandes] = useState<Demande[]>(seed);

  // Date et heure actuelles non modifiables
  const maintenant = new Date();
  const dateAujourdhui = maintenant.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const heureActuelle = maintenant.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const cat = categories.find((c) => c.value === type)!;
    
    const nouvelleDate = new Date();
    const dateFormatee = nouvelleDate.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const heureFormatee = nouvelleDate.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    
    setDemandes((prev) => [
      {
        id: crypto.randomUUID(),
        type: cat.label,
        qty,
        urgent,
        status: "en_attente",
        date: dateFormatee,
        heure: heureFormatee,
        dateComplete: nouvelleDate.toISOString(),
      },
      ...prev,
    ]);
    toast.success("Demande envoyée");
    setQty(1);
    setUrgent(false);
  };

  const signalManque = () => {
    const maintenant = new Date();
    const heure = maintenant.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    toast.warning("Manque signalé", { 
      description: `Le bureau a été notifié à ${heure}.` 
    });
  };

  return (
    <>
      <PageHeader title="Matériel" subtitle="Faire une demande" />
      
      <div className="flex flex-col gap-4 p-4">
        {/* Formulaire */}
        <form onSubmit={submit} className="flex flex-col gap-3 rounded-2xl bg-card p-4 shadow-card">
          
          {/* Date et heure non modifiables DANS le formulaire */}
          <div className="flex items-center justify-between rounded-xl bg-muted/50 border border-border p-3 mb-1">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
                  Date
                </p>
                <p className="text-sm font-semibold capitalize">
                  {dateAujourdhui}
                </p>
              </div>
            </div>
            
            <div className="h-7 w-px bg-border" />
            
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center">
                <Clock className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
                  Heure
                </p>
                <p className="text-sm font-semibold">
                  {heureActuelle}
                </p>
              </div>
            </div>
          </div>

          {/* Type de matériel */}
          <label className="text-xs font-semibold text-muted-foreground">
            Type de matériel
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="rounded-xl border border-border bg-background px-3 py-3 text-base font-medium outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>

          {/* Quantité */}
          <label className="text-xs font-semibold text-muted-foreground">
            Quantité
          </label>
          <div className="flex items-stretch overflow-hidden rounded-xl border border-border bg-background">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex w-12 items-center justify-center bg-muted/50 text-xl font-bold active:bg-muted transition hover:bg-muted"
            >
              −
            </button>
            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
              className="w-full bg-transparent text-center text-lg font-bold outline-none"
            />
            <button
              type="button"
              onClick={() => setQty((q) => q + 1)}
              className="flex w-12 items-center justify-center bg-muted/50 text-xl font-bold active:bg-muted transition hover:bg-muted"
            >
              +
            </button>
          </div>

          {/* Priorité */}
          <label className="text-xs font-semibold text-muted-foreground">
            Priorité
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setUrgent(false)}
              className={`rounded-xl py-3 text-sm font-semibold transition-all active:scale-95 ${
                !urgent 
                  ? "bg-primary text-white shadow-md ring-2 ring-primary/20" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              ✅ Normale
            </button>
            <button
              type="button"
              onClick={() => setUrgent(true)}
              className={`rounded-xl py-3 text-sm font-semibold transition-all active:scale-95 ${
                urgent
                  ? "bg-destructive text-white shadow-md ring-2 ring-destructive/20"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              ⚡ Urgente
            </button>
          </div>

          {/* Bouton Envoyer */}
          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-success py-3.5 text-base font-bold text-white shadow-md transition-all active:scale-[0.98] hover:bg-success/90 hover:shadow-lg"
          >
            <Send className="h-5 w-5" /> Envoyer la demande
          </button>
        </form>

        {/* Bouton signaler un manque */}
        <button
          onClick={signalManque}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-destructive/30 bg-destructive/5 py-3 text-sm font-bold text-destructive transition-all active:scale-[0.98] hover:bg-destructive/10"
        >
          <AlertTriangle className="h-5 w-5" /> Signaler un manque
        </button>

        {/* Liste des demandes */}
        <section>
          <h2 className="mb-2 px-1 text-sm font-bold uppercase tracking-wide text-muted-foreground">
            Mes demandes
          </h2>
          {demandes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-16 w-16 rounded-2xl bg-muted/30 flex items-center justify-center mb-3">
                <Package className="h-8 w-8 text-muted-foreground/40" />
              </div>
              <p className="text-sm text-muted-foreground">Aucune demande</p>
              <p className="text-xs text-muted-foreground mt-1">
                Créez votre première demande ci-dessus
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-2">
              {demandes.map((d) => (
                <li
                  key={d.id}
                  className="flex items-start justify-between gap-3 rounded-2xl bg-card p-3.5 shadow-card hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-3">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      d.urgent ? "bg-destructive/10" : "bg-muted"
                    }`}>
                      {d.urgent ? (
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                      ) : (
                        <Package className="h-5 w-5 text-muted-foreground" />
                      )}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{d.type}</p>
                      <p className="text-xs text-muted-foreground">
                        Qté : <span className="font-semibold text-foreground">{d.qty}</span>
                        {d.urgent && (
                          <span className="ml-1.5 inline-flex items-center gap-1 rounded-full bg-destructive/15 px-1.5 py-0.5 text-[10px] font-bold text-destructive">
                            <AlertTriangle className="h-2.5 w-2.5" />
                            URGENT
                          </span>
                        )}
                      </p>
                      <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {d.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {d.heure}
                        </span>
                      </div>
                    </div>
                  </div>
                  <BadgeStatus status={d.status} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}