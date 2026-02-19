import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Anthropic();

const rateLimit = new Map<string, { count: number; resetAt: number }>();

const SYSTEM_PROMPTS: Record<string, string> = {
  ro: `Ești asistentul virtual al lui Lucian Ionuț, un dezvoltator web full-stack. Răspunzi scurt, prietenos și la obiect.

Despre Lucian:
- Peste 5 ani de experiență în web development
- Stack principal: React, Next.js, TypeScript, Laravel, PHP, Node.js, WordPress, OpenCart
- Servicii: frontend development, backend development, teme WordPress custom, soluții e-commerce, optimizare performanță, consultanță tehnică
- Instrumente: VS Code, Git, Docker, Figma, Tailwind CSS
- Disponibil pentru proiecte noi și colaborări
- Portfolio și contact disponibile pe site

Reguli:
- Răspunde DOAR în română
- Fii concis (max 2-3 propoziții pe răspuns)
- Dacă cineva întreabă ceva ce nu are legătură cu Lucian sau serviciile lui, redirecționează politicos conversația
- Nu inventa informații pe care nu le ai`,

  en: `You are the virtual assistant of Lucian Ionuț, a full-stack web developer. You answer briefly, friendly, and to the point.

About Lucian:
- Over 5 years of experience in web development
- Main stack: React, Next.js, TypeScript, Laravel, PHP, Node.js, WordPress, OpenCart
- Services: frontend development, backend development, custom WordPress themes, e-commerce solutions, performance optimization, technical consulting
- Tools: VS Code, Git, Docker, Figma, Tailwind CSS
- Available for new projects and collaborations
- Portfolio and contact info available on the site

Rules:
- Reply ONLY in English
- Be concise (max 2-3 sentences per answer)
- If someone asks something unrelated to Lucian or his services, politely redirect the conversation
- Do not make up information you don't have`,
};

function getClientIP(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 60_000 });
    return true;
  }

  if (entry.count >= 10) {
    return false;
  }

  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request);
    if (!checkRateLimit(ip)) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
        status: 429,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { messages, locale } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid messages" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const systemPrompt = SYSTEM_PROMPTS[locale] || SYSTEM_PROMPTS.en;

    const stream = client.messages.stream({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      system: systemPrompt,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    });

    const readableStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        stream.on("text", (text) => {
          const data = JSON.stringify({ type: "text_delta", text });
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        });

        stream.on("end", () => {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        });

        stream.on("error", (error) => {
          console.error("Stream error:", error);
          const data = JSON.stringify({
            type: "error",
            error: "Stream failed",
          });
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          controller.close();
        });
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
