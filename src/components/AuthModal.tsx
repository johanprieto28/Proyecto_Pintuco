import React, { useState } from "react";
import {
  UserProfile,
  NaturalPersonProfile,
  JuridicalPersonProfile,
  PersonType,
} from "../types";
import {
  X,
  User,
  Building2,
  Lock,
  Mail,
  Phone,
  MapPin,
  FileText,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Briefcase,
  Layers,
  Sparkles,
  Info,
} from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
}) => {
  const [authMode, setAuthMode] = useState<"login" | "register">("register");
  const [personType, setPersonType] = useState<PersonType>("natural");

  // Natural Person Form State
  const [naturalForm, setNaturalForm] = useState<NaturalPersonProfile>({
    personType: "natural",
    documentType: "CC",
    documentNumber: "1020485991",
    firstName: "Carlos Andrés",
    lastName: "Gómez Montoya",
    fullName: "Carlos Andrés Gómez Montoya",
    email: "carlos.gomez@gmail.com",
    phone: "+57 310 889 4432",
    city: "Medellín",
    address: "Calle 10 sur # 34-120, El Poblado",
    occupation: "Propietario Residencial",
    clientCategory: "hogar",
  });

  // Juridical Person Form State
  const [juridicalForm, setJuridicalForm] = useState<JuridicalPersonProfile>({
    personType: "juridica",
    nit: "900.842.109",
    verificationDigit: "4",
    companyName: "Constructora & Acabados Bolívar S.A.S.",
    tradeName: "Bolívar Construcciones",
    legalRepresentative: "Arq. Mauricio Echeverry Zuluaga",
    legalRepDocType: "CC",
    legalRepDocNumber: "71392810",
    taxRegime: "gran_contribuyente",
    economicActivityCIIU: "4111 - Construcción de edificios residenciales",
    electronicInvoicingEmail: "facturacion@constructorabolivar.com.co",
    phone: "+57 (601) 745 8890",
    city: "Bogotá D.C.",
    mainAddress: "Av. Carrera 45 # 108-27, Torre Empresarial Of. 602",
    businessType: "constructora",
  });

  // Quick Demo Accounts
  const demoAccounts = [
    {
      label: "Persona Natural (Hogar / Propietario)",
      subtitle: "Carlos Gómez · CC 1.020.485.991 · Medellín",
      type: "natural" as PersonType,
      data: {
        personType: "natural" as const,
        documentType: "CC" as const,
        documentNumber: "1020485991",
        firstName: "Carlos Andrés",
        lastName: "Gómez Montoya",
        fullName: "Carlos Andrés Gómez Montoya",
        email: "carlos.gomez@gmail.com",
        phone: "+57 310 889 4432",
        city: "Medellín",
        address: "Calle 10 sur # 34-120",
        occupation: "Ingeniero & Propietario",
        clientCategory: "hogar" as const,
      },
    },
    {
      label: "Persona Jurídica (Constructora & Obras)",
      subtitle: "Constructora Bolívar SAS · NIT 900.842.109-4 · Bogotá",
      type: "juridica" as PersonType,
      data: {
        personType: "juridica" as const,
        nit: "900.842.109",
        verificationDigit: "4",
        companyName: "Constructora & Acabados Bolívar S.A.S.",
        tradeName: "Bolívar Proyectos",
        legalRepresentative: "Mauricio Echeverry",
        legalRepDocType: "CC" as const,
        legalRepDocNumber: "71392810",
        taxRegime: "gran_contribuyente" as const,
        economicActivityCIIU: "4111",
        electronicInvoicingEmail: "facturacion@constructorabolivar.com.co",
        phone: "+57 (601) 745 8890",
        city: "Bogotá D.C.",
        mainAddress: "Av. Carrera 45 # 108-27, Of. 602",
        businessType: "constructora" as const,
      },
    },
    {
      label: "Persona Jurídica (Inmobiliaria & PH)",
      subtitle: "Inmobiliaria Andina del Valle · NIT 890.301.245-8 · Cali",
      type: "juridica" as PersonType,
      data: {
        personType: "juridica" as const,
        nit: "890.301.245",
        verificationDigit: "8",
        companyName: "Inmobiliaria & Mantenimiento Andina del Valle S.A.S.",
        tradeName: "Andina Inmobiliaria",
        legalRepresentative: "Dra. Marcela Restrepo",
        legalRepDocType: "CC" as const,
        legalRepDocNumber: "32984120",
        taxRegime: "comun" as const,
        economicActivityCIIU: "6810",
        electronicInvoicingEmail: "cuentas@inmobiliariaandina.com",
        phone: "+57 (602) 554 1120",
        city: "Cali",
        mainAddress: "Calle 18 Norte # 6N-34",
        businessType: "inmobiliaria" as const,
      },
    },
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
    "Envigado / Rionegro",
  ];

  if (!isOpen) return null;

  const handleRegisterNatural = (e: React.FormEvent) => {
    e.preventDefault();
    const profile: NaturalPersonProfile = {
      ...naturalForm,
      fullName: `${naturalForm.firstName.trim()} ${naturalForm.lastName.trim()}`.trim(),
    };
    onLogin(profile);
    onClose();
  };

  const handleRegisterJuridical = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(juridicalForm);
    onClose();
  };

  const handleSelectDemo = (demo: any) => {
    onLogin(demo.data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden my-8">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/25">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">
                  Portal de Acceso y Registro COLORLINK
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-400/40">
                  Pintuco ID
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Seleccione si opera como Persona Natural o Persona Jurídica (Empresa/NIT)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Session Banner (if logged in) */}
        {currentUser && (
          <div className="p-4 bg-slate-800/80 border-b border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                {currentUser.personType === "natural" ? (
                  <User className="w-5 h-5" />
                ) : (
                  <Building2 className="w-5 h-5" />
                )}
              </div>
              <div>
                <p className="text-xs font-bold text-white">
                  Sesión activa:{" "}
                  {currentUser.personType === "natural"
                    ? currentUser.fullName
                    : currentUser.companyName}
                </p>
                <p className="text-[11px] text-slate-400">
                  {currentUser.personType === "natural"
                    ? `Persona Natural · ${currentUser.documentType}: ${currentUser.documentNumber}`
                    : `Persona Jurídica · NIT: ${currentUser.nit}-${currentUser.verificationDigit} · Régimen: ${currentUser.taxRegime}`}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 transition shrink-0"
            >
              Cerrar Sesión Actual
            </button>
          </div>
        )}

        {/* Quick Demo Access Bar */}
        <div className="p-4 bg-slate-950/60 border-b border-slate-800">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wide">
              Acceso Rápido / Cuentas Preconfiguradas:
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {demoAccounts.map((demo, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectDemo(demo)}
                className="p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 hover:border-sky-500 text-left transition flex items-center gap-2.5 group"
              >
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                  {demo.type === "natural" ? <User className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-bold text-white truncate group-hover:text-sky-300">
                    {demo.label}
                  </p>
                  <p className="text-[9px] text-slate-400 truncate">{demo.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Switcher: Persona Natural VS Persona Jurídica */}
        <div className="p-6">
          <div className="mb-6">
            <span className="text-xs font-bold text-slate-300 block mb-2">
              Seleccione la Modalidad de Registro o Facturación:
            </span>
            <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-950 rounded-2xl border border-slate-800">
              <button
                type="button"
                onClick={() => setPersonType("natural")}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 transition ${
                  personType === "natural"
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <User className="w-4 h-4" />
                <span>Persona Natural</span>
                <span className="hidden sm:inline text-[10px] opacity-80">(Cédula / Hogar)</span>
              </button>

              <button
                type="button"
                onClick={() => setPersonType("juridica")}
                className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 transition ${
                  personType === "juridica"
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Persona Jurídica</span>
                <span className="hidden sm:inline text-[10px] opacity-80">(Empresa / NIT)</span>
              </button>
            </div>
          </div>

          {/* FORM 1: PERSONA NATURAL */}
          {personType === "natural" && (
            <form onSubmit={handleRegisterNatural} className="space-y-4 animate-fadeIn">
              <div className="p-3 bg-blue-950/40 border border-blue-800/50 rounded-xl text-xs text-blue-200 flex items-center gap-2">
                <Info className="w-4 h-4 text-sky-400 shrink-0" />
                <span>
                  Registro para propietarios de viviendas, pintores independientes, maestros de obra o contratistas unipersonales.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Tipo y Número de Documento <span className="text-rose-400">*</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={naturalForm.documentType}
                      onChange={(e) =>
                        setNaturalForm({
                          ...naturalForm,
                          documentType: e.target.value as "CC" | "CE" | "Pasaporte",
                        })
                      }
                      className="w-24 bg-slate-800 border border-slate-700 rounded-xl px-2 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                    >
                      <option value="CC">CC</option>
                      <option value="CE">CE</option>
                      <option value="Pasaporte">Pasap.</option>
                    </select>
                    <input
                      type="text"
                      required
                      value={naturalForm.documentNumber}
                      onChange={(e) =>
                        setNaturalForm({ ...naturalForm, documentNumber: e.target.value })
                      }
                      placeholder="Número de cédula"
                      className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Nombres Completos <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={naturalForm.firstName}
                    onChange={(e) => setNaturalForm({ ...naturalForm, firstName: e.target.value })}
                    placeholder="Ej: Carlos Andrés"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Apellidos Completos <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={naturalForm.lastName}
                    onChange={(e) => setNaturalForm({ ...naturalForm, lastName: e.target.value })}
                    placeholder="Ej: Gómez Montoya"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Correo Electrónico <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      value={naturalForm.email}
                      onChange={(e) => setNaturalForm({ ...naturalForm, email: e.target.value })}
                      placeholder="usuario@ejemplo.com"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
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
                      type="tel"
                      required
                      value={naturalForm.phone}
                      onChange={(e) => setNaturalForm({ ...naturalForm, phone: e.target.value })}
                      placeholder="+57 310 000 0000"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Ciudad de Residencia <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <select
                      value={naturalForm.city}
                      onChange={(e) => setNaturalForm({ ...naturalForm, city: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                    >
                      {colombianCities.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Categoría de Usuario
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: "hogar", label: "Hogar / Propietario" },
                      { id: "contratista", label: "Contratista" },
                      { id: "independiente", label: "Pintor / Maestro" },
                      { id: "profesional", label: "Arquitecto / Diseñador" },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() =>
                          setNaturalForm({ ...naturalForm, clientCategory: cat.id as any })
                        }
                        className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition ${
                          naturalForm.clientCategory === cat.id
                            ? "bg-sky-600 border-sky-400 text-white shadow"
                            : "bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/30 flex items-center gap-2 transition cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Guardar Perfil & Acceder como Persona Natural
                </button>
              </div>
            </form>
          )}

          {/* FORM 2: PERSONA JURÍDICA */}
          {personType === "juridica" && (
            <form onSubmit={handleRegisterJuridical} className="space-y-4 animate-fadeIn">
              <div className="p-3 bg-emerald-950/40 border border-emerald-800/50 rounded-xl text-xs text-emerald-200 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Registro empresarial con validación de NIT, facturación electrónica DIAN y asignación de tarifas B2B / Constructoras.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    NIT de la Empresa <span className="text-rose-400">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={juridicalForm.nit}
                      onChange={(e) =>
                        setJuridicalForm({ ...juridicalForm, nit: e.target.value })
                      }
                      placeholder="Ej: 900.842.109"
                      className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                    />
                    <span className="text-slate-500 py-2">-</span>
                    <input
                      type="text"
                      required
                      maxLength={1}
                      value={juridicalForm.verificationDigit}
                      onChange={(e) =>
                        setJuridicalForm({
                          ...juridicalForm,
                          verificationDigit: e.target.value,
                        })
                      }
                      placeholder="DV"
                      className="w-12 text-center bg-slate-800 border border-slate-700 rounded-xl px-2 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Razón Social Registrada en RUT / Cámara <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={juridicalForm.companyName}
                    onChange={(e) =>
                      setJuridicalForm({ ...juridicalForm, companyName: e.target.value })
                    }
                    placeholder="Ej: Constructora & Acabados Bolívar S.A.S."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Nombre Comercial (Opcional)
                  </label>
                  <input
                    type="text"
                    value={juridicalForm.tradeName || ""}
                    onChange={(e) =>
                      setJuridicalForm({ ...juridicalForm, tradeName: e.target.value })
                    }
                    placeholder="Ej: Bolívar Proyectos"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Representante Legal <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={juridicalForm.legalRepresentative}
                    onChange={(e) =>
                      setJuridicalForm({
                        ...juridicalForm,
                        legalRepresentative: e.target.value,
                      })
                    }
                    placeholder="Ej: Mauricio Echeverry"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Régimen Tributario
                  </label>
                  <select
                    value={juridicalForm.taxRegime}
                    onChange={(e) =>
                      setJuridicalForm({
                        ...juridicalForm,
                        taxRegime: e.target.value as any,
                      })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="comun">Responsable de IVA (Régimen Común)</option>
                    <option value="gran_contribuyente">Gran Contribuyente</option>
                    <option value="autoretenedor">Autorretenedor</option>
                    <option value="simplificado">No Responsable de IVA</option>
                  </select>
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Correo para Facturación Electrónica DIAN <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      value={juridicalForm.electronicInvoicingEmail}
                      onChange={(e) =>
                        setJuridicalForm({
                          ...juridicalForm,
                          electronicInvoicingEmail: e.target.value,
                        })
                      }
                      placeholder="facturacion@empresa.com"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Teléfono Corporativo <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      value={juridicalForm.phone}
                      onChange={(e) =>
                        setJuridicalForm({ ...juridicalForm, phone: e.target.value })
                      }
                      placeholder="+57 601 000 0000"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Ciudad Sede Principal <span className="text-rose-400">*</span>
                  </label>
                  <select
                    value={juridicalForm.city}
                    onChange={(e) =>
                      setJuridicalForm({ ...juridicalForm, city: e.target.value })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  >
                    {colombianCities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Dirección Principal de Correspondencia
                  </label>
                  <input
                    type="text"
                    value={juridicalForm.mainAddress}
                    onChange={(e) =>
                      setJuridicalForm({ ...juridicalForm, mainAddress: e.target.value })
                    }
                    placeholder="Ej: Carrera 45 # 108-27, Torre Empresarial Of. 602"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Sector / Tipo de Entidad
                  </label>
                  <select
                    value={juridicalForm.businessType}
                    onChange={(e) =>
                      setJuridicalForm({
                        ...juridicalForm,
                        businessType: e.target.value as any,
                      })
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="constructora">Constructora / Edificaciones</option>
                    <option value="inmobiliaria">Inmobiliaria / Administración PH</option>
                    <option value="contratista">Contratista de Obras Corporativas</option>
                    <option value="industrial">Sector Industrial / Manufactura</option>
                    <option value="administracion_ph">Conjunto Residencial / Centro Comercial</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-600 hover:from-emerald-400 hover:to-teal-400 text-white shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Registrar NIT & Acceder como Persona Jurídica
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
