import React, { useState } from "react";
import {
  OperationalService,
  QualityAndWarranty,
  ColorLinkProject,
  ClientIdentification,
  ProjectDetails,
  SurfaceAndEnvironment,
  TechnicalSolution,
  CommercialSupply,
} from "../types";
import {
  ShieldCheck,
  HardHat,
  Truck,
  Calendar,
  CheckCircle2,
  FileText,
  Printer,
  Sparkles,
  QrCode,
  Download,
  Clock,
  Award,
  ArrowLeft,
  Share2,
} from "lucide-react";
import confetti from "canvas-confetti";

interface OperationalAndQualityViewProps {
  operationalService: OperationalService;
  qualityWarranty: QualityAndWarranty;
  client: ClientIdentification;
  project: ProjectDetails;
  surface: SurfaceAndEnvironment;
  technicalSolution: TechnicalSolution;
  commercialSupply: CommercialSupply;
  onUpdateOperational: (updated: Partial<OperationalService>) => void;
  onUpdateQuality: (updated: Partial<QualityAndWarranty>) => void;
  onSaveAndCertify: () => void;
  onPrev: () => void;
}

export const OperationalAndQualityView: React.FC<OperationalAndQualityViewProps> = ({
  operationalService,
  qualityWarranty,
  client,
  project,
  surface,
  technicalSolution,
  commercialSupply,
  onUpdateOperational,
  onUpdateQuality,
  onSaveAndCertify,
  onPrev,
}) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleFinish = () => {
    setIsSaved(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    onSaveAndCertify();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Servicio y Operación */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold text-xs flex items-center justify-center">
              1
            </span>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HardHat className="w-4 h-4 text-blue-400" />
              Operación y Programación de Cuadrilla
            </h3>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              id="btn-service-crew"
              onClick={() => onUpdateOperational({ serviceMode: "cuadrilla_certificada" })}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                operationalService.serviceMode === "cuadrilla_certificada"
                  ? "bg-blue-600 text-white shadow"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              Cuadrilla Certificada Pintuco
            </button>
            <button
              type="button"
              id="btn-service-diy"
              onClick={() => onUpdateOperational({ serviceMode: "auto_aplicacion" })}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                operationalService.serviceMode === "auto_aplicacion"
                  ? "bg-blue-600 text-white shadow"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              Auto-aplicación (DIY)
            </button>
          </div>
        </div>

        {/* Assigned Crew Card */}
        {operationalService.serviceMode === "cuadrilla_certificada" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 rounded-xl bg-slate-800/60 border border-slate-700">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Cuadrilla Asignada</span>
              <p className="text-xs font-bold text-white mt-0.5">{operationalService.assignedCrewName}</p>
              <p className="text-[11px] text-sky-400">{operationalService.crewLeader}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Capacidad Operativa</span>
              <p className="text-xs font-bold text-white mt-0.5">
                {operationalService.crewMembersCount} Pintores Profesionales
              </p>
              <p className="text-[11px] text-slate-400">Dotación y EPP certificados</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Despacho y Trazabilidad</span>
              <p className="text-xs font-mono font-bold text-emerald-400 mt-0.5">
                {operationalService.dispatchTrackingCode}
              </p>
              <p className="text-[11px] text-slate-400">Estado: {operationalService.logisticsStatus}</p>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/40 text-xs text-amber-200 mb-6">
            <span className="font-bold">Modalidad Auto-aplicación seleccionada:</span> Se suministra el kit de materiales, herramientas y la guía técnica paso a paso para aplicación directa por el cliente o su personal.
          </div>
        )}

        {/* Multi-day Execution Roadmap */}
        <div>
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wide block mb-3">
            Cronograma Operacional de Ejecución ({operationalService.executionDays} días hábiles):
          </span>
          <div className="space-y-3">
            {operationalService.dailyTimeline.map((item) => (
              <div
                key={item.day}
                className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col md:flex-row md:items-start gap-4"
              >
                <div className="w-16 h-16 rounded-xl bg-blue-950/80 border border-blue-800/80 flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] text-sky-400 uppercase font-bold">DÍA</span>
                  <span className="text-xl font-black text-white">{item.day}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-xs sm:text-sm font-bold text-white">{item.phase}</h4>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {item.estimatedHours} horas estimadas
                    </span>
                  </div>
                  <ul className="space-y-1 mb-2">
                    {item.tasks.map((task, tidx) => (
                      <li key={tidx} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-sky-400 font-bold">•</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                  {item.safetyNote && (
                    <div className="text-[10px] text-amber-300 bg-amber-950/40 px-2.5 py-1 rounded border border-amber-800/40 inline-block">
                      Seguridad: {item.safetyNote}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Calidad & Certificado de Garantía */}
      <section
        id="printable-warranty-certificate"
        className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-sky-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
      >
        {/* Certificate Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase">
                PINTUCO & COLORLINK CERTIFIED
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white">
                Certificado Oficial de Garantía y Ficha Técnica
              </h3>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] text-slate-400 block font-mono">No. Certificado</span>
            <span className="text-sm font-bold font-mono text-sky-400">{qualityWarranty.certificateNumber}</span>
          </div>
        </div>

        {/* Certificate Body */}
        <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Proyecto & Inmueble</span>
              <p className="text-xs font-bold text-white">{project.projectName}</p>
              <p className="text-[11px] text-slate-300">{project.address} ({client.city})</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">
                {client.personType === "juridica" ? "Empresa / Razón Social" : "Titular del Proyecto"}
              </span>
              <p className="text-xs font-bold text-white">{client.fullName}</p>
              <p className="text-[11px] text-slate-400">
                {client.personType === "juridica"
                  ? `NIT: ${client.documentNumber}${client.verificationDigit ? `-${client.verificationDigit}` : ""} · Régimen: ${client.taxRegime || "Común"}`
                  : `${client.documentType}: ${client.documentNumber}`}
              </p>
              {client.personType === "juridica" && client.legalRepresentative && (
                <p className="text-[10px] text-slate-400">
                  Rep. Legal: {client.legalRepresentative}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Sistema y Color Aplicado</span>
              <p className="text-xs font-bold text-sky-300">
                {surface.color.name} ({surface.color.code})
              </p>
              <p className="text-[11px] text-slate-300">
                Acabado {surface.finishType} en {surface.areaM2} m²
              </p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Periodo de Garantía</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 mt-1">
                <ShieldCheck className="w-4 h-4" />
                {qualityWarranty.warrantyYears} AÑOS DE GARANTÍA DIRECTA
              </span>
            </div>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                Validación Técnica
              </span>
              <p className="text-[11px] text-slate-300 leading-tight">
                Emitido bajo los estándares de laboratorio y calidad de Pintuco Colombia.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-slate-700/60 mt-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1">
                <QrCode className="w-8 h-8 text-slate-900" />
              </div>
              <div className="text-[10px] text-slate-400">
                <p className="font-bold text-white">Escaneo QR de Validez</p>
                <p>Verificación en línea</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Inspection Checklist */}
        <div className="pt-4 border-t border-slate-800">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wide block mb-3">
            Checklist de Inspección de Entrega y Control de Calidad:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {qualityWarranty.inspectionChecklist.map((chk) => (
              <div
                key={chk.id}
                className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700 flex items-center justify-between"
              >
                <div className="min-w-0 flex-1 pr-2">
                  <span className="text-[10px] font-bold text-sky-400 block">{chk.category}</span>
                  <p className="text-xs text-slate-200 truncate">{chk.criterion}</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {chk.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          id="btn-step5-prev"
          type="button"
          onClick={onPrev}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center justify-center gap-2 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a Solución Técnica
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            id="btn-print-certificate"
            type="button"
            onClick={handlePrint}
            className="flex-1 sm:flex-initial px-4 py-3 rounded-xl text-xs sm:text-sm font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 transition"
          >
            <Printer className="w-4 h-4 text-sky-400" />
            Imprimir / Ficha PDF
          </button>

          <button
            id="btn-complete-project"
            type="button"
            onClick={handleFinish}
            className="flex-1 sm:flex-initial px-6 py-3 rounded-xl text-xs sm:text-sm font-black bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-600 hover:from-emerald-400 hover:to-teal-400 text-white shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            {isSaved ? "Proyecto Guardado en COLORLINK" : "Finalizar & Emitir Solución Completa"}
          </button>
        </div>
      </div>
    </div>
  );
};
