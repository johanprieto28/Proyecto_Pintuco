import React, { useState } from "react";
import {
  SurfaceAndEnvironment,
  SpaceCondition,
  SurfaceType,
  EnvironmentType,
  FinishType,
  MoistureSeverity,
  CrackSeverity,
  WearSeverity,
  ColorSelection,
} from "../types";
import {
  PINTUCO_PALETTES,
  SURFACE_LABELS,
  ENVIRONMENT_LABELS,
} from "../data/pintucoCatalog";
import {
  Ruler,
  Droplets,
  AlertTriangle,
  Sparkles,
  Layers,
  CheckCircle,
  HelpCircle,
  Calculator,
  ArrowRight,
  ArrowLeft,
  Flame,
  ShieldAlert,
} from "lucide-react";

interface SurfaceConditionFormProps {
  surface: SurfaceAndEnvironment;
  condition: SpaceCondition;
  onUpdateSurface: (updated: Partial<SurfaceAndEnvironment>) => void;
  onUpdateCondition: (updated: Partial<SpaceCondition>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const SurfaceConditionForm: React.FC<SurfaceConditionFormProps> = ({
  surface,
  condition,
  onUpdateSurface,
  onUpdateCondition,
  onNext,
  onPrev,
}) => {
  const [useDimensionCalc, setUseDimensionCalc] = useState(false);
  const [doorsAndWindowsM2, setDoorsAndWindowsM2] = useState(0);

  const calculateAreaFromDimensions = (length: number, height: number, subtractions: number) => {
    const rawArea = Math.max(0, length * height - subtractions);
    onUpdateSurface({
      lengthM: length,
      heightM: height,
      areaM2: Number(rawArea.toFixed(1)),
    });
  };

  const finishOptions: { id: FinishType; label: string; desc: string }[] = [
    { id: "mate", label: "Mate Antirreflejo", desc: "Disfraza imperfecciones, acabado sobrio y elegante" },
    { id: "satinado", label: "Satinado Seda", desc: "Brillo suave y sedoso, máxima lavabilidad y resistencia" },
    { id: "brillante", label: "Brillante Esmalte", desc: "Alto brillo reflectivo, ideal para maderas y metales" },
    { id: "texturizado", label: "Texturizado / Graniplast", desc: "Acabado rústico decorativo para exteriores" },
    { id: "epoxico", label: "Epóxico Alto Tráfico", desc: "Extrema dureza contra químicos y abrasión mecánica" },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Selección de Superficie y Sustrato */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 font-bold text-xs flex items-center justify-center">
            1
          </span>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-sky-400" />
            Tipo de Superficie y Sustrato
          </h3>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          La naturaleza del sustrato determina la imprimación, penetración y anclaje químico del recubrimiento.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {(Object.keys(SURFACE_LABELS) as SurfaceType[]).map((key) => {
            const item = SURFACE_LABELS[key];
            const isSelected = surface.surfaceType === key;
            return (
              <button
                key={key}
                type="button"
                id={`btn-surface-${key}`}
                onClick={() => onUpdateSurface({ surfaceType: key })}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? "bg-blue-950/70 border-sky-400 shadow-md shadow-sky-900/30 text-white ring-1 ring-sky-400/50"
                    : "bg-slate-800/40 border-slate-700/60 text-slate-300 hover:border-slate-600 hover:bg-slate-800/70"
                }`}
              >
                <p className="text-xs font-bold truncate">{item.label}</p>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{item.desc}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Área y Dimensiones */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold text-xs flex items-center justify-center">
              2
            </span>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Ruler className="w-4 h-4 text-blue-400" />
              Área Total a Recubrir (m²)
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setUseDimensionCalc(!useDimensionCalc)}
            className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-medium"
          >
            <Calculator className="w-3.5 h-3.5" />
            {useDimensionCalc ? "Ingresar m² directamente" : "Calcular con Largo × Alto"}
          </button>
        </div>

        {useDimensionCalc ? (
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/60 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs text-slate-300 mb-1">Largo / Ancho Total (m)</label>
              <input
                id="input-calc-length"
                type="number"
                min="1"
                step="0.5"
                value={surface.lengthM || ""}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  calculateAreaFromDimensions(val, surface.heightM || 2.5, doorsAndWindowsM2);
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                placeholder="Ej: 15"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-300 mb-1">Altura Promedio (m)</label>
              <input
                id="input-calc-height"
                type="number"
                min="1"
                step="0.1"
                value={surface.heightM || ""}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  calculateAreaFromDimensions(surface.lengthM || 10, val, doorsAndWindowsM2);
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                placeholder="Ej: 2.6"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-300 mb-1">Descuento Puertas/Ventanas (m²)</label>
              <input
                id="input-calc-subtraction"
                type="number"
                min="0"
                step="0.5"
                value={doorsAndWindowsM2 || ""}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  setDoorsAndWindowsM2(val);
                  calculateAreaFromDimensions(surface.lengthM || 10, surface.heightM || 2.5, val);
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                placeholder="Ej: 4"
              />
            </div>
          </div>
        ) : null}

        <div className="flex items-center gap-4">
          <div className="w-48">
            <input
              id="input-surface-area"
              type="number"
              min="1"
              max="50000"
              value={surface.areaM2 || ""}
              onChange={(e) => onUpdateSurface({ areaM2: parseFloat(e.target.value) || 0 })}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-4 py-3 text-lg font-bold text-sky-400 focus:outline-none focus:border-sky-400"
              placeholder="50"
            />
          </div>
          <span className="text-sm font-semibold text-slate-300">Metros cuadrados netos (m²)</span>
        </div>
      </section>

      {/* 3. Ambiente de Exposición */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center">
            3
          </span>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            Ambiente y Condiciones de Exposición
          </h3>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Define la severidad ambiental (radiación UV, salinidad, humedad ambiental, químicos).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {(Object.keys(ENVIRONMENT_LABELS) as EnvironmentType[]).map((key) => {
            const item = ENVIRONMENT_LABELS[key];
            const isSelected = surface.environmentType === key;
            return (
              <button
                key={key}
                type="button"
                id={`btn-environment-${key}`}
                onClick={() => onUpdateSurface({ environmentType: key })}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? "bg-amber-950/60 border-amber-400 shadow-md shadow-amber-900/20 text-white ring-1 ring-amber-400/50"
                    : "bg-slate-800/40 border-slate-700/60 text-slate-300 hover:border-slate-600 hover:bg-slate-800/70"
                }`}
              >
                <p className="text-xs font-bold">{item.label}</p>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{item.desc}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. Color Pintuco & Acabado */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 font-bold text-xs flex items-center justify-center">
              4
            </span>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-400" />
              Carta de Color Pintuco & Acabado Deseado
            </h3>
          </div>
          <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            <div
              className="w-4 h-4 rounded-full border border-white/40 shadow-sm"
              style={{ backgroundColor: surface.color.hex }}
            />
            <span className="text-xs font-bold text-white">
              {surface.color.name} ({surface.color.code})
            </span>
          </div>
        </div>

        {/* Color Palette Grid */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Tendencias de Color Pintuco:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {PINTUCO_PALETTES.map((c) => {
              const isSelected = surface.color.code === c.code;
              return (
                <button
                  key={c.code}
                  type="button"
                  id={`btn-color-${c.code}`}
                  onClick={() => onUpdateSurface({ color: c })}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition ${
                    isSelected
                      ? "bg-slate-800 border-sky-400 ring-2 ring-sky-400 shadow-md"
                      : "bg-slate-800/40 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600"
                  }`}
                >
                  <div
                    className="w-7 h-7 rounded-lg border border-white/20 shrink-0 shadow-inner"
                    style={{ backgroundColor: c.hex }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold text-white truncate">{c.name}</p>
                    <p className="text-[9px] text-slate-400 font-mono">{c.code}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Finish Type */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Tipo de Acabado y Brillo:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {finishOptions.map((f) => (
              <button
                key={f.id}
                type="button"
                id={`btn-finish-${f.id}`}
                onClick={() => onUpdateSurface({ finishType: f.id })}
                className={`p-3 rounded-xl border text-left transition ${
                  surface.finishType === f.id
                    ? "bg-sky-950/80 border-sky-400 text-white ring-1 ring-sky-400"
                    : "bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800"
                }`}
              >
                <p className="text-xs font-bold">{f.label}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{f.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Condición del Espacio: Patologías y Desgaste */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 font-bold text-xs flex items-center justify-center">
            5
          </span>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            Condición del Espacio: Patologías, Humedad y Fisuras
          </h3>
        </div>
        <p className="text-xs text-slate-400 mb-6">
          La evaluación rigurosa del estado actual evita el desprendimiento prematuro y garantiza la durabilidad.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          {/* Humedad */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-2 flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-sky-400" />
              Severidad de Humedad:
            </label>
            <div className="space-y-2">
              {[
                { id: "ninguna", label: "Ninguna (Superficie seca)", desc: "<10% humedad relativa" },
                { id: "leve_humedad", label: "Leve Humedad / Vapor", desc: "Manchas ocasionales" },
                { id: "capilaridad", label: "Capilaridad Ascendente", desc: "Sales y humedad en zócalos" },
                { id: "filtracion_activa", label: "Filtración Activa / Goteras", desc: "Paso directo de agua" },
              ].map((item) => (
                <label
                  key={item.id}
                  className={`flex items-start gap-2.5 p-2.5 rounded-lg border cursor-pointer text-xs transition ${
                    condition.moistureSeverity === item.id
                      ? "bg-sky-950/60 border-sky-400 text-white"
                      : "bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <input
                    type="radio"
                    name="moisture"
                    checked={condition.moistureSeverity === item.id}
                    onChange={() =>
                      onUpdateCondition({ moistureSeverity: item.id as MoistureSeverity })
                    }
                    className="mt-0.5 text-sky-500 bg-slate-900 border-slate-600 focus:ring-sky-500"
                  />
                  <div>
                    <p className="font-bold">{item.label}</p>
                    <p className="text-[10px] text-slate-400">{item.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Fisuras */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              Estado de Fisuras y Grietas:
            </label>
            <div className="space-y-2">
              {[
                { id: "ninguna", label: "Superficie Lisa / Sana", desc: "Sin cuarteamientos" },
                { id: "microfisuras", label: "Microfisuras (< 0.5 mm)", desc: "Cuarteamiento superficial" },
                { id: "grietas_medias", label: "Grietas Medias (0.5 - 2 mm)", desc: "Fisuras visibles en pañete" },
                { id: "grietas_estructurales", label: "Grietas Estructurales (> 2 mm)", desc: "Requiere masilla elastomérica" },
              ].map((item) => (
                <label
                  key={item.id}
                  className={`flex items-start gap-2.5 p-2.5 rounded-lg border cursor-pointer text-xs transition ${
                    condition.crackSeverity === item.id
                      ? "bg-amber-950/60 border-amber-400 text-white"
                      : "bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <input
                    type="radio"
                    name="cracks"
                    checked={condition.crackSeverity === item.id}
                    onChange={() =>
                      onUpdateCondition({ crackSeverity: item.id as CrackSeverity })
                    }
                    className="mt-0.5 text-amber-500 bg-slate-900 border-slate-600 focus:ring-amber-500"
                  />
                  <div>
                    <p className="font-bold">{item.label}</p>
                    <p className="text-[10px] text-slate-400">{item.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Desgaste */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              Nivel de Desgaste y Deterioro:
            </label>
            <div className="space-y-2">
              {[
                { id: "optimo", label: "Óptimo / Muro Nuevo", desc: "Superficie virgen o recién estucada" },
                { id: "leve_decoloracion", label: "Leve Decoloración / Suciedad", desc: "Lavado normal requerido" },
                { id: "caleo_desprendimiento", label: "Caleo / Desprendimiento", desc: "Polvillo blanco o pintura soplada" },
                { id: "deterioro_severo", label: "Deterioro Severo / Ampollado", desc: "Requiere raspado mecánico total" },
              ].map((item) => (
                <label
                  key={item.id}
                  className={`flex items-start gap-2.5 p-2.5 rounded-lg border cursor-pointer text-xs transition ${
                    condition.wearSeverity === item.id
                      ? "bg-rose-950/60 border-rose-400 text-white"
                      : "bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <input
                    type="radio"
                    name="wear"
                    checked={condition.wearSeverity === item.id}
                    onChange={() =>
                      onUpdateCondition({ wearSeverity: item.id as WearSeverity })
                    }
                    className="mt-0.5 text-rose-500 bg-slate-900 border-slate-600 focus:ring-rose-500"
                  />
                  <div>
                    <p className="font-bold">{item.label}</p>
                    <p className="text-[10px] text-slate-400">{item.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Patologías especiales Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
          <label className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-xl border border-slate-700/60 cursor-pointer hover:bg-slate-800/70">
            <input
              id="checkbox-has-mold"
              type="checkbox"
              checked={condition.hasMold}
              onChange={(e) => onUpdateCondition({ hasMold: e.target.checked })}
              className="w-4 h-4 text-rose-500 bg-slate-900 border-slate-600 rounded focus:ring-rose-500"
            />
            <div>
              <p className="text-xs font-bold text-white">Presencia de Hongos / Moho / Manchas Verdes</p>
              <p className="text-[10px] text-slate-400">
                Requiere tratamiento biocida fungicida antes de aplicar pintura.
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-xl border border-slate-700/60 cursor-pointer hover:bg-slate-800/70">
            <input
              id="checkbox-high-alkalinity"
              type="checkbox"
              checked={condition.isHighAlkalinity}
              onChange={(e) => onUpdateCondition({ isHighAlkalinity: e.target.checked })}
              className="w-4 h-4 text-amber-500 bg-slate-900 border-slate-600 rounded focus:ring-amber-500"
            />
            <div>
              <p className="text-xs font-bold text-white">Sustrato Alcalino / Concreto Fresco (&lt;28 días)</p>
              <p className="text-[10px] text-slate-400">
                Requiere sellador fijador antialcalino para evitar saponificación.
              </p>
            </div>
          </label>
        </div>
      </section>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-2">
        <button
          id="btn-step2-prev"
          type="button"
          onClick={onPrev}
          className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-2 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a Cliente & Proyecto
        </button>

        <button
          id="btn-step2-next"
          type="button"
          onClick={onNext}
          className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/30 flex items-center gap-2 transition cursor-pointer"
        >
          Continuar a Evidencias & Diagnóstico IA (Paso 3)
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
