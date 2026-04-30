import { useState } from "react";
import { toast } from "sonner";
import { HardHat, Check, X, MapPin } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { BadgeStatus, type StatusKey } from "../components/BadgeStatus";

interface Worker {
  id: string;
  name: string;
  present: boolean;
}

interface Task {
  name: string;
  status: StatusKey;
  progress: number;
  workers: Worker[];
}

const seed: Task[] = [
  {
    name: "Maçonnerie",
    status: "en_cours",
    progress: 70,
    workers: [
      { id: "1", name: "Karim B.", present: true },
      { id: "2", name: "Marc D.", present: true },
      { id: "3", name: "Yanis M.", present: true },
      { id: "4", name: "Paul R.", present: false },
    ],
  },
  {
    name: "Coffrage",
    status: "en_cours",
    progress: 45,
    workers: [
      { id: "5", name: "Said T.", present: true },
      { id: "6", name: "Hugo L.", present: true },
      { id: "7", name: "Léo P.", present: true },
    ],
  },
  {
    name: "Électricité",
    status: "bloque",
    progress: 30,
    workers: [
      { id: "8", name: "Théo V.", present: true },
      { id: "9", name: "Julien K.", present: false },
    ],
  },
  {
    name: "Plomberie",
    status: "termine",
    progress: 100,
    workers: [{ id: "10", name: "Anis F.", present: true }],
  },
];

export default function Equipe() {
  const [tasks, setTasks] = useState<Task[]>(seed);

  const present = tasks.flatMap((t) => t.workers).filter((w) => w.present).length;
  const total = tasks.flatMap((t) => t.workers).length;

  const togglePresence = (taskIdx: number, workerId: string) => {
    setTasks((prev) =>
      prev.map((t, i) =>
        i !== taskIdx
          ? t
          : {
              ...t,
              workers: t.workers.map((w) =>
                w.id === workerId ? { ...w, present: !w.present } : w,
              ),
            },
      ),
    );
    toast.success("Pointage validé", { description: "GPS confirmé" });
  };

  return (
    <>
      <PageHeader title="Équipe" subtitle="Pointage du jour" />
      <div className="flex flex-col gap-4 p-4">
        <section className="rounded-3xl bg-gradient-to-br from-brand to-brand/70 p-5 text-brand-foreground shadow-card">
          <p className="text-sm font-medium opacity-90">Présents aujourd'hui</p>
          <div className="mt-1 flex items-baseline gap-2">
            <HardHat className="h-7 w-7" />
            <span className="text-4xl font-bold leading-none">{present}</span>
            <span className="text-base opacity-80">/ {total} ouvriers</span>
          </div>
          <p className="mt-2 inline-flex items-center gap-1 text-xs opacity-90">
            <MapPin className="h-3 w-3" /> GPS validé
          </p>
        </section>

        {tasks.map((task, i) => (
          <section key={task.name} className="rounded-2xl bg-card p-4 shadow-card">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">{task.name}</h3>
              <BadgeStatus status={task.status} />
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-brand" style={{ width: `${task.progress}%` }} />
              </div>
              <span className="text-xs font-semibold text-muted-foreground">{task.progress}%</span>
            </div>
            <p className="mt-3 text-xs font-medium text-muted-foreground">
              {task.workers.filter((w) => w.present).length}/{task.workers.length} ouvriers présents
            </p>
            <ul className="mt-2 flex flex-col gap-1.5">
              {task.workers.map((w) => (
                <li
                  key={w.id}
                  className="flex items-center justify-between rounded-xl bg-secondary px-3 py-2"
                >
                  <span className="text-sm font-medium">{w.name}</span>
                  <button
                    onClick={() => togglePresence(i, w.id)}
                    className={`flex h-9 w-20 items-center justify-center gap-1 rounded-full text-xs font-semibold transition ${
                      w.present
                        ? "bg-success text-success-foreground"
                        : "bg-destructive/15 text-destructive"
                    }`}
                  >
                    {w.present ? (
                      <>
                        <Check className="h-4 w-4" /> Présent
                      </>
                    ) : (
                      <>
                        <X className="h-4 w-4" /> Absent
                      </>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
