import React from "react";
import { UserCheck, Paintbrush, Camera, Warehouse, ShieldCheck, Check } from "lucide-react";

interface WorkflowStepperProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  completedSteps: number[];
}

export const WorkflowStepper: React.FC<WorkflowStepperProps> = ({
  currentStep,
  onStepClick,
  completedSteps,
}) => {
  const steps = [
    {
      step: 1,
      title: "1. Necesidad del Cliente",
      subtitle: "Identificación, Canal & Consentimiento",
      icon: UserCheck,
    },
    {
      step: 2,
      title: "2. Superficie & Condición",
      subtitle: "Área, Color & Patologías del Espacio",
      icon: Paintbrush,
    },
    {
      step: 3,
      title: "3. Evidencias & Diagnóstico IA",
      subtitle: "Fotos & Análisis Inteligente Gemini",
      icon: Camera,
    },
    {
      step: 4,
      title: "4. Solución Técnica & Abastecimiento",
      subtitle: "Sistema Multicapa, Cuñetes & Stock",
      icon: Warehouse,
    },
    {
      step: 5,
      title: "5. Servicio, Operación & Calidad",
      subtitle: "Cuadrilla, Cronograma & Garantía",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-xl mb-8 backdrop-blur-md">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[11px] font-bold tracking-wider uppercase text-sky-400">
            FLUJO TRANSVERSAL AUTOMATIZADO
          </span>
          <h2 className="text-base sm:text-lg font-bold text-white">
            Ecosistema de Transformación Digital COLORLINK
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-xs text-slate-400">Progreso del Ecosistema:</span>
          <span className="text-xs font-bold text-sky-400 bg-sky-950/80 px-2.5 py-1 rounded-full border border-sky-800/50">
            Paso {currentStep} de 5
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {steps.map((s) => {
          const Icon = s.icon;
          const isActive = currentStep === s.step;
          const isCompleted = completedSteps.includes(s.step);

          return (
            <button
              key={s.step}
              id={`stepper-btn-step-${s.step}`}
              onClick={() => onStepClick(s.step)}
              className={`relative text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 group ${
                isActive
                  ? "bg-gradient-to-br from-blue-900/60 to-slate-900 border-sky-500 shadow-lg shadow-sky-900/20 ring-1 ring-sky-500/50"
                  : isCompleted
                  ? "bg-slate-800/60 border-slate-700 hover:border-slate-600 text-slate-200"
                  : "bg-slate-900/40 border-slate-800/80 text-slate-400 hover:border-slate-700"
              }`}
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  isActive
                    ? "bg-sky-500 text-white font-bold shadow-md shadow-sky-500/40"
                    : isCompleted
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-slate-800 text-slate-400 group-hover:bg-slate-700"
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 text-emerald-400" /> : <Icon className="w-4 h-4" />}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p
                    className={`text-xs font-bold truncate ${
                      isActive ? "text-white" : isCompleted ? "text-slate-200" : "text-slate-400"
                    }`}
                  >
                    {s.title}
                  </p>
                </div>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">{s.subtitle}</p>
              </div>

              {isActive && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-sky-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
