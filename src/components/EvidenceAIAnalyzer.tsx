import React, { useState } from "react";
import {
  EvidencesAndConsent,
  EvidenceItem,
  TechnicalSolution,
  SurfaceAndEnvironment,
  SpaceCondition,
} from "../types";
import {
  Camera,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowRight,
  ArrowLeft,
  Image as ImageIcon,
  Trash2,
  RefreshCw,
  Eye,
  ShieldCheck,
} from "lucide-react";

interface EvidenceAIAnalyzerProps {
  evidences: EvidencesAndConsent;
  surface: SurfaceAndEnvironment;
  condition: SpaceCondition;
  technicalSolution: TechnicalSolution;
  onUpdateEvidences: (updated: Partial<EvidencesAndConsent>) => void;
  onUpdateTechnicalSolution: (solution: TechnicalSolution) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const EvidenceAIAnalyzer: React.FC<EvidenceAIAnalyzerProps> = ({
  evidences,
  surface,
  condition,
  technicalSolution,
  onUpdateEvidences,
  onUpdateTechnicalSolution,
  onNext,
  onPrev,
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(
    evidences.evidences[0]?.url || null
  );

  const sampleEvidencePhotos = [
    {
      title: "Muro con Humedad y Desprendimiento",
      url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      caption: "Mampostería exterior con manchas de humedad y salitre en la base",
    },
    {
      title: "Pared Interior con Microfisuras",
      url: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
      caption: "Superficie de estuco interior con cuarteamiento y decoloración solar",
    },
    {
      title: "Drywall en Remodelación",
      url: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80",
      caption: "Panel de yeso nuevo con juntas encintadas listo para imprimar",
    },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result as string;
      const newEvidence: EvidenceItem = {
        id: `ev-${Date.now()}`,
        url: base64,
        base64: base64,
        caption: file.name || "Foto de evidencia subida por el usuario",
        timestamp: new Date().toISOString(),
      };

      onUpdateEvidences({
        evidences: [newEvidence, ...evidences.evidences],
      });
      setPreviewImage(base64);
    };

    reader.readAsDataURL(file);
  };

  const handleSelectSample = (sample: { title: string; url: string; caption: string }) => {
    const newEvidence: EvidenceItem = {
      id: `ev-${Date.now()}`,
      url: sample.url,
      caption: sample.caption,
      timestamp: new Date().toISOString(),
    };
    onUpdateEvidences({
      evidences: [newEvidence, ...evidences.evidences],
    });
    setPreviewImage(sample.url);
  };

  const handleRemoveEvidence = (id: string) => {
    const filtered = evidences.evidences.filter((e) => e.id !== id);
    onUpdateEvidences({ evidences: filtered });
    if (previewImage === evidences.evidences.find((e) => e.id === id)?.url) {
      setPreviewImage(filtered[0]?.url || null);
    }
  };

  const runGeminiDiagnosis = async () => {
    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      const activeEvidence = evidences.evidences[0];
      const payload = {
        surfaceType: surface.surfaceType,
        areaM2: surface.areaM2,
        environment: surface.environmentType,
        moisture: condition.moistureSeverity,
        cracks: condition.crackSeverity,
        wear: condition.wearSeverity,
        mold: condition.hasMold,
        alkalinity: condition.isHighAlkalinity,
        notes: evidences.detailedDescription || condition.notes,
        imageBase64: activeEvidence?.base64 || undefined,
      };

      const res = await fetch("/api/ai/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.diagnosis) {
        const diag = data.diagnosis;
        // Merge layers into complete technical structure
        const formattedLayers = (diag.recommendedLayers || []).map((l: any, idx: number) => ({
          stepNumber: l.stepNumber || idx + 1,
          stage: l.stage || `Capa ${idx + 1}`,
          productName: l.productName || "Pintura de Acabado Pintuco",
          productType: l.purpose || "Recubrimiento especializado",
          purpose: l.purpose || "Protección y color",
          hands: l.hands || 2,
          dryingHours: l.dryingHours || 4,
          dilution: l.dilution || "10-15% agua",
          theoreticalYieldM2Gal: 35,
        }));

        onUpdateTechnicalSolution({
          ...technicalSolution,
          diagnosticSummary: diag.diagnosticSummary || technicalSolution.diagnosticSummary,
          detectedIssues: diag.detectedIssues || technicalSolution.detectedIssues,
          severityLevel: diag.severityLevel || technicalSolution.severityLevel,
          surfacePreparation: diag.surfacePreparation || technicalSolution.surfacePreparation,
          recommendedLayers: formattedLayers.length > 0 ? formattedLayers : technicalSolution.recommendedLayers,
          technicalTips: diag.technicalTips || technicalSolution.technicalTips,
          warrantyYears: diag.warrantyRecommendationYears || technicalSolution.warrantyYears,
        });
      }
    } catch (err: any) {
      console.error(err);
      setAnalysisError("Hubo una intermitencia al procesar la imagen con Gemini. Se aplicó el diagnóstico técnico asistido estándar.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Evidencias Fotográficas */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 font-bold text-xs flex items-center justify-center">
              1
            </span>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Camera className="w-4 h-4 text-sky-400" />
              Evidencias Fotográficas del Estado Actual
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            {evidences.evidences.length} foto(s) registrada(s)
          </span>
        </div>
        <p className="text-xs text-slate-400 mb-6">
          Adjunte fotografías de la pared, esquinas críticas o detalles de fisuras/humedad para que el modelo de visión por computadora evalúe la patología.
        </p>

        {/* Upload Zone & Samples */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <label
              htmlFor="evidence-file-input"
              className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-700 hover:border-sky-500 rounded-2xl bg-slate-800/30 hover:bg-slate-800/60 transition cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-3 group-hover:scale-110 transition">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-white text-center">
                Subir foto desde el dispositivo / cámara
              </p>
              <p className="text-[11px] text-slate-400 mt-1 text-center">
                Formatos JPG, PNG, WEBP (Hasta 10MB)
              </p>
              <input
                id="evidence-file-input"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {/* Predefined Test Samples */}
            <div className="mt-4">
              <p className="text-xs font-semibold text-slate-400 mb-2">O seleccione un caso de prueba rápido:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {sampleEvidencePhotos.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSample(s)}
                    className="p-2 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-left flex items-center gap-2.5 transition"
                  >
                    <img
                      src={s.url}
                      alt={s.title}
                      className="w-10 h-10 rounded-lg object-cover border border-slate-700"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-bold text-white truncate">{s.title}</p>
                      <p className="text-[9px] text-sky-400">Usar muestra</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Preview */}
          <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/80 flex flex-col items-center justify-center">
            {previewImage ? (
              <div className="w-full">
                <div className="relative rounded-xl overflow-hidden border border-slate-700 aspect-video mb-3">
                  <img
                    src={previewImage}
                    alt="Evidencia seleccionada"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/70 text-[10px] font-bold text-white backdrop-blur">
                    Evidencia Activa
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 line-clamp-2">
                  {evidences.evidences[0]?.caption || "Foto lista para análisis por Gemini"}
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                <ImageIcon className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                <p className="text-xs text-slate-400">Sin foto seleccionada aún</p>
              </div>
            )}
          </div>
        </div>

        {/* Evidences list thumbnails */}
        {evidences.evidences.length > 0 && (
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {evidences.evidences.map((item) => (
              <div
                key={item.id}
                className={`relative shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 cursor-pointer transition ${
                  previewImage === item.url ? "border-sky-400 ring-2 ring-sky-400/40" : "border-slate-700"
                }`}
                onClick={() => setPreviewImage(item.url)}
              >
                <img src={item.url} alt={item.caption} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveEvidence(item.id);
                  }}
                  className="absolute top-1 right-1 p-1 bg-black/70 hover:bg-rose-600 text-white rounded-md transition"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Detailed Client Description */}
        <div className="mt-6">
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Descripción Detallada de la Necesidad / Observaciones Técnicas:
          </label>
          <textarea
            id="textarea-evidence-description"
            rows={3}
            value={evidences.detailedDescription}
            onChange={(e) => onUpdateEvidences({ detailedDescription: e.target.value })}
            placeholder="Describa si hay goteras previas, si el muro estuvo expuesto a lluvia, qué tipo de acabado espera el cliente, etc."
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>
      </section>

      {/* Botón de Disparo IA y Resultados */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900 border border-sky-500/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-sky-500/20 text-sky-300 border border-sky-400/40">
                GEMINI VISION 3.7 + ALGORITMO PINTUCO
              </span>
            </div>
            <h3 className="text-lg font-black text-white mt-1">
              Diagnóstico Patológico y Formulación Técnica Automatizada
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Escanea la superficie, clasifica la gravedad de humedad/fisuras y genera la preparación exacta.
            </p>
          </div>

          <button
            id="btn-run-ai-diagnosis"
            type="button"
            disabled={isAnalyzing}
            onClick={runGeminiDiagnosis}
            className="px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 hover:from-sky-300 hover:to-blue-400 text-white shadow-lg shadow-sky-500/30 flex items-center gap-2 transition cursor-pointer shrink-0 disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                Analizando Patología...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                Diagnosticar con IA Gemini
              </>
            )}
          </button>
        </div>

        {analysisError && (
          <div className="mb-4 p-3 bg-amber-950/60 border border-amber-500/50 rounded-xl text-xs text-amber-200 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{analysisError}</span>
          </div>
        )}

        {/* AI Output Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
          {/* Summary & Severity Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                DICTAMEN TÉCNICO
              </span>
              <p className="text-xs sm:text-sm font-medium text-slate-200 mt-0.5 leading-relaxed">
                {technicalSolution.diagnosticSummary}
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <span className="text-xs text-slate-400">Nivel de Severidad:</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  technicalSolution.severityLevel === "Crítica"
                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                    : technicalSolution.severityLevel === "Alta"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                }`}
              >
                {technicalSolution.severityLevel}
              </span>
            </div>
          </div>

          {/* Issues Detected */}
          <div>
            <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wide block mb-2">
              Factores Críticos Identificados:
            </span>
            <div className="flex flex-wrap gap-2">
              {technicalSolution.detectedIssues.map((issue, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 text-slate-200 border border-slate-700 flex items-center gap-1.5"
                >
                  <AlertTriangle className="w-3 h-3 text-amber-400" />
                  {issue}
                </span>
              ))}
            </div>
          </div>

          {/* Protocolo de Preparación */}
          <div>
            <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wide block mb-2">
              Protocolo Obligatorio de Preparación de Superficie:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {technicalSolution.surfacePreparation.map((prep, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs text-slate-300 flex items-start gap-2.5"
                >
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-sky-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{prep}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-2">
        <button
          id="btn-step3-prev"
          type="button"
          onClick={onPrev}
          className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-2 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a Superficie & Condición
        </button>

        <button
          id="btn-step3-next"
          type="button"
          onClick={onNext}
          className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/30 flex items-center gap-2 transition cursor-pointer"
        >
          Continuar a Solución Técnica & Abastecimiento (Paso 4)
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
