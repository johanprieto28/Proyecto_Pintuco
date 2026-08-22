export type ChannelOrigin =
  | "whatsapp"
  | "tienda_pintuco"
  | "asesor_obra"
  | "portal_web"
  | "call_center";

export type ClientType = "hogar" | "contratista" | "inmobiliaria" | "industrial" | "empresa";

export type PersonType = "natural" | "juridica";

export interface NaturalPersonProfile {
  personType: "natural";
  documentType: "CC" | "CE" | "Pasaporte";
  documentNumber: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  address?: string;
  occupation?: string;
  clientCategory: "hogar" | "contratista" | "independiente" | "profesional";
}

export interface JuridicalPersonProfile {
  personType: "juridica";
  nit: string;
  verificationDigit: string;
  companyName: string; // Razón Social
  tradeName?: string; // Nombre Comercial
  legalRepresentative: string;
  legalRepDocType: "CC" | "CE" | "Pasaporte";
  legalRepDocNumber: string;
  taxRegime: "comun" | "simplificado" | "gran_contribuyente" | "autoretenedor";
  economicActivityCIIU?: string;
  electronicInvoicingEmail: string;
  phone: string;
  city: string;
  mainAddress: string;
  businessType: "constructora" | "inmobiliaria" | "contratista" | "industrial" | "administracion_ph";
}

export type UserProfile = NaturalPersonProfile | JuridicalPersonProfile;

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  lastLogin?: string;
}

export type BuildingType =
  | "residencial_casa"
  | "residencial_apto"
  | "comercial"
  | "industrial_bodega"
  | "institucional";

export type SurfaceType =
  | "mamposteria_estuco"
  | "concreto_a_la_vista"
  | "drywall_yeso"
  | "madera"
  | "metal_ferroso"
  | "piso_alto_trafico"
  | "fachada_exterior"
  | "cubierta_techo";

export type EnvironmentType =
  | "interior_seco"
  | "interior_humedo_bano"
  | "exterior_intemperie"
  | "costero_marino"
  | "industrial_quimico";

export type FinishType = "mate" | "satinado" | "brillante" | "texturizado" | "epoxico";

export type MoistureSeverity = "ninguna" | "leve_humedad" | "capilaridad" | "filtracion_activa";
export type CrackSeverity = "ninguna" | "microfisuras" | "grietas_medias" | "grietas_estructurales";
export type WearSeverity = "optimo" | "leve_decoloracion" | "caleo_desprendimiento" | "deterioro_severo";

export interface ClientIdentification {
  personType: PersonType;
  fullName: string; // Nombre Completo o Razón Social
  documentType: "CC" | "NIT" | "CE" | "Pasaporte";
  documentNumber: string;
  verificationDigit?: string;
  phone: string;
  email: string;
  city: string;
  clientType: ClientType;
  companyName?: string;
  legalRepresentative?: string;
  electronicInvoicingEmail?: string;
  taxRegime?: "comun" | "simplificado" | "gran_contribuyente" | "autoretenedor";
  economicActivityCIIU?: string;
}

export interface ProjectDetails {
  projectName: string;
  address: string;
  neighborhood: string;
  buildingType: BuildingType;
  requiredStartDate: string;
  requiredDeliveryDate: string;
  urgencyLevel: "normal" | "alta" | "critica";
}

export interface ColorSelection {
  name: string;
  code: string;
  hex: string;
  category: "Neutros" | "Vibrantes" | "Tierra" | "Pasteles" | "Industriales";
}

export interface SurfaceAndEnvironment {
  surfaceType: SurfaceType;
  areaM2: number;
  lengthM: number;
  heightM: number;
  environmentType: EnvironmentType;
  color: ColorSelection;
  finishType: FinishType;
}

export interface SpaceCondition {
  moistureSeverity: MoistureSeverity;
  crackSeverity: CrackSeverity;
  wearSeverity: WearSeverity;
  hasMold: boolean;
  isHighAlkalinity: boolean;
  existingCoatingType: string;
  notes: string;
}

export interface EvidenceItem {
  id: string;
  url: string;
  base64?: string;
  caption: string;
  timestamp: string;
}

export interface EvidencesAndConsent {
  evidences: EvidenceItem[];
  detailedDescription: string;
  channelOrigin: ChannelOrigin;
  hasDataConsent: boolean;
  consentTimestamp?: string;
}

export interface TechnicalLayer {
  stepNumber: number;
  stage: string;
  productName: string;
  productType: string;
  purpose: string;
  hands: number;
  dryingHours: number;
  dilution: string;
  theoreticalYieldM2Gal: number;
}

export interface TechnicalSolution {
  diagnosticSummary: string;
  detectedIssues: string[];
  severityLevel: "Baja" | "Media" | "Alta" | "Crítica";
  surfacePreparation: string[];
  recommendedLayers: TechnicalLayer[];
  wasteFactorPercentage: number;
  technicalTips: string[];
  warrantyYears: number;
  requiresSpecializedSafety: boolean;
}

export interface SupplyItem {
  id: string;
  sku: string;
  name: string;
  category: "Pinturas" | "Selladores" | "Estucos" | "Herramientas" | "Complementos";
  unit: "Cuñete (5 Gal)" | "Galón (1 Gal)" | "Cuarto (1/4 Gal)" | "Unidad" | "Kit";
  quantity: number;
  unitPriceCOP: number;
  totalPriceCOP: number;
  stockStatus: "En Stock" | "Bajo Inventario" | "Bajo Pedido";
  nearestWarehouse: string;
}

export interface CommercialSupply {
  items: SupplyItem[];
  totalMaterialsCOP: number;
  totalToolsCOP: number;
  estimatedLaborCOP: number;
  subtotalCOP: number;
  taxCOP: number;
  grandTotalCOP: number;
  estimatedDeliveryHours: number;
  assignedStoreWarehouse: string;
}

export interface DailyTimeline {
  day: number;
  phase: string;
  tasks: string[];
  estimatedHours: number;
  safetyNote?: string;
}

export interface OperationalService {
  serviceMode: "cuadrilla_certificada" | "auto_aplicacion";
  assignedCrewName: string;
  crewLeader: string;
  crewMembersCount: number;
  executionDays: number;
  dailyTimeline: DailyTimeline[];
  dispatchTrackingCode: string;
  logisticsStatus: "Pendiente" | "Asignado" | "En Despacho" | "En Sitio" | "Finalizado";
}

export interface QualityInspectionItem {
  id: string;
  category: string;
  criterion: string;
  status: "Cumple" | "No Cumple" | "Pendiente" | "N/A";
  notes?: string;
}

export interface QualityAndWarranty {
  certificateNumber: string;
  certifiedSeal: string;
  warrantyYears: number;
  issuanceDate: string;
  expirationDate: string;
  inspectorName: string;
  inspectionChecklist: QualityInspectionItem[];
  warrantyTerms: string[];
}

export interface ColorLinkProject {
  id: string;
  trackingNumber: string;
  createdAt: string;
  updatedAt: string;
  status: "Captación" | "Diagnóstico IA" | "Abastecido" | "En Ejecución" | "Certificado";
  client: ClientIdentification;
  project: ProjectDetails;
  surface: SurfaceAndEnvironment;
  condition: SpaceCondition;
  evidences: EvidencesAndConsent;
  technicalSolution: TechnicalSolution;
  commercialSupply: CommercialSupply;
  operationalService: OperationalService;
  qualityWarranty: QualityAndWarranty;
}
