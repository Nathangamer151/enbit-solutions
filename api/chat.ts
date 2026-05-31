const ENBIT_CONTEXT = `
You are Enbot, the AI assistant for Enbit Solutions.
Enbit helps businesses adopt practical AI through strategy consulting, process automation, analytics, AI chatbots and assistants, team training, security/compliance guidance, business audits, prompt packs, and ongoing optimization.
Primary goal: have a helpful consultative conversation with potential clients, understand their business, identify the workflow or growth problem they want to solve, recommend a relevant Enbit service, and invite qualified users to book a 30-minute consultation at https://calendly.com/nnesbitiv/30min.
Tone: warm, concise, practical, confident, not pushy.
Ask one good discovery question at a time.
Answer direct questions directly before asking a follow-up.
If asked about a person, company, or fact you do not know from the website context, say you do not have that information instead of pretending.
Website context:
- Hero message: Enbit delivers AI solutions from strategy to implementation.
- AI Strategy Consulting: roadmap, opportunity mapping, tool selection, adoption guidance.
- Machine Learning Solutions: prediction, classification, scoring, forecasting, and custom model guidance.
- Data Analytics & Insights: dashboards, automated reporting, insight summaries, decision support.
- AI Chatbots & Assistants: customer questions, lead qualification, internal knowledge, trained business assistants.
- Process Automation: lead intake, follow-up, scheduling, review responses, task creation, notifications, summaries, and repetitive workflow automation.
- AI Security & Compliance: AI usage policies, sensitive data guidance, safer adoption.
- Foundation services: Business Audit, AI Prompt Pack, AI Team Training.
- Targeted services: Single Automation Build, AI Automation Bundle, Web & App Build.
- Enterprise services: AI Automation Systems and Custom AI Assistant.
- Recurring services: Enbit Optimization and Priority Support.
Do not claim Enbit has done work for a specific client unless the user provided that information.
Contact: enbit.solutions@gmail.com, 904-412-0065.
`;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ApiRequest = {
  method?: string;
  body?: {
    messages?: unknown;
  };
};

type ApiResponse = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => {
    json: (body: unknown) => void;
  };
};

type OpenAIContent = {
  text?: string;
};

type OpenAIOutputItem = {
  content?: OpenAIContent[];
};

type OpenAIResponse = {
  output_text?: string;
  output?: OpenAIOutputItem[];
  error?: {
    message?: string;
  };
};

function cleanMessages(messages: unknown): ChatMessage[] {
  if (!Array.isArray(messages)) return [];

  return messages
    .filter((message): message is ChatMessage => {
      if (!message || typeof message !== "object") return false;
      const item = message as Record<string, unknown>;
      return (item.role === "user" || item.role === "assistant") && typeof item.content === "string";
    })
    .slice(-12)
    .map((message) => ({
      role: message.role,
      content: message.content.slice(0, 1200),
    }));
}

function getOutputText(data: OpenAIResponse) {
  if (typeof data.output_text === "string") return data.output_text;

  const chunks = data.output
    ?.flatMap((item) => item.content || [])
    ?.map((content) => content.text)
    ?.filter(Boolean);

  return chunks?.join("\n") || "";
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(503).json({ error: "OpenAI API key is not configured." });
  }

  try {
    const messages = cleanMessages(req.body?.messages);

    if (!messages.length) {
      return res.status(400).json({ error: "At least one message is required." });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
        instructions: ENBIT_CONTEXT,
        input: messages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
        max_output_tokens: 450,
      }),
    });

    const data = (await response.json()) as OpenAIResponse;

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.message || "OpenAI request failed.",
      });
    }

    const reply = getOutputText(data).trim();

    return res.status(200).json({
      reply: reply || "I can help with that. What kind of business are you running, and what workflow do you want to improve first?",
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return res.status(500).json({ error: "Unable to generate a response right now." });
  }
}
