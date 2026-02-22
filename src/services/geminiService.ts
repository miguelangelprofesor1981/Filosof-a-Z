import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `Eres un docente de filosofía erudito, paciente y socrático. 
No das respuestas directas si no es necesario; invitas a la reflexión, citas fuentes primarias 
y ayudas a desglosar conceptos complejos como la 'Dasein' o el 'Imperativo Categórico'. 
Tu tono es académico pero punk, rebelde contra la ignorancia y el pensamiento dogmático. 
Hablas con el usuario como un mentor que busca despertar su pensamiento crítico.`;

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export class PhilosophyAI {
  private ai: any;
  private chat: any;

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey });
    this.chat = this.ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }

  async *sendMessageStream(message: string): AsyncGenerator<string> {
    const result = await this.chat.sendMessageStream({ message });
    for await (const chunk of result) {
      yield chunk.text || "";
    }
  }

  async sendMessage(message: string): Promise<string> {
    const response: GenerateContentResponse = await this.chat.sendMessage({ message });
    return response.text || "El silencio es a veces la respuesta más profunda, pero en este caso, hubo un error en la conexión.";
  }
}
