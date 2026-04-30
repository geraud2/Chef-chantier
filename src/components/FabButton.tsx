import { Plus } from "lucide-react";

interface Props {
  onClick: () => void;
  label?: string;
}

export function FabButton({ onClick, label = "Nouvelle activité" }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="fixed bottom-20 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-fab transition active:scale-95"
    >
      <Plus className="h-7 w-7" strokeWidth={2.5} />
    </button>
  );
}
