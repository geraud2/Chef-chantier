import { useState, useEffect } from "react";
import { HardHat, Hammer, Wrench } from "lucide-react";

interface SplashScreenProps {
  onFinish: () => void;
  duration?: number;
}

export default function SplashScreen({ onFinish, duration = 2500 }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, duration - 500);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      onFinish();
    }, duration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [onFinish, duration]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 transition-opacity duration-500 ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Particules décoratives */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-ping" />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-white/10 rounded-full animate-ping" style={{ animationDelay: "0.5s" }} />
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-white/15 rounded-full animate-ping" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-white/20 rounded-full animate-ping" style={{ animationDelay: "0.3s" }} />
      </div>

      {/* Logo et icônes */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Cercle central */}
        <div className="relative mb-6">
          <div className="absolute inset-0 rounded-full bg-white/10 animate-ping" />
          <div className="relative h-28 w-28 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl">
            <HardHat className="h-16 w-16 text-white" strokeWidth={1.5} />
          </div>
        </div>

        {/* Outils animés */}
        <div className="flex items-center gap-4 mb-6">
          <div className="animate-bounce" style={{ animationDelay: "0s" }}>
            <Hammer className="h-8 w-8 text-white/80" />
          </div>
          <div className="animate-bounce" style={{ animationDelay: "0.2s" }}>
            <HardHat className="h-10 w-10 text-white" />
          </div>
          <div className="animate-bounce" style={{ animationDelay: "0.4s" }}>
            <Wrench className="h-8 w-8 text-white/80" />
          </div>
        </div>

        {/* Texte */}
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-1">
          BTP Stock
        </h1>
        <p className="text-xl font-bold text-white/90 mb-2">
          Manager
        </p>
        <p className="text-sm font-medium text-white/70 mb-8">
          Version Chef de Chantier
        </p>

        {/* Barre de chargement */}
        <div className="w-48 h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full animate-loading"
            style={{
              animation: "loading 2s ease-in-out",
            }}
          />
        </div>

        {/* Tagline */}
        <p className="mt-6 text-xs text-white/50 font-medium">
          Gérez votre chantier en toute simplicité
        </p>
      </div>

      <style>{`
        @keyframes loading {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}