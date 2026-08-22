import {
  ColorSelection,
  SurfaceType,
  EnvironmentType,
  TechnicalSolution,
  CommercialSupply,
  OperationalService,
  QualityAndWarranty,
  ColorLinkProject,
} from "../types";

export const PINTUCO_PALETTES: ColorSelection[] = [
  { name: "Blanco Almendra Puro", code: "P-1001", hex: "#FDFBF7", category: "Neutros" },
  { name: "Gris Platino Moderno", code: "P-1025", hex: "#E2E5E8", category: "Neutros" },
  { name: "Arena del Desierto", code: "P-1140", hex: "#E7DCB9", category: "Tierra" },
  { name: "Terracota Colonial", code: "P-2310", hex: "#C86D51", category: "Tierra" },
  { name: "Verde Bosque Andino", code: "P-4520", hex: "#2E5D4B", category: "Vibrantes" },
  { name: "Azul Caribe Profundo", code: "P-3880", hex: "#1A4971", category: "Vibrantes" },
  { name: "Amarillo Mostaza Calma", code: "P-2244", hex: "#E3A857", category: "Vibrantes" },
  { name: "Rosa Palo Serena", code: "P-6210", hex: "#EACAC6", category: "Pasteles" },
  { name: "Menta Fresca", code: "P-4105", hex: "#D0E8DD", category: "Pasteles" },
  { name: "Gris Grafito Industrial", code: "P-8890", hex: "#3C4245", category: "Industriales" },
  { name: "Amarillo Seguridad Vial", code: "P-9100", hex: "#F7C815", category: "Industriales" },
  { name: "Rojo Bermellón Fuego", code: "P-5420", hex: "#C72C27", category: "Vibrantes" },
];

export const REGIONAL_CENTERS = [
  { city: "Medellín", name: "Centro de Distribución Pintuco Rionegro & Guayabal", stockLevel: "Alto" },
  { city: "Bogotá D.C.", name: "Hub Logístico Siberia / Fontibón", stockLevel: "Alto" },
  { city: "Cali", name: "Plataforma Yumbo / Menga", stockLevel: "Alto" },
  { city: "Barranquilla", name: "Centro Regional Caribe Vía 40", stockLevel: "Medio" },
  { city: "Bucaramanga", name: "Bodega Oriental Palonegro / Girón", stockLevel: "Alto" },
  { city: "Pereira / Eje Cafetero", name: "Nodo Logístico Dosquebradas", stockLevel: "Medio" },
];

export const SURFACE_LABELS: Record<SurfaceType, { label: string; desc: string; icon: string }> = {
  mamposteria_estuco: {
    label: "Mampostería / Pañete / Estuco",
    desc: "Muros interiores y exteriores tradicionales en ladrillo y revoque.",
    icon: "BrickWall",
  },
  concreto_a_la_vista: {
    label: "Concreto a la Vista",
    desc: "Superficies estructurales, losas y columnas de concreto fundido.",
    icon: "Boxes",
  },
  drywall_yeso: {
    label: "Drywall / Panel Yeso / Superboard",
    desc: "Sistemas livianos de construcción y divisiones interiores.",
    icon: "LayoutGrid",
  },
  madera: {
    label: "Madera y Derivados (MDF/Triplex)",
    desc: "Puertas, vigas, zócalos, muebles y pérgolas.",
    icon: "TreePine",
  },
  metal_ferroso: {
    label: "Metal Ferroso / Estructura Metálica",
    desc: "Rejas, barandas, perfiles estructurales y portones.",
    icon: "ShieldAlert",
  },
  piso_alto_trafico: {
    label: "Pisos de Tráfico Comercial/Industrial",
    desc: "Parqueaderos, bodegas, talleres, rampas y áreas de carga.",
    icon: "Truck",
  },
  fachada_exterior: {
    label: "Fachada Exterior / Intemperie",
    desc: "Muros expuestos a radiación solar continua, lluvia y smog.",
    icon: "Building2",
  },
  cubierta_techo: {
    label: "Cubiertas / Tejas / Terrazas",
    desc: "Superficies horizontales o inclinadas expuestas al agua estancada.",
    icon: "Home",
  },
};

export const ENVIRONMENT_LABELS: Record<EnvironmentType, { label: string; desc: string }> = {
  interior_seco: {
    label: "Interior Seco (Habitaciones, Salas, Oficinas)",
    desc: "Ambientes con humedad relativa normal y baja exposición a suciedad agresiva.",
  },
  interior_humedo_bano: {
    label: "Interior Húmedo (Baños, Cocinas, Lavanderías)",
    desc: "Alta presencia de vapor, humedad periódica y riesgo de formación de hongos.",
  },
  exterior_intemperie: {
    label: "Exterior Intemperie (Fachadas, Balcones)",
    desc: "Impacto directo de rayos UV, lluvia torrencial y fluctuaciones térmicas.",
  },
  costero_marino: {
    label: "Costero / Marino (Ambiente Salino)",
    desc: "Exposición a brisa marina, salinidad y corrosión acelerada.",
  },
  industrial_quimico: {
    label: "Industrial / Químico / Alto Tráfico",
    desc: "Derrame de aceites, contacto químico, abrasión y tránsito pesado de maquinaria.",
  },
};

// Calculation engine for materials & technical solution
export function generateTechnicalAndCommercialSystem(
  surface: SurfaceType,
  environment: EnvironmentType,
  areaM2: number,
  moisture: string,
  cracks: string,
  wear: string,
  hasMold: boolean,
  color: ColorSelection,
  finish: string
): {
  technicalSolution: TechnicalSolution;
  commercialSupply: CommercialSupply;
  operationalService: OperationalService;
  qualityWarranty: QualityAndWarranty;
} {
  const safeArea = Math.max(areaM2 || 10, 5);

  let finishProduct = "Viniltex Avanzado Antibacterial";
  let finishYieldM2Gal = 35; // 2 manos rinden aprox 35m²/galón
  let finishPriceGal = 115000;
  let warrantyYears = 5;

  if (environment === "exterior_intemperie" || surface === "fachada_exterior") {
    finishProduct = "Koraza 5 Años Pintuco Máxima Protección";
    finishYieldM2Gal = 30;
    finishPriceGal = 142000;
    warrantyYears = 5;
  } else if (environment === "costero_marino") {
    finishProduct = "Koraza Elastómerica Marina Impermeabilizante";
    finishYieldM2Gal = 25;
    finishPriceGal = 185000;
    warrantyYears = 7;
  } else if (surface === "piso_alto_trafico" || environment === "industrial_quimico") {
    finishProduct = "Pintucoat Epóxico Poliamida Alto Tráfico";
    finishYieldM2Gal = 20;
    finishPriceGal = 240000;
    warrantyYears = 7;
  } else if (surface === "metal_ferroso") {
    finishProduct = "Pintulux Esmalte Sintético Anticorrosivo Brillante";
    finishYieldM2Gal = 30;
    finishPriceGal = 98000;
    warrantyYears = 4;
  } else if (surface === "madera") {
    finishProduct = "Barniz Poliuretano Madera Madetec";
    finishYieldM2Gal = 28;
    finishPriceGal = 125000;
    warrantyYears = 5;
  }

  // Adjust for space conditions
  const hasHighMoisture = moisture.includes("filtracion") || moisture.includes("capilaridad");
  const hasHighCracks = cracks.includes("medias") || cracks.includes("estructurales");

  const layers: TechnicalSolution["recommendedLayers"] = [];

  // Stage 1: Preparation & Sealing
  if (hasHighMoisture || hasMold) {
    layers.push({
      stepNumber: 1,
      stage: "Tratamiento de Barrera Antihumedad & Sanitización",
      productName: "Limpiador Antihongos + Sellomax Barrera Húmeda",
      productType: "Tratamiento Especializado",
      purpose: "Eradicar esporas y crear membrana de retención contra presión hidrostática negativa.",
      hands: 1,
      dryingHours: 6,
      dilution: "Directo sin diluir",
      theoreticalYieldM2Gal: 28,
    });
  } else {
    layers.push({
      stepNumber: 1,
      stage: "Imprimación y Sellado de Poros",
      productName: "Acriltex Sellador Fijador de Superficies",
      productType: "Imprimante Acrílico",
      purpose: "Consolidar el sustrato, uniformar la absorción y maximizar la adherencia del acabado.",
      hands: 1,
      dryingHours: 4,
      dilution: "10% agua potable",
      theoreticalYieldM2Gal: 40,
    });
  }

  // Stage 2: Leveling & putty
  if (hasHighCracks || wear.includes("caleo") || wear.includes("deterioro")) {
    layers.push({
      stepNumber: 2,
      stage: "Resane y Nivelación Estructural",
      productName: environment.includes("exterior")
        ? "Estuco Acrílico Exterior Alta Flexibilidad"
        : "Estuco Plástico Interior Listo Para Usar",
      productType: "Masilla de Relleno Elástica",
      purpose: "Puenteo de microfisuras, nivelación de planeidad y acabado terso libre de irregularidades.",
      hands: 2,
      dryingHours: 6,
      dilution: "Listo para usar",
      theoreticalYieldM2Gal: 25,
    });
  }

  // Stage 3: Finish coat
  layers.push({
    stepNumber: layers.length + 1,
    stage: `Acabado Decorativo y Protector (${finish})`,
    productName: finishProduct,
    productType: "Pintura de Alta Especificación",
    purpose: `Capa final de alta resistencia, lavabilidad extrema y retención de tono ${color.name}.`,
    hands: 2,
    dryingHours: 3,
    dilution: "15% agua potable",
    theoreticalYieldM2Gal: finishYieldM2Gal,
  });

  // Calculate quantities & packaging
  // Finish coat gallons
  const finishGallonsNeeded = Math.ceil((safeArea / finishYieldM2Gal) * 1.1); // 10% waste factor
  const finishCunetes = Math.floor(finishGallonsNeeded / 5);
  const finishSingleGallons = finishGallonsNeeded % 5;

  const items: CommercialSupply["items"] = [];

  if (finishCunetes > 0) {
    items.push({
      id: "prod-finish-cunete",
      sku: `PIN-${color.code}-C5G`,
      name: `${finishProduct} - Color: ${color.name} (${color.code}) [Cuñete 5 Gal]`,
      category: "Pinturas",
      unit: "Cuñete (5 Gal)",
      quantity: finishCunetes,
      unitPriceCOP: Math.round(finishPriceGal * 4.6),
      totalPriceCOP: Math.round(finishPriceGal * 4.6 * finishCunetes),
      stockStatus: "En Stock",
      nearestWarehouse: "CD Rionegro / Guayabal",
    });
  }

  if (finishSingleGallons > 0 || finishCunetes === 0) {
    const qty = finishSingleGallons > 0 ? finishSingleGallons : 1;
    items.push({
      id: "prod-finish-gal",
      sku: `PIN-${color.code}-1G`,
      name: `${finishProduct} - Color: ${color.name} (${color.code}) [Galón]`,
      category: "Pinturas",
      unit: "Galón (1 Gal)",
      quantity: qty,
      unitPriceCOP: finishPriceGal,
      totalPriceCOP: finishPriceGal * qty,
      stockStatus: "En Stock",
      nearestWarehouse: "Tienda Pintuco Principal",
    });
  }

  // Imprimante
  const primerGallons = Math.max(1, Math.ceil((safeArea / 35) * 1.05));
  items.push({
    id: "prod-primer-gal",
    sku: "PIN-ACRIL-1G",
    name: "Acriltex Sellador Fijador Pintuco Base Agua [Galón]",
    category: "Selladores",
    unit: "Galón (1 Gal)",
    quantity: primerGallons,
    unitPriceCOP: 68000,
    totalPriceCOP: 68000 * primerGallons,
    stockStatus: "En Stock",
    nearestWarehouse: "CD Rionegro / Guayabal",
  });

  // Estuco if needed
  if (hasHighCracks || wear.includes("caleo")) {
    const estucoGal = Math.max(1, Math.ceil(safeArea / 30));
    items.push({
      id: "prod-estuco-gal",
      sku: "PIN-EST-PLAST-1G",
      name: "Estuco Plástico / Acrílico Pintuco [Galón]",
      category: "Estucos",
      unit: "Galón (1 Gal)",
      quantity: estucoGal,
      unitPriceCOP: 52000,
      totalPriceCOP: 52000 * estucoGal,
      stockStatus: "En Stock",
      nearestWarehouse: "Tienda Pintuco Principal",
    });
  }

  // Tools Kit
  const toolsNeeded = Math.ceil(safeArea / 100) || 1;
  items.push(
    {
      id: "tool-roller",
      sku: "HRR-ROD-PRO-9",
      name: "Rodillo Profesional Antigota 9\" Microfibra Alta Densidad",
      category: "Herramientas",
      unit: "Unidad",
      quantity: toolsNeeded * 2,
      unitPriceCOP: 24500,
      totalPriceCOP: 24500 * toolsNeeded * 2,
      stockStatus: "En Stock",
      nearestWarehouse: "Ferretería Aliada Pintuco",
    },
    {
      id: "tool-brush",
      sku: "HRR-BRO-MONO-2",
      name: "Brocha Profesional Cerda Mono 2.5\" Recortes Precisos",
      category: "Herramientas",
      unit: "Unidad",
      quantity: toolsNeeded * 2,
      unitPriceCOP: 16800,
      totalPriceCOP: 16800 * toolsNeeded * 2,
      stockStatus: "En Stock",
      nearestWarehouse: "Ferretería Aliada Pintuco",
    },
    {
      id: "tool-tape",
      sku: "HRR-CINT-AZUL",
      name: "Cinta de Enmascarar Azul Pintor 24mm x 50m (Bajo Residuo)",
      category: "Complementos",
      unit: "Unidad",
      quantity: Math.max(2, Math.ceil(safeArea / 25)),
      unitPriceCOP: 12900,
      totalPriceCOP: 12900 * Math.max(2, Math.ceil(safeArea / 25)),
      stockStatus: "En Stock",
      nearestWarehouse: "Tienda Pintuco Principal",
    },
    {
      id: "tool-plastic",
      sku: "HRR-PLAST-PROT",
      name: "Plástico Protector de Pisos y Muebles Calibre 2 (20m²)",
      category: "Complementos",
      unit: "Unidad",
      quantity: Math.max(1, Math.ceil(safeArea / 40)),
      unitPriceCOP: 18500,
      totalPriceCOP: 18500 * Math.max(1, Math.ceil(safeArea / 40)),
      stockStatus: "En Stock",
      nearestWarehouse: "Tienda Pintuco Principal",
    }
  );

  let totalMaterialsCOP = 0;
  let totalToolsCOP = 0;

  for (const item of items) {
    if (item.category === "Pinturas" || item.category === "Selladores" || item.category === "Estucos") {
      totalMaterialsCOP += item.totalPriceCOP;
    } else {
      totalToolsCOP += item.totalPriceCOP;
    }
  }

  // Estimated labor: ~$18,000 COP/m² for certified professional crew
  const estimatedLaborCOP = Math.round(safeArea * 18500);
  const subtotalCOP = totalMaterialsCOP + totalToolsCOP + estimatedLaborCOP;
  const taxCOP = Math.round((totalMaterialsCOP + totalToolsCOP) * 0.19);
  const grandTotalCOP = subtotalCOP + taxCOP;

  // Operational schedule
  const estimatedDays = Math.max(2, Math.ceil(safeArea / 60));
  const dailyTimeline: OperationalService["dailyTimeline"] = [
    {
      day: 1,
      phase: "Alistamiento, Protección y Sellado",
      tasks: [
        "Enmascarado perimetral con cinta azul y cobertura de pisos con plástico de alta densidad.",
        "Lijado de asperezas y remoción mecánica de pintura caleada o descascarada.",
        "Aplicación uniforme de imprimante sellador fijador (Acriltex / Sellomax).",
      ],
      estimatedHours: 7,
      safetyNote: "Uso obligatorio de gafas protectoras, mascarilla N95 para polvo y guantes de nitrilo.",
    },
    {
      day: 2,
      phase: "Nivelación y Primera Mano de Color",
      tasks: [
        "Resane puntual de microfisuras con masilla acrílica elástica.",
        "Inspección de secado y lijado fino con lija grano 180.",
        "Aplicación de la 1ra mano de acabado de alta especificación respetando dilución del 15%.",
      ],
      estimatedHours: 8,
      safetyNote: "Ventilación activa del espacio durante el proceso de evaporación del solvente/agua.",
    },
  ];

  if (estimatedDays >= 3) {
    dailyTimeline.push({
      day: 3,
      phase: "Segunda Mano, Acabados Finos e Inspección",
      tasks: [
        "Aplicación de la 2da mano de acabado para lograr opacidad y tono perfecto.",
        "Retiro cuidadoso de cintas de enmascarar en ángulo de 45° antes del secado total.",
        "Limpieza exhaustiva del área de trabajo y entrega con checklist de calidad.",
      ],
      estimatedHours: 6,
      safetyNote: "Verificación de uniformidad de brillo y entrega de certificado de garantía Pintuco.",
    });
  }

  const technical: TechnicalSolution = {
    diagnosticSummary: `Sistema técnico integral diseñado para superficie de ${surface.replace(/_/g, " ")} en ambiente ${environment.replace(/_/g, " ")}, optimizado para ${safeArea} m² con tecnología de retención de color Pintuco.`,
    detectedIssues: [
      moisture !== "ninguna" ? `Condición de humedad detectada (${moisture})` : "Superficie apta para recubrimiento",
      cracks !== "ninguna" ? `Presencia de discontinuidades (${cracks})` : "Planeidad estable",
      hasMold ? "Contaminación biológica por moho/hongos" : "Sustrato limpio",
    ],
    severityLevel: hasHighMoisture || hasHighCracks ? "Alta" : "Media",
    surfacePreparation: [
      "Retirar polvo, grasa, ceras y partículas sueltas con trapo húmedo y desengrasante neutro.",
      "Lijar suavemente la superficie con lija de agua No. 180 para crear anclaje mecánico.",
      "Asegurar que la humedad relativa del muro sea menor a 15% antes de aplicar imprimante.",
    ],
    recommendedLayers: layers,
    wasteFactorPercentage: 10,
    technicalTips: [
      "Nunca pintar bajo radiación solar extrema o lluvia inminente.",
      "Mezclar con espátula limpia antes y durante la aplicación para homogeneizar pigmentos.",
      "Guardar 1/4 de galón sobrante sellado para futuros retoques puntuales con el mismo lote.",
    ],
    warrantyYears,
    requiresSpecializedSafety: environment.includes("industrial") || surface.includes("cubierta"),
  };

  const commercial: CommercialSupply = {
    items,
    totalMaterialsCOP,
    totalToolsCOP,
    estimatedLaborCOP,
    subtotalCOP,
    taxCOP,
    grandTotalCOP,
    estimatedDeliveryHours: 24,
    assignedStoreWarehouse: "Centro Logístico Regional Pintuco - Entrega Directa",
  };

  const operational: OperationalService = {
    serviceMode: "cuadrilla_certificada",
    assignedCrewName: "Cuadrilla Certificada Pintuco Master #204",
    crewLeader: "Maestro Carlos E. Restrepo (ID Certificado: PIN-7729)",
    crewMembersCount: safeArea > 80 ? 3 : 2,
    executionDays: estimatedDays,
    dailyTimeline,
    dispatchTrackingCode: `TRK-COL-${Math.floor(100000 + Math.random() * 900000)}`,
    logisticsStatus: "Asignado",
  };

  const warranty: QualityAndWarranty = {
    certificateNumber: `PINTUCO-GAR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    certifiedSeal: "SELLO CALIDAD PINTUCO 100% GARANTIZADO",
    warrantyYears,
    issuanceDate: new Date().toLocaleDateString("es-CO"),
    expirationDate: new Date(new Date().setFullYear(new Date().getFullYear() + warrantyYears)).toLocaleDateString("es-CO"),
    inspectorName: "Ing. Alejandro Morales - Depto. Asistencia Técnica Pintuco",
    inspectionChecklist: [
      { id: "c1", category: "Preparación", criterion: "Superficie libre de polvo, grasa y humedad >15%", status: "Cumple" },
      { id: "c2", category: "Adherencia", criterion: "Anclaje mecánico verificado mediante prueba de cuadrícula", status: "Cumple" },
      { id: "c3", category: "Cubrimiento", criterion: "Espesor de película seca (DFT) uniforme en micras", status: "Cumple" },
      { id: "c4", category: "Color y Brillo", criterion: "Tono fiel a la carta de color sin veteado ni traslape", status: "Cumple" },
      { id: "c5", category: "Aseo y Entrega", criterion: "Retiro total de cintas, residuos y limpieza impecable", status: "Cumple" },
    ],
    warrantyTerms: [
      "Garantía contra descascaramiento prematuro, caleo acelerado y decoloración anormal.",
      "Válida aplicando el sistema completo de preparación, imprimación y acabado especificado.",
      "Soporte técnico directo Pintuco con visita en obra en caso de cualquier anomalía.",
    ],
  };

  return {
    technicalSolution: technical,
    commercialSupply: commercial,
    operationalService: operational,
    qualityWarranty: warranty,
  };
}

// Sample initial projects to show the rich ecosystem immediately
export const SAMPLE_PROJECTS: ColorLinkProject[] = [
  {
    id: "proj-001",
    trackingNumber: "CLK-2026-8941",
    createdAt: "2026-08-20T14:30:00.000Z",
    updatedAt: "2026-08-22T08:15:00.000Z",
    status: "Diagnóstico IA",
    client: {
      personType: "natural",
      fullName: "Johan Prada Ramírez",
      documentType: "CC",
      documentNumber: "1098742110",
      phone: "+57 312 458 9200",
      email: "Johan282000pr@gmail.com",
      city: "Medellín",
      clientType: "hogar",
      companyName: "Residencia Prada",
    },
    project: {
      projectName: "Renovación Fachada & Terraza El Poblado",
      address: "Cra 38 # 10A-45, Apto 502",
      neighborhood: "El Poblado",
      buildingType: "residencial_apto",
      requiredStartDate: "2026-08-28",
      requiredDeliveryDate: "2026-09-02",
      urgencyLevel: "alta",
    },
    surface: {
      surfaceType: "fachada_exterior",
      areaM2: 78,
      lengthM: 26,
      heightM: 3,
      environmentType: "exterior_intemperie",
      color: PINTUCO_PALETTES[0], // Blanco Almendra
      finishType: "mate",
    },
    condition: {
      moistureSeverity: "leve_humedad",
      crackSeverity: "microfisuras",
      wearSeverity: "caleo_desprendimiento",
      hasMold: true,
      isHighAlkalinity: false,
      existingCoatingType: "Vinilo tipo 2 desgastado",
      notes: "El muro recibe sol directo de la tarde y lluvias torrenciales continuas. Se observan manchas oscuras en la parte inferior del balcón.",
    },
    evidences: {
      evidences: [
        {
          id: "ev-1",
          url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
          caption: "Fachada exterior con decoloración y mancha de humedad por escorrentía",
          timestamp: "2026-08-22T08:00:00Z",
        },
      ],
      detailedDescription: "Se requiere transformar la fachada con un color neutro premium y sellar filtraciones antes de la temporada invernal.",
      channelOrigin: "whatsapp",
      hasDataConsent: true,
      consentTimestamp: "2026-08-22T08:00:00Z",
    },
    ...generateTechnicalAndCommercialSystem(
      "fachada_exterior",
      "exterior_intemperie",
      78,
      "leve_humedad",
      "microfisuras",
      "caleo_desprendimiento",
      true,
      PINTUCO_PALETTES[0],
      "mate"
    ),
  },
  {
    id: "proj-002",
    trackingNumber: "CLK-2026-7312",
    createdAt: "2026-08-21T10:15:00.000Z",
    updatedAt: "2026-08-22T09:00:00.000Z",
    status: "En Ejecución",
    client: {
      personType: "juridica",
      fullName: "Inmobiliaria & Constructora Hábitat SAS",
      documentType: "NIT",
      documentNumber: "901.443.210",
      verificationDigit: "4",
      legalRepresentative: "Arq. Felipe Restrepo Ochoa",
      taxRegime: "gran_contribuyente",
      electronicInvoicingEmail: "facturacion@constructorahabitat.co",
      phone: "+57 601 744 3300",
      email: "proyectos@constructorahabitat.co",
      city: "Bogotá D.C.",
      clientType: "inmobiliaria",
      companyName: "Inmobiliaria & Constructora Hábitat SAS",
    },
    project: {
      projectName: "Adecuación Oficinas Corporativas Calle 100",
      address: "Calle 100 # 19-61, Piso 8",
      neighborhood: "Chicó Norte",
      buildingType: "comercial",
      requiredStartDate: "2026-08-25",
      requiredDeliveryDate: "2026-08-29",
      urgencyLevel: "critica",
    },
    surface: {
      surfaceType: "drywall_yeso",
      areaM2: 180,
      lengthM: 60,
      heightM: 3,
      environmentType: "interior_seco",
      color: PINTUCO_PALETTES[1], // Gris Platino Moderno
      finishType: "satinado",
    },
    condition: {
      moistureSeverity: "ninguna",
      crackSeverity: "ninguna",
      wearSeverity: "optimo",
      hasMold: false,
      isHighAlkalinity: false,
      existingCoatingType: "Panel yeso nuevo encintado",
      notes: "Drywall nuevo recién instalado en juntas. Se requiere acabado satinado lavable de alta elegancia corporativa.",
    },
    evidences: {
      evidences: [
        {
          id: "ev-2",
          url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
          caption: "Muros interiores de drywall en oficinas",
          timestamp: "2026-08-21T10:20:00Z",
        },
      ],
      detailedDescription: "Pintura para 180m² de oficinas de alto estándar con Viniltex Avanzado Satinado.",
      channelOrigin: "portal_web",
      hasDataConsent: true,
      consentTimestamp: "2026-08-21T10:15:00Z",
    },
    ...generateTechnicalAndCommercialSystem(
      "drywall_yeso",
      "interior_seco",
      180,
      "ninguna",
      "ninguna",
      "optimo",
      false,
      PINTUCO_PALETTES[1],
      "satinado"
    ),
  },
];
