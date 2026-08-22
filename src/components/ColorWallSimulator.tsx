import React, { useState } from "react";
import { ColorSelection, FinishType } from "../types";
import { PINTUCO_PALETTES } from "../data/pintucoCatalog";
import {
  Sun,
  Sunset,
  Moon,
  Sparkles,
  Layers,
  Palette,
  Eye,
  Sliders,
  Check,
} from "lucide-react";

interface ColorWallSimulatorProps {
  currentColor: ColorSelection;
  currentFinish: FinishType;
  onApplyColor: (color: ColorSelection, finish: FinishType) => void;
}

export const ColorWallSimulator: React.FC<ColorWallSimulatorProps> = ({
  currentColor,
  currentFinish,
  onApplyColor,
}) => {
  const [selectedColor, setSelectedColor] = useState<ColorSelection>(currentColor);
  const [selectedFinish, setSelectedFinish] = useState<FinishType>(currentFinish);
  const [sceneType, setSceneType] = useState<"living" | "facade" | "office">("living");
  const [lighting, setLighting] = useState<"day" | "warm" | "night">("day");
  const [showComparison, setShowComparison] = useState(false);

  const scenes = [
    {
      id: "living",
      name: "Sala de Estar / Muro Principal",
      subtitle: "Espacio interior residencial",
      bgUrl:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "facade",
      name: "Fachada Exterior Moderna",
      subtitle: "Mampostería y concreto a la vista",
      bgUrl:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "office",
      name: "Oficina Corporativa / Drywall",
      subtitle: "Espacio comercial de alto tráfico",
      bgUrl:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const currentSceneObj = scenes.find((s) => s.id === sceneType) || scenes[0];

  const handleApply = () => {
    onApplyColor(selectedColor, selectedFinish);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
              SIMULADOR DE COLOR & ACABADO
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">
            Visualizador Fotométrico de Color Pintuco
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Previsualice cómo incide la luz ambiental y el nivel de brillo sobre el color seleccionado antes de pintar.
          </p>
        </div>

        <button
          type="button"
          onClick={handleApply}
          className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-sky-500 hover:bg-sky-400 text-white shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 transition"
        >
          <Check className="w-4 h-4" />
          Aplicar este Color al Proyecto
        </button>
      </div>

      {/* Simulator Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Viewport & Canvas */}
        <div className="lg:col-span-2 space-y-4">
          {/* Main Visual Stage */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-700 aspect-video shadow-2xl bg-slate-950">
            {/* Background Architecture */}
            <img
              src={currentSceneObj.bgUrl}
              alt={currentSceneObj.name}
              className="w-full h-full object-cover"
            />

            {/* Tint Overlay simulating Paint */}
            <div
              className={`absolute inset-0 mix-blend-multiply transition-all duration-700 pointer-events-none ${
                showComparison ? "w-1/2 border-r-2 border-white" : "w-full"
              }`}
              style={{
                backgroundColor: selectedColor.hex,
                opacity: selectedFinish === "satinado" ? 0.75 : selectedFinish === "brillante" ? 0.85 : 0.65,
              }}
            />

            {/* Lighting Overlay */}
            <div
              className={`absolute inset-0 pointer-events-none transition-all duration-500 ${
                lighting === "warm"
                  ? "bg-amber-500/20 mix-blend-color-dodge"
                  : lighting === "night"
                  ? "bg-indigo-950/40 mix-blend-multiply"
                  : "bg-transparent"
              }`}
            />

            {/* Texture overlay for textured / matte finishes */}
            {selectedFinish === "texturizado" && (
              <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none" />
            )}

            {/* Badge on stage */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700">
              <div
                className="w-3.5 h-3.5 rounded-full border border-white/50"
                style={{ backgroundColor: selectedColor.hex }}
              />
              <span className="text-xs font-bold text-white">
                {selectedColor.name} ({selectedColor.code})
              </span>
              <span className="text-[10px] text-slate-400">· {selectedFinish}</span>
            </div>

            {/* Comparison Switch Toggle on stage */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowComparison(!showComparison)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-black/70 hover:bg-black/90 text-white backdrop-blur border border-white/20 flex items-center gap-1.5 transition"
              >
                <Sliders className="w-3.5 h-3.5 text-sky-400" />
                {showComparison ? "Ver Completo" : "Comparar Antes / Después"}
              </button>
            </div>
          </div>

          {/* Controls Bar: Scene & Lighting */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
            {/* Scene picker */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">Ambiente:</span>
              <div className="flex gap-1">
                {scenes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSceneType(s.id as any)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                      sceneType === s.id
                        ? "bg-sky-500 text-white font-bold"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {s.name.split("/")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Lighting picker */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">Iluminación:</span>
              <div className="flex gap-1">
                <button
                  onClick={() => setLighting("day")}
                  className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition ${
                    lighting === "day"
                      ? "bg-amber-400 text-slate-950 font-bold"
                      : "bg-slate-800 text-slate-300"
                  }`}
                  title="Luz Natural de Día"
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Día</span>
                </button>
                <button
                  onClick={() => setLighting("warm")}
                  className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition ${
                    lighting === "warm"
                      ? "bg-amber-400 text-slate-950 font-bold"
                      : "bg-slate-800 text-slate-300"
                  }`}
                  title="Luz Cálida Atardecer"
                >
                  <Sunset className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Cálida</span>
                </button>
                <button
                  onClick={() => setLighting("night")}
                  className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition ${
                    lighting === "night"
                      ? "bg-amber-400 text-slate-950 font-bold"
                      : "bg-slate-800 text-slate-300"
                  }`}
                  title="Luz Artificial Noche"
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Noche</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Color Selector & Finish details */}
        <div className="space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Palette className="w-4 h-4 text-sky-400" />
              Catálogo de Colores Pintuco
            </h3>

            <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto pr-1">
              {PINTUCO_PALETTES.map((c) => {
                const isSelected = selectedColor.code === c.code;
                return (
                  <button
                    key={c.code}
                    onClick={() => setSelectedColor(c)}
                    className={`p-2 rounded-xl border text-left flex items-center gap-2 transition ${
                      isSelected
                        ? "bg-slate-800 border-sky-400 ring-2 ring-sky-400"
                        : "bg-slate-800/40 border-slate-700/60 hover:bg-slate-800"
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-lg border border-white/20 shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold text-white truncate">{c.name}</p>
                      <p className="text-[9px] text-slate-400 font-mono">{c.code}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              Nivel de Brillo & Acabado
            </h3>

            <div className="space-y-2">
              {(["mate", "satinado", "brillante", "texturizado", "epoxico"] as FinishType[]).map(
                (f) => (
                  <label
                    key={f}
                    className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition ${
                      selectedFinish === f
                        ? "bg-sky-950/80 border-sky-400 text-white"
                        : "bg-slate-800/40 border-slate-700 text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="simulatorFinish"
                        checked={selectedFinish === f}
                        onChange={() => setSelectedFinish(f)}
                        className="text-sky-500 bg-slate-900 border-slate-600 focus:ring-sky-500"
                      />
                      <span className="text-xs font-bold capitalize">{f}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">
                      {f === "satinado"
                        ? "Lavable alto"
                        : f === "mate"
                        ? "Antirreflejo"
                        : f === "brillante"
                        ? "Esmalte"
                        : f === "texturizado"
                        ? "Rústico"
                        : "Industrial"}
                    </span>
                  </label>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
