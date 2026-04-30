import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { BottomNav } from "./components/BottomNav";
import { OfflineIndicator } from "./components/OfflineIndicator";
import SplashScreen from "./components/SplashScreen";
import DashboardChef from "./pages/DashboardChef";
import Journal from "./pages/Journal";
import Equipe from "./pages/Equipe";
import MaterielChef from "./pages/MaterielChef";
import ProfilChef from "./pages/ProfilChef";
import NotFound from "./pages/NotFound";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-background pb-20">
        <OfflineIndicator />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard-chef" replace />} />
          <Route path="/dashboard-chef" element={<DashboardChef />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/equipe" element={<Equipe />} />
          <Route path="/materiel-chef" element={<MaterielChef />} />
          <Route path="/profil-chef" element={<ProfilChef />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <BottomNav />
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
}