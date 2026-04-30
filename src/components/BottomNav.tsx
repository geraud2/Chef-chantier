import { Link, useLocation } from "react-router-dom";
import { Home, NotebookPen, Users, Package, User } from "lucide-react";

const tabs = [
  { to: "/dashboard-chef", label: "Accueil", icon: Home },
  { to: "/journal", label: "Journal", icon: NotebookPen },
  { to: "/equipe", label: "Équipe", icon: Users },
  { to: "/materiel-chef", label: "Matériel", icon: Package },
  { to: "/profil-chef", label: "Profil", icon: User },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-border bg-card pb-[env(safe-area-inset-bottom)]">
      <ul className="grid grid-cols-5">
        {tabs.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <li key={to}>
              <Link
                to={to}
                className={`flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition-colors ${
                  active ? "text-brand-foreground" : "text-muted-foreground"
                }`}
              >
                <span
                  className={`flex h-9 w-12 items-center justify-center rounded-full transition-colors ${
                    active ? "bg-brand text-brand-foreground" : ""
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={active ? 2.5 : 2} />
                </span>
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
