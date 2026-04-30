import { useState, useRef } from "react";
import { toast } from "sonner";
import {
  Plus,
  X,
  HardHat,
  Users,
  AlertTriangle,
  Camera,
  MapPin,
  Clock,
  FileDown,
  Check,
} from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { ActivityBubble, type ActivityType } from "../components/ActivityBubble";
import { EmptyState } from "../components/EmptyState";

interface Entry {
  id: string;
  type: ActivityType;
  text: string;
  photo?: string;
  time: string;
  location: string;
  pendingSync?: boolean;
}

const seed: Entry[] = [
  { id: "1", type: "travaux", text: "Coulage dalle béton zone B terminé", time: "09:30", location: "Bâtiment B - RDC" },
  { id: "2", type: "effectif", text: "12 ouvriers pointés ce matin", time: "07:45", location: "Entrée chantier" },
  { id: "3", type: "incident", text: "Fuite mineure tuyau eau - réparée", time: "10:15", location: "Zone A", pendingSync: true },
];

export default function Journal() {
  const [entries, setEntries] = useState<Entry[]>(seed);
  const [open, setOpen] = useState(false);

  return (
    <>
      <PageHeader
        title="Journal"
        subtitle={`${entries.length} entrées aujourd'hui`}
        right={
          <button
            onClick={() => setOpen(true)}
            aria-label="Nouvelle entrée"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-card"
          >
            <Plus className="h-5 w-5" strokeWidth={2.5} />
          </button>
        }
      />

      <div className="flex flex-1 flex-col gap-3 p-4">
        {entries.length === 0 ? (
          <EmptyState
            icon={HardHat}
            title="Commencez votre première entrée"
            description="Ajoutez une activité, un pointage ou un incident."
          />
        ) : (
          entries.map((e) => <ActivityBubble key={e.id} {...e} />)
        )}

        <button
          onClick={() => toast.success("Rapport PDF généré")}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card py-3 text-sm font-semibold shadow-card"
        >
          <FileDown className="h-4 w-4" />
          Générer rapport PDF du jour
        </button>
      </div>

      {open && (
        <NewEntryModal
          onClose={() => setOpen(false)}
          onSave={(entry) => {
            setEntries((prev) => [entry, ...prev]);
            toast.success("Entrée ajoutée au journal");
            setOpen(false);
          }}
        />
      )}
    </>
  );
}

function NewEntryModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (e: Entry) => void;
}) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [type, setType] = useState<ActivityType | null>(null);
  const [photo, setPhoto] = useState<string | undefined>();
  const [comment, setComment] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const now = new Date();
  const time = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

  const handleFile = (f: File | undefined) => {
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(f);
  };

  const submit = () => {
    if (!type) return;
    onSave({
      id: crypto.randomUUID(),
      type,
      text: comment || defaultText(type),
      photo,
      time,
      location: "Chantier Lyon Confluence",
      pendingSync: !navigator.onLine,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center">
      <div className="w-full max-w-md rounded-t-3xl bg-card p-5 shadow-xl sm:rounded-3xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Nouvelle activité</h2>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-4 flex gap-1.5">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full ${s <= step ? "bg-brand" : "bg-secondary"}`}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="grid gap-3">
            <p className="text-sm text-muted-foreground">Choisir un type</p>
            {(
              [
                { t: "travaux", label: "Travaux réalisés", Icon: HardHat, cls: "bg-info/15 text-info" },
                { t: "effectif", label: "Effectif", Icon: Users, cls: "bg-success/15 text-success" },
                { t: "incident", label: "Incident", Icon: AlertTriangle, cls: "bg-destructive/15 text-destructive" },
              ] as const
            ).map(({ t, label, Icon, cls }) => (
              <button
                key={t}
                onClick={() => {
                  setType(t);
                  setStep(2);
                }}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 text-left active:scale-[0.99]"
              >
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${cls}`}>
                  <Icon className="h-6 w-6" />
                </span>
                <span className="text-base font-semibold">{label}</span>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">Ajouter une photo</p>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            {photo ? (
              <img src={photo} alt="" className="h-56 w-full rounded-2xl object-cover" />
            ) : (
              <button
                onClick={() => fileRef.current?.click()}
                className="flex h-56 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-secondary text-muted-foreground"
              >
                <Camera className="h-10 w-10" />
                <span className="text-sm font-medium">Prendre une photo</span>
              </button>
            )}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setStep(1)}
                className="rounded-xl border border-border bg-card py-3 text-sm font-semibold"
              >
                Retour
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!photo}
                className="rounded-xl bg-brand py-3 text-sm font-semibold text-brand-foreground disabled:opacity-40"
              >
                Continuer
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">Commentaire (optionnel)</p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value.slice(0, 140))}
              placeholder="Ajouter un commentaire..."
              rows={3}
              className="w-full resize-none rounded-2xl border border-border bg-card p-3 text-sm outline-none focus:border-brand"
            />
            <p className="text-right text-[11px] text-muted-foreground">{comment.length}/140</p>

            <div className="flex flex-col gap-1.5 rounded-2xl bg-secondary p-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" /> Chantier Lyon Confluence
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-3.5 w-3.5" /> {now.toLocaleDateString("fr-FR")} • {time}
              </span>
            </div>

            <button
              onClick={submit}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-success py-3.5 text-base font-bold text-success-foreground"
            >
              <Check className="h-5 w-5" /> Valider
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function defaultText(t: ActivityType) {
  return t === "travaux" ? "Travaux réalisés" : t === "effectif" ? "Pointage effectif" : "Incident signalé";
}
