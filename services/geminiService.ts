import { GoogleGenAI, Type } from "@google/genai";
import { AiResponseSchema } from '../types';

export const lookupAcronymWithGemini = async (term: string): Promise<AiResponseSchema | { error: string } | null> => {
  // Check if the key exists. 
  // Note: In Vite, we access it via process.env.API_KEY which is defined in vite.config.ts
  if (!process.env.API_KEY) {
    console.warn("API_KEY not found.");
    return { error: 'MISSING_KEY' };
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Explain the acronym "${term}" specifically in the context of Advertising Technology, Marketing, Social Media, or Finance. 
      
      Requirements:
      1. Provide the expansion (full form).
      2. Provide a concise definition (1-2 sentences).
      3. Categorize it into one of these: "Ad Tech", "Marketing", "Social Media", "Finance", or "Business".
      4. If the term is definitely NOT relevant to these fields, set isRelevant to false.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            expansion: {
              type: Type.STRING,
              description: "The full form of the acronym.",
            },
            definition: {
              type: Type.STRING,
              description: "A concise definition in a business context.",
            },
            category: {
              type: Type.STRING,
              description: "The primary category (e.g., 'Finance', 'Ad Tech', 'Social Media').",
            },
            isRelevant: {
              type: Type.BOOLEAN,
              description: "True if this is a known term in the requested fields.",
            },
          },
          required: ["expansion", "definition", "category", "isRelevant"],
        },
      },
    });

    const resultText = response.text;
    if (!resultText) return null;
    
    return JSON.parse(resultText) as AiResponseSchema;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};