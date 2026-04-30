import { Cloud, CloudRain, Sun, CloudSun, Thermometer } from "lucide-react";

export type WeatherCondition = "sunny" | "cloudy" | "rainy" | "partly";

interface Props {
  temperature: number;
  condition: WeatherCondition;
  morning: string;
  afternoon: string;
}

const icons = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
  partly: CloudSun,
};

export function WeatherWidget({
  temperature,
  condition,
  morning,
  afternoon,
}: Props) {
  const Icon = icons[condition];
  const advice =
    condition === "rainy"
      ? "🌧️ Risque de retard"
      : temperature >= 30
        ? "☀️ Vigilance chaleur"
        : "👍 Conditions OK";

  return (
    <div className="rounded-3xl bg-gradient-to-br from-info to-info/70 p-4 text-info-foreground shadow-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon className="h-12 w-12" strokeWidth={1.8} />
          <div>
            <div className="flex items-end gap-1 leading-none">
              <span className="text-4xl font-bold">{temperature}</span>
              <span className="mb-1 text-lg">°C</span>
            </div>
            <p className="mt-1 text-xs opacity-90">{advice}</p>
          </div>
        </div>
        <Thermometer className="h-6 w-6 opacity-80" />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-xl bg-white/15 px-3 py-2">
          <p className="opacity-80">Matin</p>
          <p className="font-semibold">{morning}</p>
        </div>
        <div className="rounded-xl bg-white/15 px-3 py-2">
          <p className="opacity-80">Après-midi</p>
          <p className="font-semibold">{afternoon}</p>
        </div>
      </div>
    </div>
  );
}
