import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Anthropic();

const rateLimit = new Map<string, { count: number; resetAt: number }>();

const SYSTEM_PROMPTS: Record<string, string> = {
  ro: `Tu ești un asistent virtual care reprezintă un web developer cu experiență. Răspunzi în română, ești prietenos, profesionist și ajuți vizitatorii să înțeleagă ce servicii sunt disponibile.

Despre Lucian:
Sunt un web developer cu peste 9 ani de experiență, specializat în WordPress, Laravel și OpenCart. Am început să lucrez din al doilea an de facultate și de atunci am colaborat cu echipe internaționale, am dezvoltat teme premium pe ThemeForest (platforma Sweet-Themes cu peste 2.600 de vânzări) și am construit site-uri și magazine online pentru clienți din România și nu numai.

Experiență:
- Thecon.ro — WordPress, colaborare cu ModelTheme pe ThemeForest (2015–2019)
- Sweet-Themes (ThemeForest & CodeCanyon) — 2 teme WordPress + 6 CMS-uri în Laravel, peste 2.600 vânzări (2018–2025)
- ITeXclusiv.ro — site-uri WordPress custom și magazine online în OpenCart, până în prezent

Servicii & prețuri:
- Site de prezentare — de la 800 €
- Magazin online — de la 1.200 €

Disponibilitate: Complet disponibil pentru proiecte noi.

Reguli:
- Răspunde DOAR în română
- Fii concis și prietenos (max 3-4 propoziții pe răspuns)
- Dacă vizitatorul vrea o ofertă personalizată sau are întrebări specifice, îndeamnă-l să ia legătura direct prin formularul de contact sau email
- Dacă cineva întreabă ceva ce nu are legătură cu Lucian sau serviciile lui, redirecționează politicos conversația
- Nu inventa informații pe care nu le ai`,

  en: `You are the virtual assistant representing an experienced web developer. You reply in English, you are friendly, professional and help visitors understand the available services.

About Lucian:
He is a web developer with over 9 years of experience, specialized in WordPress, Laravel and OpenCart. He started working in his second year of university and since then has collaborated with international teams, developed premium themes on ThemeForest (Sweet-Themes platform with over 2,600 sales) and built websites and online stores for clients in Romania and abroad.

Experience:
- Thecon.ro — WordPress, collaboration with ModelTheme on ThemeForest (2015–2019)
- Sweet-Themes (ThemeForest & CodeCanyon) — 2 WordPress themes + 6 Laravel CMS projects, over 2,600 sales (2018–2025)
- ITeXclusiv.ro — custom WordPress websites and OpenCart online stores, ongoing

Services & pricing:
- Presentation website — from 800 €
- Online store — from 1,200 €

Availability: Fully available for new projects.

Rules:
- Reply ONLY in English
- Be concise and friendly (max 3-4 sentences per answer)
- If the visitor wants a custom quote or has specific questions, encourage them to reach out via the contact form or email
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
      max_tokens: 450,
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
