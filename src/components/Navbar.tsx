import React from "react";
import {
  Sparkles,
  Layers,
  History,
  Palette,
  MessageSquareText,
  ShieldCheck,
  CheckCircle2,
  User,
  Building2,
  ChevronDown,
} from "lucide-react";
import { UserProfile } from "../types";

interface NavbarProps {
  activeTab: "wizard" | "dashboard" | "simulator" | "certificate";
  setActiveTab: (tab: "wizard" | "dashboard" | "simulator" | "certificate") => void;
  onOpenAdvisor: () => void;
  onLoadDemo: () => void;
  projectsCount: number;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAdvisor,
  onLoadDemo,
  projectsCount,
  currentUser,
  onOpenAuth,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("wizard")}>
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-600 via-sky-500 to-amber-400 p-0.5 shadow-lg shadow-blue-500/20">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Layers className="w-6 h-6 text-sky-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  COLOR<span className="text-sky-400">LINK</span>
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  PINTUCO DIGITAL
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Ecosistema Inteligente de Pintura y Recubrimientos
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60">
            <button
              id="nav-tab-wizard"
              onClick={() => setActiveTab("wizard")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === "wizard"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-300" />
              Nuevo Diagnóstico & Solución
            </button>

            <button
              id="nav-tab-dashboard"
              onClick={() => setActiveTab("dashboard")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === "dashboard"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <History className="w-3.5 h-3.5" />
              Proyectos ({projectsCount})
            </button>

            <button
              id="nav-tab-simulator"
              onClick={() => setActiveTab("simulator")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === "simulator"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              Simulador de Color
            </button>

            <button
              id="nav-tab-certificate"
              onClick={() => setActiveTab("certificate")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === "certificate"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Certificado & Garantía
            </button>
          </nav>

          {/* Quick Actions & User Account */}
          <div className="flex items-center gap-2">
            {/* User Account / Person Type Access Button */}
            <button
              id="btn-user-auth"
              onClick={onOpenAuth}
              className={`inline-flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-xl text-xs font-semibold border transition ${
                currentUser
                  ? currentUser.personType === "juridica"
                    ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/60"
                    : "bg-sky-950/60 border-sky-500/50 text-sky-300 hover:bg-sky-900/60"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
              }`}
              title="Registro o Acceso como Persona Natural / Jurídica"
            >
              {currentUser ? (
                <>
                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-white ${
                    currentUser.personType === "juridica" ? "bg-emerald-600" : "bg-sky-500"
                  }`}>
                    {currentUser.personType === "juridica" ? (
                      <Building2 className="w-3 h-3" />
                    ) : (
                      <User className="w-3 h-3" />
                    )}
                  </div>
                  <div className="text-left hidden sm:block max-w-[120px] md:max-w-[160px]">
                    <p className="text-[11px] font-bold truncate leading-tight">
                      {currentUser.personType === "natural"
                        ? currentUser.firstName
                        : currentUser.companyName}
                    </p>
                    <p className="text-[9px] opacity-75 truncate">
                      {currentUser.personType === "natural" ? "Pers. Natural" : `NIT: ${currentUser.nit}`}
                    </p>
                  </div>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </>
              ) : (
                <>
                  <User className="w-3.5 h-3.5 text-sky-400" />
                  <span>Acceso / Registro</span>
                </>
              )}
            </button>

            <button
              id="btn-load-demo"
              onClick={onLoadDemo}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              title="Cargar caso real de demostración"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Demo
            </button>

            <button
              id="btn-open-advisor"
              onClick={onOpenAdvisor}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/25 transition transform active:scale-95"
            >
              <MessageSquareText className="w-4 h-4" />
              <span className="hidden sm:inline">Pintuco IA Advisor</span>
              <span className="sm:hidden">IA</span>
            </button>
          </div>
        </div>

        {/* Mobile Tab Bar */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-2 border-t border-slate-800 scrollbar-none">
          <button
            onClick={() => setActiveTab("wizard")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              activeTab === "wizard" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300"
            }`}
          >
            Diagnóstico
          </button>
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              activeTab === "dashboard" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300"
            }`}
          >
            Proyectos ({projectsCount})
          </button>
          <button
            onClick={() => setActiveTab("simulator")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              activeTab === "simulator" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300"
            }`}
          >
            Simulador
          </button>
          <button
            onClick={() => setActiveTab("certificate")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              activeTab === "certificate" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300"
            }`}
          >
            Garantía & Ficha
          </button>
        </div>
      </div>
    </header>
  );
};

