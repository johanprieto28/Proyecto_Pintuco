import React from "react";
import {
  ClientIdentification,
  ProjectDetails,
  ChannelOrigin,
  ClientType,
  BuildingType,
} from "../types";
import {
  User,
  Building,
  Calendar,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Store,
  HardHat,
  Globe,
  Headphones,
  CheckCircle,
  FileCheck2,
} from "lucide-react";

interface ClientProjectFormProps {
  client: ClientIdentification;
  project: ProjectDetails;
  channelOrigin: ChannelOrigin;
  hasDataConsent: boolean;
  onUpdateClient: (updated: Partial<ClientIdentification>) => void;
  onUpdateProject: (updated: Partial<ProjectDetails>) => void;
  onUpdateChannel: (channel: ChannelOrigin) => void;
  onUpdateConsent: (consent: boolean) => void;
  onNext: () => void;
}

export const ClientProjectForm: React.FC<ClientProjectFormProps> = ({
  client,
  project,
  channelOrigin,
  hasDataConsent,
  onUpdateClient,
  onUpdateProject,
  onUpdateChannel,
  onUpdateConsent,
  onNext,
}) => {
  const channelOptions: {
    id: ChannelOrigin;
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      id: "whatsapp",
      label: "WhatsApp Oficial Pintuco",
      description: "Captación directa vía chatbot o asesor de ventas digital",
      icon: MessageCircle,
    },
    {
      id: "tienda_pintuco",
      label: "Tienda / Mostrador Pintuco",
      description: "Punto de venta físico propio o franquicia autorizada",
      icon: Store,
    },
    {
      id: "asesor_obra",
      label: "Asesor Técnico en Obra",
      description: "Visita comercial o técnica de campo in situ",
      icon: HardHat,
    },
    {
      id: "portal_web",
      label: "Portal Web / Aliados",
      description: "Formulario web institucional o integraciones B2B",
      icon: Globe,
    },
    {
      id: "call_center",
      label: "Línea de Atención / Call Center",
      description: "Canal telefónico nacional de atención y soporte",
      icon: Headphones,
    },
  ];

  const clientTypeOptions: { id: ClientType; label: string }[] = [
    { id: "hogar", label: "Hogar / Propietario" },
    { id: "contratista", label: "Contratista / Maestro" },
    { id: "inmobiliaria", label: "Inmobiliaria / Constructora" },
    { id: "industrial", label: "Sector Industrial / Institucional" },
  ];

  const buildingTypeOptions: { id: BuildingType; label: string }[] = [
    { id: "residencial_apto", label: "Apartamento Residencial" },
    { id: "residencial_casa", label: "Casa / Villa Unifamiliar" },
    { id: "comercial", label: "Local / Oficinas Comerciales" },
    { id: "industrial_bodega", label: "Bodega / Nave Industrial" },
    { id: "institucional", label: "Colegio / Hospital / Institución" },
  ];

  const colombianCities = [
    "Medellín",
    "Bogotá D.C.",
    "Cali",
    "Barranquilla",
    "Bucaramanga",
    "Cartagena",
    "Pereira",
    "Manizales",
    "Cúcuta",
    "Santa Marta",
    "Ibagué",
    "Villavicencio",
    "Pasto",
    "Envigado / Rionegro",
  ];

  const isFormValid =
    client.fullName.trim() !== "" &&
    client.phone.trim() !== "" &&
    project.projectName.trim() !== "" &&
    project.address.trim() !== "" &&
    hasDataConsent;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Origen del Canal de Captación */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 font-bold text-xs flex items-center justify-center">
            A
          </span>
          <h3 className="text-base font-bold text-white">Canal de Origen de la Solicitud</h3>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Seleccione el punto de contacto por el cual ingresó la necesidad del cliente a COLORLINK.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {channelOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = channelOrigin === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                id={`btn-channel-${opt.id}`}
                onClick={() => onUpdateChannel(opt.id)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? "bg-sky-950/70 border-sky-400 shadow-md shadow-sky-900/30 text-white ring-1 ring-sky-400/50"
                    : "bg-slate-800/40 border-slate-700/60 text-slate-300 hover:border-slate-600 hover:bg-slate-800/70"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${
                    isSelected ? "bg-sky-500 text-white" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <p className="text-xs font-bold truncate">{opt.label}</p>
                <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{opt.description}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Identificación del Cliente (Persona Natural vs Persona Jurídica) */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 font-bold text-xs flex items-center justify-center">
              B
            </span>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-blue-400" />
              Identificación del Solicitante: Persona Natural o Jurídica
            </h3>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
            client.personType === "juridica"
              ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
              : "bg-sky-500/10 text-sky-300 border-sky-500/30"
          }`}>
            {client.personType === "juridica" ? "🏢 Régimen Empresarial (NIT)" : "👤 Persona Natural (Cédula)"}
          </span>
        </div>
        <p className="text-xs text-slate-400 mb-5">
          Seleccione si la cotización, especificación y facturación se emitirá a nombre personal o corporativo.
        </p>

        {/* Person Type Selector Toggle */}
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800">
            <button
              type="button"
              id="btn-person-type-natural"
              onClick={() =>
                onUpdateClient({
                  personType: "natural",
                  documentType: client.documentType === "NIT" ? "CC" : client.documentType,
                  clientType: client.clientType === "inmobiliaria" || client.clientType === "industrial" ? "hogar" : client.clientType,
                })
              }
              className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 transition ${
                client.personType === "natural"
                  ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <User className="w-4 h-4" />
              <div className="text-left">
                <p className="font-bold leading-tight">Persona Natural</p>
                <p className="text-[10px] opacity-75 font-normal">Hogar, Maestro de Obra, Independiente</p>
              </div>
            </button>

            <button
              type="button"
              id="btn-person-type-juridica"
              onClick={() =>
                onUpdateClient({
                  personType: "juridica",
                  documentType: "NIT",
                  clientType: client.clientType === "hogar" ? "inmobiliaria" : client.clientType,
                })
              }
              className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 transition ${
                client.personType === "juridica"
                  ? "bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 text-white shadow-lg shadow-emerald-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Building className="w-4 h-4" />
              <div className="text-left">
                <p className="font-bold leading-tight">Persona Jurídica</p>
                <p className="text-[10px] opacity-75 font-normal">Empresa, Constructora, Inmobiliaria, PH</p>
              </div>
            </button>
          </div>
        </div>

        {/* Client Classification Tags */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            {client.personType === "natural" ? "Categoría o Perfil de Uso:" : "Sector o Giro de la Empresa:"}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(client.personType === "natural"
              ? [
                  { id: "hogar" as ClientType, label: "Hogar / Propietario" },
                  { id: "contratista" as ClientType, label: "Pintor / Maestro" },
                  { id: "inmobiliaria" as ClientType, label: "Profesional Independiente" },
                ]
              : [
                  { id: "inmobiliaria" as ClientType, label: "Constructora / Edificaciones" },
                  { id: "contratista" as ClientType, label: "Inmobiliaria / Mantenimiento PH" },
                  { id: "industrial" as ClientType, label: "Sector Industrial & Plantas" },
                  { id: "empresa" as ClientType, label: "Entidad Comercial / Institucional" },
                ]
            ).map((t) => (
              <button
                key={t.id}
                type="button"
                id={`btn-client-type-${t.id}`}
                onClick={() => onUpdateClient({ clientType: t.id })}
                className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition ${
                  client.clientType === t.id
                    ? client.personType === "juridica"
                      ? "bg-emerald-600 border-emerald-400 text-white shadow"
                      : "bg-blue-600 border-blue-400 text-white shadow"
                    : "bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-700/60"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* FIELDS FOR PERSONA NATURAL */}
        {client.personType === "natural" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeIn">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Nombre Completo del Titular <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  id="input-client-name"
                  type="text"
                  value={client.fullName}
                  onChange={(e) => onUpdateClient({ fullName: e.target.value })}
                  placeholder="Ej: Carlos Andrés Gómez"
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Documento de Identidad <span className="text-rose-400">*</span>
              </label>
              <div className="flex gap-2">
                <select
                  id="select-document-type"
                  value={client.documentType === "NIT" ? "CC" : client.documentType}
                  onChange={(e) =>
                    onUpdateClient({
                      documentType: e.target.value as "CC" | "CE" | "Pasaporte",
                    })
                  }
                  className="w-24 bg-slate-800/80 border border-slate-700 rounded-lg px-2 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="CC">CC</option>
                  <option value="CE">CE</option>
                  <option value="Pasaporte">Pasaporte</option>
                </select>
                <input
                  id="input-document-number"
                  type="text"
                  value={client.documentNumber}
                  onChange={(e) => onUpdateClient({ documentNumber: e.target.value })}
                  placeholder="Número de cédula"
                  className="flex-1 bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Teléfono Celular / WhatsApp <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  id="input-client-phone"
                  type="tel"
                  value={client.phone}
                  onChange={(e) => onUpdateClient({ phone: e.target.value })}
                  placeholder="+57 310 889 4432"
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  id="input-client-email"
                  type="email"
                  value={client.email}
                  onChange={(e) => onUpdateClient({ email: e.target.value })}
                  placeholder="carlos.gomez@ejemplo.com"
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Ciudad / Municipio Principal <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <select
                  id="select-client-city"
                  value={client.city}
                  onChange={(e) => onUpdateClient({ city: e.target.value })}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                >
                  {colombianCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* FIELDS FOR PERSONA JURÍDICA */}
        {client.personType === "juridica" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeIn">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Número de NIT & Dígito Verificación (DV) <span className="text-rose-400">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  id="input-juridical-nit"
                  type="text"
                  value={client.documentNumber}
                  onChange={(e) =>
                    onUpdateClient({
                      documentType: "NIT",
                      documentNumber: e.target.value,
                    })
                  }
                  placeholder="Ej: 900.842.109"
                  className="flex-1 bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <span className="text-slate-500 py-2">-</span>
                <input
                  id="input-juridical-dv"
                  type="text"
                  maxLength={1}
                  value={client.verificationDigit || "4"}
                  onChange={(e) => onUpdateClient({ verificationDigit: e.target.value })}
                  placeholder="DV"
                  className="w-12 text-center bg-slate-800/80 border border-slate-700 rounded-lg px-2 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Razón Social Registrada en RUT / Cámara de Comercio <span className="text-rose-400">*</span>
              </label>
              <input
                id="input-juridical-company"
                type="text"
                value={client.fullName}
                onChange={(e) =>
                  onUpdateClient({
                    fullName: e.target.value,
                    companyName: e.target.value,
                  })
                }
                placeholder="Ej: Constructora & Acabados Bolívar S.A.S."
                className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Representante Legal o Delegado de Compras
              </label>
              <input
                id="input-juridical-rep"
                type="text"
                value={client.legalRepresentative || ""}
                onChange={(e) => onUpdateClient({ legalRepresentative: e.target.value })}
                placeholder="Ej: Mauricio Echeverry"
                className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Correo Facturación Electrónica DIAN <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  id="input-juridical-invoice-email"
                  type="email"
                  value={client.electronicInvoicingEmail || client.email}
                  onChange={(e) =>
                    onUpdateClient({
                      electronicInvoicingEmail: e.target.value,
                      email: e.target.value,
                    })
                  }
                  placeholder="facturacion@constructorabolivar.com"
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Teléfono Corporativo / PBX <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  id="input-juridical-phone"
                  type="tel"
                  value={client.phone}
                  onChange={(e) => onUpdateClient({ phone: e.target.value })}
                  placeholder="+57 601 745 8890"
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Ciudad Sede Principal <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <select
                  id="select-juridical-city"
                  value={client.city}
                  onChange={(e) => onUpdateClient({ city: e.target.value })}
                  className="w-full bg-slate-800/80 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  {colombianCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Régimen Tributario
              </label>
              <select
                id="select-juridical-tax"
                value={client.taxRegime || "gran_contribuyente"}
                onChange={(e) =>
                  onUpdateClient({
                    taxRegime: e.target.value as any,
                  })
                }
                className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="gran_contribuyente">Gran Contribuyente</option>
                <option value="comun">Responsable de IVA (Régimen Común)</option>
                <option value="autoretenedor">Autorretenedor</option>
                <option value="simplificado">No Responsable de IVA</option>
              </select>
            </div>
          </div>
        )}
      </section>

      {/* 3. Identificación del Proyecto */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center">
            C
          </span>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Building className="w-4 h-4 text-amber-400" />
            Identificación del Proyecto & Fechas
          </h3>
        </div>
        <p className="text-xs text-slate-400 mb-6">
          Ubicación física del inmueble y plazos requeridos para la programación operacional.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div className="lg:col-span-2">
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Nombre del Proyecto / Espacio <span className="text-rose-400">*</span>
            </label>
            <input
              id="input-project-name"
              type="text"
              value={project.projectName}
              onChange={(e) => onUpdateProject({ projectName: e.target.value })}
              placeholder="Ej: Pintura de Fachada y Sala Principal Apto 502"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Tipo de Edificación
            </label>
            <select
              id="select-building-type"
              value={project.buildingType}
              onChange={(e) => onUpdateProject({ buildingType: e.target.value as BuildingType })}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
            >
              {buildingTypeOptions.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Dirección Exacta de la Obra <span className="text-rose-400">*</span>
            </label>
            <input
              id="input-project-address"
              type="text"
              value={project.address}
              onChange={(e) => onUpdateProject({ address: e.target.value })}
              placeholder="Ej: Cra 38 # 10A-45"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Barrio / Sector</label>
            <input
              id="input-project-neighborhood"
              type="text"
              value={project.neighborhood}
              onChange={(e) => onUpdateProject({ neighborhood: e.target.value })}
              placeholder="Ej: El Poblado"
              className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Nivel de Urgencia
            </label>
            <select
              id="select-project-urgency"
              value={project.urgencyLevel}
              onChange={(e) =>
                onUpdateProject({ urgencyLevel: e.target.value as "normal" | "alta" | "critica" })
              }
              className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
            >
              <option value="normal">Normal (Plazo estándar 1 a 2 semanas)</option>
              <option value="alta">Alta (Inicio requerido en menos de 5 días)</option>
              <option value="critica">Crítica (Intervención inmediata / 48 horas)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Fecha Estimada de Inicio Requerida
            </label>
            <div className="relative">
              <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                id="input-project-start-date"
                type="date"
                value={project.requiredStartDate}
                onChange={(e) => onUpdateProject({ requiredStartDate: e.target.value })}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Fecha Límite de Entrega Requerida
            </label>
            <div className="relative">
              <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                id="input-project-delivery-date"
                type="date"
                value={project.requiredDeliveryDate}
                onChange={(e) => onUpdateProject({ requiredDeliveryDate: e.target.value })}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Consentimiento de Tratamiento de Datos (Habeas Data) */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center">
            D
          </span>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-emerald-400" />
            Consentimiento y Política de Datos
          </h3>
        </div>

        <label
          htmlFor="checkbox-data-consent"
          className="flex items-start gap-3 p-4 bg-slate-800/50 border border-slate-700/80 rounded-xl cursor-pointer hover:bg-slate-800/80 transition"
        >
          <input
            id="checkbox-data-consent"
            type="checkbox"
            checked={hasDataConsent}
            onChange={(e) => onUpdateConsent(e.target.checked)}
            className="mt-1 w-4 h-4 text-sky-500 bg-slate-900 border-slate-600 rounded focus:ring-sky-500 focus:ring-offset-slate-900"
          />
          <div className="text-xs text-slate-300 leading-relaxed">
            <span className="font-bold text-white">
              Autorización de Tratamiento de Datos Personales (Ley 1581 de 2012 / Habeas Data):
            </span>{" "}
            Autorizo de manera previa, expresa e informada a COLORLINK y Pintuco para recolectar,
            almacenar y utilizar mis datos personales con fines de formulación técnica, cotización
            comercial, despacho logístico y emisión de certificados de garantía.
          </div>
        </label>
      </section>

      {/* Action Next */}
      <div className="flex justify-end pt-2">
        <button
          id="btn-step1-next"
          type="button"
          disabled={!isFormValid}
          onClick={onNext}
          className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition ${
            isFormValid
              ? "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/30 cursor-pointer"
              : "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed"
          }`}
        >
          Continuar a Superficie & Condición (Paso 2)
          <CheckCircle className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
