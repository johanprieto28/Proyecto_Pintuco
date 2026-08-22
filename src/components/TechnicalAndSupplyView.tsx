import React from "react";
import {
  TechnicalSolution,
  CommercialSupply,
  SurfaceAndEnvironment,
  SpaceCondition,
} from "../types";
import { REGIONAL_CENTERS } from "../data/pintucoCatalog";
import {
  Layers,
  Clock,
  Droplet,
  Package,
  Wrench,
  CheckCircle2,
  Warehouse,
  Truck,
  TrendingUp,
  FileSpreadsheet,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  AlertCircle,
} from "lucide-react";

interface TechnicalAndSupplyViewProps {
  technicalSolution: TechnicalSolution;
  commercialSupply: CommercialSupply;
  surface: SurfaceAndEnvironment;
  condition: SpaceCondition;
  onUpdateCommercial: (updated: Partial<CommercialSupply>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const TechnicalAndSupplyView: React.FC<TechnicalAndSupplyViewProps> = ({
  technicalSolution,
  commercialSupply,
  surface,
  condition,
  onUpdateCommercial,
  onNext,
  onPrev,
}) => {
  const formatCOP = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Solución Técnica: Sistema Multicapa */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 font-bold text-xs flex items-center justify-center">
              1
            </span>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-400" />
              Solución Técnica: Sistema de Recubrimiento Multicapa
            </h3>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-900/60 text-blue-300 border border-blue-700/60">
            Área de cálculo: {surface.areaM2} m² (+{technicalSolution.wasteFactorPercentage}% merma técnica)
          </span>
        </div>
        <p className="text-xs text-slate-400 mb-6">
          Estratificación técnica requerida para garantizar adherencia, cubrimiento, impermeabilidad y retención del color {surface.color.name}.
        </p>

        {/* Layer Cards */}
        <div className="space-y-3">
          {technicalSolution.recommendedLayers.map((layer, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 hover:border-slate-600 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  #{layer.stepNumber || idx + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                      {layer.stage}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-700 text-slate-300 font-mono">
                      {layer.hands} {layer.hands === 1 ? "mano" : "manos"}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-0.5">{layer.productName}</h4>
                  <p className="text-xs text-slate-300 mt-1">{layer.purpose}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-slate-900/80 px-4 py-2 rounded-lg border border-slate-800 shrink-0 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" /> Secado
                  </span>
                  <span className="font-bold text-white">{layer.dryingHours} Horas</span>
                </div>
                <div className="h-6 w-px bg-slate-700" />
                <div>
                  <span className="text-[10px] text-slate-400 block flex items-center gap-1">
                    <Droplet className="w-3 h-3 text-sky-400" /> Dilución
                  </span>
                  <span className="font-bold text-white">{layer.dilution}</span>
                </div>
                <div className="h-6 w-px bg-slate-700" />
                <div>
                  <span className="text-[10px] text-slate-400 block">Rendimiento</span>
                  <span className="font-bold text-sky-300">~{layer.theoreticalYieldM2Gal} m²/gal</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Tips */}
        <div className="mt-4 p-4 rounded-xl bg-blue-950/40 border border-blue-800/40">
          <span className="text-[11px] font-bold text-sky-300 uppercase tracking-wide flex items-center gap-1.5 mb-2">
            <AlertCircle className="w-3.5 h-3.5" />
            Recomendaciones Técnicas de Aplicación:
          </span>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
            {technicalSolution.technicalTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-sky-400 font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2. Abastecimiento & Inventario Regional */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center">
              2
            </span>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Warehouse className="w-4 h-4 text-emerald-400" />
              Abastecimiento: Optimización Volumétrica e Inventario
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            <Truck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Despacho Programado: 24h a obra</span>
          </div>
        </div>
        <p className="text-xs text-slate-400 mb-6">
          Desglose automático de pinturas en cuñetes de 5 galones, galones y kit de herramientas profesionales con verificación de stock.
        </p>

        {/* Regional Warehouse Stock Selector */}
        <div className="mb-6 p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Centro de Distribución Regional Asignado:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {REGIONAL_CENTERS.map((rc) => (
              <div
                key={rc.city}
                className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-between"
              >
                <div>
                  <p className="text-xs font-bold text-white">{rc.city}</p>
                  <p className="text-[10px] text-slate-400 truncate">{rc.name}</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Stock {rc.stockLevel}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Materials Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 mb-6">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">SKU / Producto</th>
                <th className="py-3 px-4">Categoría</th>
                <th className="py-3 px-4">Presentación</th>
                <th className="py-3 px-4 text-center">Cant.</th>
                <th className="py-3 px-4 text-right">Precio Unitario</th>
                <th className="py-3 px-4 text-right">Total COP</th>
                <th className="py-3 px-4 text-center">Disponibilidad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {commercialSupply.items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4">
                    <p className="font-bold text-white">{item.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{item.sku}</p>
                  </td>
                  <td className="py-3 px-4 text-slate-300">{item.category}</td>
                  <td className="py-3 px-4 text-slate-300">{item.unit}</td>
                  <td className="py-3 px-4 text-center font-bold text-white">{item.quantity}</td>
                  <td className="py-3 px-4 text-right text-slate-300">{formatCOP(item.unitPriceCOP)}</td>
                  <td className="py-3 px-4 text-right font-bold text-sky-400">{formatCOP(item.totalPriceCOP)}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      {item.stockStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cost Breakdown Card */}
        <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Pinturas & Selladores</span>
            <span className="text-base font-bold text-white">{formatCOP(commercialSupply.totalMaterialsCOP)}</span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Herramientas & Protección</span>
            <span className="text-base font-bold text-white">{formatCOP(commercialSupply.totalToolsCOP)}</span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Mano de Obra Certificada (Est.)</span>
            <span className="text-base font-bold text-white">{formatCOP(commercialSupply.estimatedLaborCOP)}</span>
          </div>

          <div className="bg-blue-900/60 p-3 rounded-lg border border-blue-700/60">
            <span className="text-[10px] uppercase font-bold text-sky-300 block">Total Proyecto COLORLINK</span>
            <span className="text-lg font-black text-white">{formatCOP(commercialSupply.grandTotalCOP)}</span>
            <span className="text-[9px] text-slate-300 block">Incluye IVA y garantía certificada</span>
          </div>
        </div>
      </section>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-2">
        <button
          id="btn-step4-prev"
          type="button"
          onClick={onPrev}
          className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-2 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a Evidencias & Diagnóstico
        </button>

        <button
          id="btn-step4-next"
          type="button"
          onClick={onNext}
          className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/30 flex items-center gap-2 transition cursor-pointer"
        >
          Continuar a Servicio, Operación & Calidad (Paso 5)
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
