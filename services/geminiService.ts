
import { GoogleGenAI } from "@google/genai";
import { LENS_MAPPING, LIGHT_MAPPING, ENV_MAPPING, OPTICS_MAPPING } from "../constants";
import { ArtDirection } from "../types";

const MODEL_NAME = 'gemini-2.5-flash-image';

export const generateAIImage = async (
  prompt: string, 
  config: ArtDirection, 
  referenceImageBase64?: string | null
): Promise<string> => {
  // Always use process.env.API_KEY directly when initializing the GoogleGenAI client instance
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const technicalSuffix = `
    Lens: ${LENS_MAPPING[config.lens]}. 
    Lighting: ${LIGHT_MAPPING[config.light]}. 
    Environment: ${ENV_MAPPING[config.environment]}. 
    Optics: ${OPTICS_MAPPING[config.optics]}. 
    High-end production, professional photography.
  `;

  const parts: any[] = [{ text: `${prompt}. ${technicalSuffix}` }];

  if (referenceImageBase64) {
    const data = referenceImageBase64.split(',')[1] || referenceImageBase64;
    parts.unshift({
      inlineData: {
        data,
        mimeType: 'image/png'
      }
    });
  }
  
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: { parts },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    let imageUrl = '';
    // Iterate through all parts to find the image part, as the response may contain both image and text parts
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!imageUrl) throw new Error('No image was generated');
    return imageUrl;
  } catch (error) {
    console.error("Generation error:", error);
    throw error;
  }
};

export const editAIImage = async (base64Image: string, editInstruction: string): Promise<string> => {
  // Always use process.env.API_KEY directly when initializing the GoogleGenAI client instance
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const base64Data = base64Image.split(',')[1] || base64Image;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          { inlineData: { data: base64Data, mimeType: 'image/png' } },
          { text: editInstruction }
        ],
      }
    });

    let imageUrl = '';
    // Iterate through all parts to find the image part
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    }
    
    if (!imageUrl) throw new Error('No edited image was generated');
    return imageUrl;
  } catch (error) {
    console.error("Edit error:", error);
    throw error;
  }
};
