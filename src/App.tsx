import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { WorkflowStepper } from "./components/WorkflowStepper";
import { ClientProjectForm } from "./components/ClientProjectForm";
import { SurfaceConditionForm } from "./components/SurfaceConditionForm";
import { EvidenceAIAnalyzer } from "./components/EvidenceAIAnalyzer";
import { TechnicalAndSupplyView } from "./components/TechnicalAndSupplyView";
import { OperationalAndQualityView } from "./components/OperationalAndQualityView";
import { ColorWallSimulator } from "./components/ColorWallSimulator";
import { ProjectsDashboard } from "./components/ProjectsDashboard";
import { PintucoAiAdvisorModal } from "./components/PintucoAiAdvisorModal";
import { AuthModal } from "./components/AuthModal";

import {
  ColorLinkProject,
  ClientIdentification,
  ProjectDetails,
  SurfaceAndEnvironment,
  SpaceCondition,
  EvidencesAndConsent,
  TechnicalSolution,
  CommercialSupply,
  OperationalService,
  QualityAndWarranty,
  ColorSelection,
  FinishType,
  UserProfile,
} from "./types";
import {
  SAMPLE_PROJECTS,
  PINTUCO_PALETTES,
  generateTechnicalAndCommercialSystem,
} from "./data/pintucoCatalog";

const STORAGE_KEY = "COLORLINK_PROJECTS_V1";
const USER_STORAGE_KEY = "COLORLINK_USER_PROFILE_V1";

export default function App() {
  const [projects, setProjects] = useState<ColorLinkProject[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return SAMPLE_PROJECTS;
  });

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem(USER_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    // Default logged in user profile (Carlos Andrés Gómez - Persona Natural)
    return {
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
    };
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<"wizard" | "dashboard" | "simulator" | "certificate">(
    "wizard"
  );
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);

  // Active Wizard Project State
  const [client, setClient] = useState<ClientIdentification>({
    personType: "natural",
    fullName: "Carlos Andrés Gómez Montoya",
    documentType: "CC",
    documentNumber: "1020485991",
    phone: "+57 310 889 4432",
    email: "carlos.gomez@gmail.com",
    city: "Medellín",
    clientType: "hogar",
  });

  const [project, setProject] = useState<ProjectDetails>({
    projectName: "Mantenimiento & Pintura Fachada Principal",
    address: "Calle 10 sur # 34-120",
    neighborhood: "La Aguacatala",
    buildingType: "residencial_casa",
    requiredStartDate: new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0],
    requiredDeliveryDate: new Date(Date.now() + 86400000 * 7).toISOString().split("T")[0],
    urgencyLevel: "normal",
  });

  const [surface, setSurface] = useState<SurfaceAndEnvironment>({
    surfaceType: "fachada_exterior",
    areaM2: 65,
    lengthM: 26,
    heightM: 2.5,
    environmentType: "exterior_intemperie",
    color: PINTUCO_PALETTES[0], // Blanco Almendra
    finishType: "mate",
  });

  const [condition, setCondition] = useState<SpaceCondition>({
    moistureSeverity: "leve_humedad",
    crackSeverity: "microfisuras",
    wearSeverity: "caleo_desprendimiento",
    hasMold: true,
    isHighAlkalinity: false,
    existingCoatingType: "Pintura exterior antigua decolorada",
    notes: "Presenta manchas de escorrentía de lluvia en la parte baja y polvo blanco.",
  });

  const [evidences, setEvidences] = useState<EvidencesAndConsent>({
    evidences: [
      {
        id: "ev-init",
        url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
        caption: "Fachada exterior con manchas de humedad y exposición al sol",
        timestamp: new Date().toISOString(),
      },
    ],
    detailedDescription: "Se requiere renovar el exterior con impermeabilidad máxima y color duradero.",
    channelOrigin: "whatsapp",
    hasDataConsent: true,
    consentTimestamp: new Date().toISOString(),
  });

  // Calculate default initial system
  const initialCalculated = generateTechnicalAndCommercialSystem(
    surface.surfaceType,
    surface.environmentType,
    surface.areaM2,
    condition.moistureSeverity,
    condition.crackSeverity,
    condition.wearSeverity,
    condition.hasMold,
    surface.color,
    surface.finishType
  );

  const [technicalSolution, setTechnicalSolution] = useState<TechnicalSolution>(
    initialCalculated.technicalSolution
  );
  const [commercialSupply, setCommercialSupply] = useState<CommercialSupply>(
    initialCalculated.commercialSupply
  );
  const [operationalService, setOperationalService] = useState<OperationalService>(
    initialCalculated.operationalService
  );
  const [qualityWarranty, setQualityWarranty] = useState<QualityAndWarranty>(
    initialCalculated.qualityWarranty
  );

  // Recalculate system when surface or condition changes
  const recalculateSystem = (
    newSurface = surface,
    newCondition = condition
  ) => {
    const calculated = generateTechnicalAndCommercialSystem(
      newSurface.surfaceType,
      newSurface.environmentType,
      newSurface.areaM2,
      newCondition.moistureSeverity,
      newCondition.crackSeverity,
      newCondition.wearSeverity,
      newCondition.hasMold,
      newSurface.color,
      newSurface.finishType
    );
    setTechnicalSolution(calculated.technicalSolution);
    setCommercialSupply(calculated.commercialSupply);
    setOperationalService(calculated.operationalService);
    setQualityWarranty(calculated.qualityWarranty);
  };

  // Save projects and user to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error(e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  const handleLogin = (userProfile: UserProfile) => {
    setCurrentUser(userProfile);
    // Automatically synchronize client identification in active diagnosis
    if (userProfile.personType === "natural") {
      setClient((prev) => ({
        ...prev,
        personType: "natural",
        fullName: userProfile.fullName || `${userProfile.firstName} ${userProfile.lastName}`,
        documentType: userProfile.documentType,
        documentNumber: userProfile.documentNumber,
        phone: userProfile.phone,
        email: userProfile.email,
        city: userProfile.city,
        clientType: userProfile.clientCategory || "hogar",
        companyName: undefined,
        nit: undefined,
        verificationDigit: undefined,
        legalRepresentative: undefined,
        taxRegime: undefined,
      }));
    } else {
      setClient((prev) => ({
        ...prev,
        personType: "juridica",
        fullName: userProfile.companyName,
        companyName: userProfile.companyName,
        documentType: "NIT",
        documentNumber: userProfile.nit,
        nit: userProfile.nit,
        verificationDigit: userProfile.verificationDigit,
        legalRepresentative: userProfile.legalRepresentative,
        taxRegime: userProfile.taxRegime,
        electronicInvoicingEmail: userProfile.electronicInvoicingEmail,
        phone: userProfile.phone,
        email: userProfile.electronicInvoicingEmail,
        city: userProfile.city,
        clientType: userProfile.businessType || "inmobiliaria",
      }));
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleUpdateSurface = (updated: Partial<SurfaceAndEnvironment>) => {
    const next = { ...surface, ...updated };
    setSurface(next);
    recalculateSystem(next, condition);
  };

  const handleUpdateCondition = (updated: Partial<SpaceCondition>) => {
    const next = { ...condition, ...updated };
    setCondition(next);
    recalculateSystem(surface, next);
  };

  const handleApplyColorFromSimulator = (color: ColorSelection, finish: FinishType) => {
    handleUpdateSurface({ color, finishType: finish });
    setActiveTab("wizard");
    setCurrentStep(4);
  };

  const handleSaveAndCertify = () => {
    const newProj: ColorLinkProject = {
      id: `proj-${Date.now()}`,
      trackingNumber: `CLK-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "Certificado",
      client,
      project,
      surface,
      condition,
      evidences,
      technicalSolution,
      commercialSupply,
      operationalService,
      qualityWarranty,
    };

    setProjects((prev) => [newProj, ...prev]);
    setCompletedSteps([1, 2, 3, 4, 5]);
  };

  const handleLoadDemoCase = () => {
    const demo = SAMPLE_PROJECTS[0];
    setClient(demo.client);
    setProject(demo.project);
    setSurface(demo.surface);
    setCondition(demo.condition);
    setEvidences(demo.evidences);
    setTechnicalSolution(demo.technicalSolution);
    setCommercialSupply(demo.commercialSupply);
    setOperationalService(demo.operationalService);
    setQualityWarranty(demo.qualityWarranty);
    setCurrentStep(1);
    setActiveTab("wizard");
    setCompletedSteps([1, 2, 3, 4, 5]);
  };

  const handleSelectProjectFromDashboard = (proj: ColorLinkProject) => {
    setClient(proj.client);
    setProject(proj.project);
    setSurface(proj.surface);
    setCondition(proj.condition);
    setEvidences(proj.evidences);
    setTechnicalSolution(proj.technicalSolution);
    setCommercialSupply(proj.commercialSupply);
    setOperationalService(proj.operationalService);
    setQualityWarranty(proj.qualityWarranty);
    setActiveTab("wizard");
    setCurrentStep(4);
  };

  const handleNewProject = () => {
    setClient({
      fullName: "",
      documentType: "CC",
      documentNumber: "",
      phone: "",
      email: "",
      city: "Medellín",
      clientType: "hogar",
    });
    setProject({
      projectName: "",
      address: "",
      neighborhood: "",
      buildingType: "residencial_apto",
      requiredStartDate: new Date().toISOString().split("T")[0],
      requiredDeliveryDate: new Date(Date.now() + 86400000 * 5).toISOString().split("T")[0],
      urgencyLevel: "normal",
    });
    setSurface({
      surfaceType: "mamposteria_estuco",
      areaM2: 45,
      lengthM: 18,
      heightM: 2.5,
      environmentType: "interior_seco",
      color: PINTUCO_PALETTES[0],
      finishType: "mate",
    });
    setCondition({
      moistureSeverity: "ninguna",
      crackSeverity: "ninguna",
      wearSeverity: "optimo",
      hasMold: false,
      isHighAlkalinity: false,
      existingCoatingType: "Estuco tradicional",
      notes: "",
    });
    setEvidences({
      evidences: [],
      detailedDescription: "",
      channelOrigin: "whatsapp",
      hasDataConsent: true,
    });
    setCurrentStep(1);
    setCompletedSteps([1]);
    setActiveTab("wizard");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500 selection:text-white flex flex-col">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onLoadDemo={handleLoadDemoCase}
        projectsCount={projects.length}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* TAB 1: WORKFLOW WIZARD */}
        {activeTab === "wizard" && (
          <div>
            <WorkflowStepper
              currentStep={currentStep}
              onStepClick={(step) => setCurrentStep(step)}
              completedSteps={completedSteps}
            />

            {currentStep === 1 && (
              <ClientProjectForm
                client={client}
                project={project}
                channelOrigin={evidences.channelOrigin}
                hasDataConsent={evidences.hasDataConsent}
                onUpdateClient={(updated) => setClient((prev) => ({ ...prev, ...updated }))}
                onUpdateProject={(updated) => setProject((prev) => ({ ...prev, ...updated }))}
                onUpdateChannel={(ch) => setEvidences((prev) => ({ ...prev, channelOrigin: ch }))}
                onUpdateConsent={(consent) =>
                  setEvidences((prev) => ({ ...prev, hasDataConsent: consent }))
                }
                onNext={() => {
                  setCompletedSteps((prev) => Array.from(new Set([...prev, 1, 2])));
                  setCurrentStep(2);
                }}
              />
            )}

            {currentStep === 2 && (
              <SurfaceConditionForm
                surface={surface}
                condition={condition}
                onUpdateSurface={handleUpdateSurface}
                onUpdateCondition={handleUpdateCondition}
                onNext={() => {
                  setCompletedSteps((prev) => Array.from(new Set([...prev, 2, 3])));
                  setCurrentStep(3);
                }}
                onPrev={() => setCurrentStep(1)}
              />
            )}

            {currentStep === 3 && (
              <EvidenceAIAnalyzer
                evidences={evidences}
                surface={surface}
                condition={condition}
                technicalSolution={technicalSolution}
                onUpdateEvidences={(updated) => setEvidences((prev) => ({ ...prev, ...updated }))}
                onUpdateTechnicalSolution={(sol) => setTechnicalSolution(sol)}
                onNext={() => {
                  setCompletedSteps((prev) => Array.from(new Set([...prev, 3, 4])));
                  setCurrentStep(4);
                }}
                onPrev={() => setCurrentStep(2)}
              />
            )}

            {currentStep === 4 && (
              <TechnicalAndSupplyView
                technicalSolution={technicalSolution}
                commercialSupply={commercialSupply}
                surface={surface}
                condition={condition}
                onUpdateCommercial={(updated) =>
                  setCommercialSupply((prev) => ({ ...prev, ...updated }))
                }
                onNext={() => {
                  setCompletedSteps((prev) => Array.from(new Set([...prev, 4, 5])));
                  setCurrentStep(5);
                }}
                onPrev={() => setCurrentStep(3)}
              />
            )}

            {currentStep === 5 && (
              <OperationalAndQualityView
                operationalService={operationalService}
                qualityWarranty={qualityWarranty}
                client={client}
                project={project}
                surface={surface}
                technicalSolution={technicalSolution}
                commercialSupply={commercialSupply}
                onUpdateOperational={(updated) =>
                  setOperationalService((prev) => ({ ...prev, ...updated }))
                }
                onUpdateQuality={(updated) =>
                  setQualityWarranty((prev) => ({ ...prev, ...updated }))
                }
                onSaveAndCertify={handleSaveAndCertify}
                onPrev={() => setCurrentStep(4)}
              />
            )}
          </div>
        )}

        {/* TAB 2: PROJECTS DASHBOARD */}
        {activeTab === "dashboard" && (
          <ProjectsDashboard
            projects={projects}
            onSelectProject={handleSelectProjectFromDashboard}
            onNewProject={handleNewProject}
          />
        )}

        {/* TAB 3: COLOR SIMULATOR */}
        {activeTab === "simulator" && (
          <ColorWallSimulator
            currentColor={surface.color}
            currentFinish={surface.finishType}
            onApplyColor={handleApplyColorFromSimulator}
          />
        )}

        {/* TAB 4: CERTIFICATE QUICK VIEW */}
        {activeTab === "certificate" && (
          <OperationalAndQualityView
            operationalService={operationalService}
            qualityWarranty={qualityWarranty}
            client={client}
            project={project}
            surface={surface}
            technicalSolution={technicalSolution}
            commercialSupply={commercialSupply}
            onUpdateOperational={(updated) =>
              setOperationalService((prev) => ({ ...prev, ...updated }))
            }
            onUpdateQuality={(updated) =>
              setQualityWarranty((prev) => ({ ...prev, ...updated }))
            }
            onSaveAndCertify={handleSaveAndCertify}
            onPrev={() => {
              setActiveTab("wizard");
              setCurrentStep(4);
            }}
          />
        )}
      </main>

      {/* User Registration & Authentication Modal (Persona Natural vs Jurídica) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {/* AI Advisor Modal */}
      <PintucoAiAdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        contextData={{
          client,
          project,
          surface,
          condition,
          technicalSolution,
        }}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p className="font-semibold text-slate-400">
          COLORLINK · Transformación Digital Inteligente en Pinturas y Recubrimientos
        </p>
        <p className="text-[11px] text-slate-600 mt-1">
          Integración integral de Necesidad del Cliente, Diagnóstico IA, Abastecimiento, Cuadrilla y Calidad Pintuco Colombia.
        </p>
      </footer>
    </div>
  );
}
