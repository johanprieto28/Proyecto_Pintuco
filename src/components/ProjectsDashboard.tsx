import React, { useState } from "react";
import { ColorLinkProject } from "../types";
import {
  History,
  Search,
  Filter,
  Eye,
  FileCheck2,
  HardHat,
  MapPin,
  Calendar,
  Layers,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Award,
  Plus,
  User,
  Building2,
} from "lucide-react";

interface ProjectsDashboardProps {
  projects: ColorLinkProject[];
  onSelectProject: (project: ColorLinkProject) => void;
  onNewProject: () => void;
}

export const ProjectsDashboard: React.FC<ProjectsDashboardProps> = ({
  projects,
  onSelectProject,
  onNewProject,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [personTypeFilter, setPersonTypeFilter] = useState<"all" | "natural" | "juridica">("all");

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.client.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.client.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    const matchesPersonType =
      personTypeFilter === "all" ||
      (personTypeFilter === "juridica"
        ? p.client.personType === "juridica" || p.client.documentType === "NIT"
        : p.client.personType === "natural" || p.client.documentType !== "NIT");

    return matchesSearch && matchesStatus && matchesPersonType;
  });

  const totalAreaM2 = projects.reduce((acc, curr) => acc + (curr.surface?.areaM2 || 0), 0);
  const totalValueCOP = projects.reduce(
    (acc, curr) => acc + (curr.commercialSupply?.grandTotalCOP || 0),
    0
  );

  const formatCOP = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <span className="text-[10px] uppercase font-bold text-sky-400 block mb-1">
            Proyectos en Ecosistema
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-white">{projects.length}</span>
            <span className="text-xs text-slate-400">100% Trazabilidad</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">
            Superficie Total Formulada
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-white">{totalAreaM2} m²</span>
            <span className="text-xs text-emerald-300">Con Diagnóstico IA</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <span className="text-[10px] uppercase font-bold text-amber-400 block mb-1">
            Volumen Comercial Cotizado
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-bold text-white truncate">{formatCOP(totalValueCOP)}</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-purple-400 block mb-1">
              Garantía Pintuco
            </span>
            <span className="text-sm font-bold text-white">5 a 10 Años</span>
          </div>
          <button
            onClick={onNewProject}
            className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow transition"
            title="Nuevo Proyecto"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3 shadow-lg">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por cliente, NIT, proyecto, ciudad o tracking..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Persona Natural vs Juridica Filter Toggle */}
          <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
            <button
              onClick={() => setPersonTypeFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                personTypeFilter === "all"
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Todos ({projects.length})
            </button>
            <button
              onClick={() => setPersonTypeFilter("natural")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                personTypeFilter === "natural"
                  ? "bg-sky-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              Pers. Natural
            </button>
            <button
              onClick={() => setPersonTypeFilter("juridica")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                personTypeFilter === "juridica"
                  ? "bg-emerald-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              Pers. Jurídica (NIT)
            </button>
          </div>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-2 border-t border-slate-800/80">
          <span className="text-xs text-slate-400 font-semibold flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Estado:
          </span>
          {["all", "Captación", "Diagnóstico IA", "Abastecido", "En Ejecución", "Certificado"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  statusFilter === status
                    ? "bg-sky-500 text-white font-bold"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {status === "all" ? "Todos" : status}
              </button>
            )
          )}
        </div>
      </div>

      {/* Projects List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProjects.map((proj) => {
          const isJuridical =
            proj.client.personType === "juridica" || proj.client.documentType === "NIT";

          return (
            <div
              key={proj.id}
              onClick={() => onSelectProject(proj)}
              className="bg-slate-900/80 border border-slate-800 hover:border-sky-500/60 rounded-2xl p-5 shadow-lg hover:shadow-sky-950/30 transition cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800/40">
                        {proj.trackingNumber}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(proj.createdAt).toLocaleDateString("es-CO")}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white mt-1 group-hover:text-sky-300 transition">
                      {proj.project.projectName}
                    </h3>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      proj.status === "Certificado"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        : proj.status === "En Ejecución"
                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                        : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    }`}
                  >
                    {proj.status}
                  </span>
                </div>

                {/* Client and Location */}
                <div className="space-y-1.5 text-xs text-slate-300 mb-4 bg-slate-950/40 p-3 rounded-xl border border-slate-800/60">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-white truncate">
                      {proj.client.fullName}
                    </p>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border shrink-0 flex items-center gap-1 ${
                        isJuridical
                          ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                          : "bg-sky-500/10 text-sky-300 border-sky-500/30"
                      }`}
                    >
                      {isJuridical ? (
                        <>
                          <Building2 className="w-3 h-3" />
                          NIT {proj.client.documentNumber}
                        </>
                      ) : (
                        <>
                          <User className="w-3 h-3" />
                          {proj.client.documentType} {proj.client.documentNumber}
                        </>
                      )}
                    </span>
                  </div>

                  <p className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">
                      {proj.project.address}, {proj.client.city}
                    </span>
                  </p>
                </div>

                {/* Surface & Color Preview */}
                <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/60 flex items-center justify-between text-xs mb-4">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-5 h-5 rounded-md border border-white/30 shrink-0"
                      style={{ backgroundColor: proj.surface?.color?.hex || "#fff" }}
                    />
                    <div>
                      <p className="font-bold text-white">{proj.surface?.color?.name}</p>
                      <p className="text-[10px] text-slate-400">
                        {proj.surface?.areaM2} m² · {proj.surface?.finishType}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-sky-300">
                    {formatCOP(proj.commercialSupply?.grandTotalCOP || 0)}
                  </span>
                </div>
              </div>

              {/* Footer action */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  Garantía: {proj.qualityWarranty?.warrantyYears || 5} Años
                </span>
                <span className="text-sky-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition">
                  Ver Solución Completa
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

