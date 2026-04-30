import { useNavigate } from "react-router-dom";
import {
  ClipboardList,
  HardHat,
  AlertTriangle,
  CheckCircle2,
  HardHat as HardHatIcon,
  Users,
} from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { WeatherWidget } from "../components/WeatherWidget";
import { CardCompteur } from "../components/CardCompteur";
import { FabButton } from "../components/FabButton";

const activities = [
  { icon: CheckCircle2, color: "text-success", text: "Coulage dalle béton", time: "09:30" },
  { icon: HardHatIcon, color: "text-info", text: "Livraison parpaings", time: "08:15" },
  { icon: Users, color: "text-success", text: "Pointage équipe matin", time: "07:45" },
  { icon: AlertTriangle, color: "text-warning", text: "Manque ciment signalé", time: "07:20" },
];

export default function DashboardChef() {
  const navigate = useNavigate();
  const progress = 65;

  return (
    <>
      <PageHeader title="Chantier Lyon Confluence" subtitle="Mercredi 29 avril" />
      <div className="flex flex-col gap-4 p-4">
        <WeatherWidget
          temperature={22}
          condition="partly"
          morning="18° • Nuageux"
          afternoon="24° • Éclaircies"
        />

        <section className="rounded-2xl bg-card p-4 shadow-card">
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm font-semibold text-muted-foreground">Avancement</h2>
            <span className="text-3xl font-bold text-brand-foreground">{progress}%</span>
          </div>
          <div className="mt-2 h-3 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-brand transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        <section className="grid grid-cols-3 gap-3">
          <CardCompteur icon={ClipboardList} value={8} label="Tâches" tone="info" />
          <CardCompteur icon={HardHat} value={12} label="Présents" tone="success" />
          <CardCompteur icon={AlertTriangle} value={2} label="Alertes" tone="danger" badge />
        </section>

        <section>
          <h2 className="mb-2 px-1 text-sm font-semibold text-muted-foreground">
            Dernières activités
          </h2>
          <ul className="flex flex-col gap-2">
            {activities.map((a, i) => {
              const Icon = a.icon;
              return (
                <li
                  key={i}
                  className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-card"
                >
                  <span className={`${a.color}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="flex-1 text-sm">{a.text}</span>
                  <span className="text-xs text-muted-foreground">{a.time}</span>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <FabButton onClick={() => navigate("/journal?new=1")} />
    </>
  );
}
