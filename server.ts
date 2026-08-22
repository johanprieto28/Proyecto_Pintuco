import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "COLORLINK Intelligent Coating Ecosystem",
    timestamp: new Date().toISOString(),
  });
});

// AI Surface Pathology & Technical Recommendation Endpoint
app.post("/api/ai/diagnose", async (req, res) => {
  try {
    const {
      surfaceType,
      areaM2,
      environment,
      moisture,
      cracks,
      wear,
      mold,
      alkalinity,
      notes,
      imageBase64,
    } = req.body;

    const systemPrompt = `Eres el Asesor Técnico Principal de COLORLINK (Transformación Digital Inteligente de Pinturas y Recubrimientos).
Tu misión es evaluar la patología de la superficie y formular la solución técnica exacta y profesional requerida.
Devuelve SIEMPRE un JSON válido con la siguiente estructura exacta:
{
  "diagnosticSummary": "Resumen técnico detallado de la patología y condición encontrada",
  "detectedIssues": ["problema 1", "problema 2"],
  "severityLevel": "Baja" | "Media" | "Alta" | "Crítica",
  "surfacePreparation": [
    "Paso 1 de preparación (ej: limpieza con solución antihongos)",
    "Paso 2 (ej: lijado y remoción de pintura suelta)",
    "Paso 3 (ej: sellado y neutralización de alcalinidad)"
  ],
  "recommendedLayers": [
    {
      "stepNumber": 1,
      "stage": "Tratamiento / Imprimación",
      "productName": "Nombre de producto Pintuco recomendado (ej: Sellomax / Acriltex)",
      "purpose": "Finalidad de la capa",
      "hands": 1,
      "dryingHours": 4,
      "dilution": "10% con agua limpia"
    },
    {
      "stepNumber": 2,
      "stage": "Nivelación / Masilla",
      "productName": "Estuco Acrílico Exterior / Estuco Plástico Interior",
      "purpose": "Corrección de fisuras e imperfecciones",
      "hands": 2,
      "dryingHours": 6,
      "dilution": "Listo para usar"
    },
    {
      "stepNumber": 3,
      "stage": "Acabado de Protección y Color",
      "productName": "Viniltex Avanzado / Koraza 5 / Pintulux / Epóxico",
      "purpose": "Capa final decorativa y de alta resistencia",
      "hands": 2,
      "dryingHours": 3,
      "dilution": "15% con agua"
    }
  ],
  "wasteFactorPercentage": 10,
  "technicalTips": [
    "Consejo técnico 1",
    "Consejo técnico 2"
  ],
  "warrantyRecommendationYears": 5
}`;

    const promptText = `Analiza esta necesidad técnica para el proyecto COLORLINK:
- Tipo de Superficie: ${surfaceType || "Mampostería / Concreto"}
- Área a recubrir: ${areaM2 || 50} m²
- Ambiente: ${environment || "Interior"}
- Condición de Humedad: ${moisture || "Leve"}
- Estado de Fisuras: ${cracks || "Microfisuras"}
- Desgaste / Deterioro: ${wear || "Moderado"}
- Presencia de Moho/Hongos: ${mold ? "Sí" : "No"}
- Nivel de Alcalinidad: ${alkalinity || "Normal"}
- Observaciones del cliente: ${notes || "Ninguna"}

Por favor entrega el diagnóstico técnico estructurado en JSON.`;

    let response;
    if (imageBase64 && imageBase64.includes(",")) {
      const parts = imageBase64.split(",");
      const mimeMatch = parts[0].match(/:(.*?);/);
      const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";
      const base64Data = parts[1];

      response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: {
          parts: [
            {
              inlineData: {
                mimeType,
                data: base64Data,
              },
            },
            {
              text: promptText,
            },
          ],
        },
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
        },
      });
    } else {
      response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: promptText,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
        },
      });
    }

    const text = response.text || "{}";
    const parsedData = JSON.parse(text);
    return res.json({ success: true, diagnosis: parsedData });
  } catch (error: any) {
    console.error("AI Diagnosis Error:", error);
    // Fallback standard technical response
    return res.json({
      success: true,
      diagnosis: {
        diagnosticSummary:
          "Diagnóstico asistido por reglas técnicas estándar COLORLINK: Superficie con requerimiento de acondicionamiento de sustrato, imprimación antihumedad y sistema de acabado de alta durabilidad.",
        detectedIssues: [
          req.body.moisture !== "Ninguna" ? `Humedad: ${req.body.moisture}` : "Desgaste superficial",
          req.body.cracks !== "Ninguna" ? `Fisuras detectadas: ${req.body.cracks}` : "Porosidad estándar",
        ],
        severityLevel: req.body.moisture === "Alta (Filtración)" ? "Alta" : "Media",
        surfacePreparation: [
          "Limpiar polvo, grasa y partes sueltas con espátula y cepillo de cerdas duras.",
          "Tratar zonas afectadas por humedad o moho con solución limpiadora alcalina.",
          "Aplicar masilla o sellador elástico en fisuras existentes.",
        ],
        recommendedLayers: [
          {
            stepNumber: 1,
            stage: "Imprimación y Sellado",
            productName: "Sellomax Base Agua / Acriltex",
            purpose: "Fijación del sustrato y bloqueo de porosidad",
            hands: 1,
            dryingHours: 4,
            dilution: "10% agua",
          },
          {
            stepNumber: 2,
            stage: "Acabado de Alta Calidad",
            productName: req.body.environment?.includes("Exterior")
              ? "Koraza 5 Años Pintuco"
              : "Viniltex Avanzado Antibacterial",
            purpose: "Recubrimiento final lavable de máxima retención de color",
            hands: 2,
            dryingHours: 3,
            dilution: "15% agua",
          },
        ],
        wasteFactorPercentage: 10,
        technicalTips: [
          "Verificar que la humedad del muro sea inferior al 15% antes de aplicar.",
          "Respetar los tiempos de secado entre manos para asegurar la polimerización.",
        ],
        warrantyRecommendationYears: req.body.environment?.includes("Exterior") ? 5 : 7,
      },
    });
  }
});

// AI Live Advisor Endpoint
app.post("/api/ai/advisor", async (req, res) => {
  try {
    const { question, context } = req.body;
    const systemPrompt = `Eres el Asistente Experto en Recubrimientos y Pinturas de COLORLINK (Pintuco).
Respondes con precisión técnica, calidez y practicidad en español a contratistas, arquitectos, maestros de obra y propietarios de hogar.
Tus recomendaciones cubren: compatibilidad de productos, dilución, herramientas adecuadas, tiempos de curado, resolución de problemas (ampollamiento, caleo, eflorescencia) y normatividad técnica.
Sé conciso, estructurado con viñetas y profesional.`;

    const promptText = `Contexto del Proyecto actual:
${JSON.stringify(context || {})}

Pregunta del usuario:
${question}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: promptText,
      config: {
        systemInstruction: systemPrompt,
      },
    });

    return res.json({ success: true, reply: response.text });
  } catch (error: any) {
    console.error("AI Advisor Error:", error);
    return res.status(500).json({
      success: false,
      error: "No se pudo conectar con el asesor IA en este momento.",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`COLORLINK Server running on port ${PORT}`);
  });
}

startServer();
