import { useState, useRef, useEffect } from "react";
import { ArrowRight, Sparkles, Bot, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/useAutoResizeTextarea";
import { CALENDLY_URL } from "@/data/solutions";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface VisitorContext {
  businessType?: string;
  interest?: string;
  painPoint?: string;
  urgency?: string;
  budgetSignal?: string;
  isExploring?: boolean;
}

const solutionGuidance = {
  audit: "A Business Audit is the cleanest first step: map workflows, find repetitive work, and rank AI opportunities by impact.",
  automation: "Process Automation is likely the best fit: connect your tools, reduce manual follow-up, and automate repeatable tasks.",
  chatbot: "An AI Chatbot or Assistant could fit well: answer common questions, qualify leads, and hand off to a human when needed.",
  analytics: "Data Analytics & Insights could help turn existing data into dashboards, reporting, and clearer decisions.",
  training: "AI Team Training could help your staff use ChatGPT or Claude safely in daily work.",
  security: "AI Security & Compliance is the right starting point if sensitive information or internal AI rules matter.",
  strategy: "AI Strategy Consulting is useful when you want a roadmap before committing to a build.",
};

function extractVisitorContext(messages: Message[], latestMessage: string): VisitorContext {
  const text = [...messages.filter((message) => message.role === "user").map((message) => message.content), latestMessage]
    .join(" ")
    .toLowerCase();
  const context: VisitorContext = {};

  if (/restaurant|food|bar|cafe|menu/.test(text)) context.businessType = "restaurant or food service";
  if (/real estate|realtor|property|broker/.test(text)) context.businessType = "real estate";
  if (/health|clinic|doctor|medical|dental|therapy/.test(text)) context.businessType = "healthcare or wellness";
  if (/retail|store|shop|ecommerce|e-commerce/.test(text)) context.businessType = "retail or ecommerce";
  if (/law|legal|attorney/.test(text)) context.businessType = "legal services";
  if (/construction|contractor|roofing|plumbing|hvac/.test(text)) context.businessType = "home services or contracting";

  if (/chatbot|assistant|agent|answer questions|customer service|support/.test(text)) context.interest = "chatbot";
  else if (/automat|workflow|manual|repetitive|follow up|review|email|appointment|scheduling/.test(text)) context.interest = "automation";
  else if (/data|dashboard|report|analytics|insight|spreadsheet/.test(text)) context.interest = "analytics";
  else if (/train|workshop|team|staff|learn/.test(text)) context.interest = "training";
  else if (/security|compliance|privacy|policy|hipaa|sensitive/.test(text)) context.interest = "security";
  else if (/strategy|roadmap|where do i start|where to start|plan/.test(text)) context.interest = "strategy";
  else if (/audit|assess|assessment|diagnose/.test(text)) context.interest = "audit";

  if (/too much time|wasting time|manual|slow|overwhelmed|busy|bottleneck|dropped|missed/.test(text)) {
    context.painPoint = "manual work or workflow bottlenecks";
  }
  if (/lead|sales|customer|client|inquir|booking|appointment/.test(text)) {
    context.painPoint = context.painPoint || "lead capture or customer response";
  }
  if (/asap|urgent|now|this week|soon|quick|immediately/.test(text)) context.urgency = "soon";
  if (/exploring|just looking|curious|not sure|research|learning|browsing/.test(text)) context.isExploring = true;
  if (/budget|price|cost|afford|expensive|cheap/.test(text)) context.budgetSignal = "pricing";

  return context;
}

function getDiscoveryQuestion(context: VisitorContext, messageCount: number) {
  if (!context.businessType) return "What kind of business are you running?";
  if (!context.painPoint) return "What is the most repetitive or frustrating task your team deals with right now?";
  if (!context.interest) return "Are you hoping for strategy, automation, a chatbot, analytics, or team training first?";
  if (!context.urgency && messageCount > 1) return "How soon would you want something like this working: this week, this month, or just exploring?";
  return "Would you like to book a 30-minute consultation so we can map the best first step?";
}

function hasAsked(messages: Message[], phrase: string) {
  return messages.some((message) => message.role === "assistant" && message.content.toLowerCase().includes(phrase));
}

function getIndustryExample(context: VisitorContext) {
  switch (context.businessType) {
    case "healthcare or wellness":
      return "Common first wins are appointment follow-up, patient intake, FAQs, internal documentation, and safer AI guidelines.";
    case "restaurant or food service":
      return "Common first wins are review responses, reservations, menu questions, catering inquiries, and staff prompt packs.";
    case "real estate":
      return "Common first wins are lead qualification, listing content, follow-up reminders, document summaries, and client FAQs.";
    case "retail or ecommerce":
      return "Common first wins are customer support, product questions, inventory insights, review analysis, and follow-up.";
    case "legal services":
      return "Common first wins are intake triage, internal knowledge lookup, document summaries, and AI usage policies.";
    case "home services or contracting":
      return "Common first wins are lead intake, estimate follow-up, scheduling, review responses, and missed-call workflows.";
    default:
      return "The best first win is usually a workflow that happens every week, takes too much staff time, or causes missed follow-up.";
  }
}

function formatContextLeadIn(context: VisitorContext) {
  const parts = [
    context.businessType ? `for a ${context.businessType} business` : "",
    context.painPoint ? `focused on ${context.painPoint}` : "",
  ].filter(Boolean);

  return parts.length ? `Based on what you shared ${parts.join(" and ")}, ` : "";
}

function generateEnbotResponse(userMessage: string, messages: Message[]): string {
  const lowerMessage = userMessage.toLowerCase();
  const context = extractVisitorContext(messages, userMessage);
  const userMessageCount = messages.filter((message) => message.role === "user").length + 1;
  const recommendation = context.interest ? solutionGuidance[context.interest as keyof typeof solutionGuidance] : "";
  const askedFrustratingTask = hasAsked(messages, "most repetitive or frustrating task");
  const askedTimeline = hasAsked(messages, "how soon");
  const hasBusinessSubstance = Boolean(context.businessType || context.interest || context.painPoint || context.budgetSignal);

  if (!hasBusinessSubstance && (lowerMessage.match(/^(yo|sup|wassup|hi|hello|hey|howdy|greetings|good morning|good afternoon|good evening)\b/) || lowerMessage.includes("whats up") || lowerMessage.includes("what's up"))) {
    return "Hey, glad you're here. I can help you figure out where AI would actually help your business instead of throwing random tools at you. What kind of business are you running?";
  }

  if (!hasBusinessSubstance && (lowerMessage.includes("how are you") || lowerMessage.includes("how's it going"))) {
    return "I'm doing great, thanks for asking. I'm best at helping visitors figure out practical AI next steps. What kind of business are you running?";
  }

  if (context.businessType && context.interest === "automation") {
    if (context.businessType === "home services or contracting") {
      return "Absolutely. For a contracting agency, Enbit could help automate lead intake, missed-call follow-up, estimate reminders, scheduling handoffs, review requests, and job-status updates. A smart first build would be one workflow that captures a new lead, asks the right qualifying questions, and alerts you or your team with a clean summary. What part of the process is eating the most time right now: getting leads, following up, scheduling, estimates, or paperwork?";
    }

    return `${formatContextLeadIn(context)}Process Automation is likely the best fit. We can start with one workflow, connect the tools you already use, and reduce the manual follow-up. What would you want automated first?`;
  }

  if (context.businessType && context.interest === "chatbot") {
    return `${formatContextLeadIn(context)}a custom AI assistant could answer common questions, qualify leads, and hand off serious inquiries to you. The best version is trained around your actual services, pricing rules, FAQs, and intake process. What should the assistant handle first?`;
  }

  if (lowerMessage.includes("what is enbit") || lowerMessage.includes("tell me about enbit") || lowerMessage.includes("who is enbit")) {
    return "Enbit helps businesses use AI in practical ways: strategy, automation, analytics, custom assistants, team training, and safer AI adoption. If you tell me your business type and biggest time drain, I can point you toward the best-fit service.";
  }

  if (lowerMessage.includes("who are you") || lowerMessage.includes("what are you") || lowerMessage.includes("your name")) {
    return "I'm Enbot, Enbit's website assistant. My job is to ask a few useful questions, recommend a likely AI service, and help you decide whether a consultation makes sense.";
  }

  if (lowerMessage.includes("contact") || lowerMessage.includes("talk") || lowerMessage.includes("consultation") || lowerMessage.includes("call") || lowerMessage.includes("reach") || lowerMessage.includes("book")) {
    return "The easiest next step is booking a 30-minute consultation here: https://calendly.com/nnesbitiv/30min. You can also email enbit.solutions@gmail.com or call 904-412-0065. Before the call, it helps to know your business type and the workflow you most want to improve.";
  }

  if (lowerMessage.includes("how can ai help") || lowerMessage.includes("what can ai do")) {
    return "AI can help by automating repetitive tasks, answering customer questions, summarizing information, improving follow-up, analyzing data, and helping your team move faster. The best use case depends on your business and where time is currently being lost. What workflow would you most like to improve?";
  }

  if (lowerMessage.includes("service") || lowerMessage.includes("offer") || lowerMessage.includes("what do you do")) {
    return "Enbit offers AI strategy, business audits, process automation, custom AI assistants, analytics dashboards, team training, web/app builds, and ongoing optimization. If you tell me what kind of business you run and what you want to improve, I can point you to the best fit.";
  }

  if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
    return "You're very welcome. If you want, tell me your business type and the task you most want off your plate, and I'll suggest the most practical AI starting point.";
  }

  if (lowerMessage.match(/^(bye|goodbye|see you|take care|later)/)) {
    return "Goodbye. When you're ready, Enbit can help map a practical first AI win for your business.";
  }

  if (lowerMessage.includes("joke") || lowerMessage.includes("funny")) {
    return "Why did the AI consultant bring a notebook? Because the best automation starts by listening first. Now, what workflow should we inspect for you?";
  }

  if (lowerMessage.includes("weather")) {
    return "I can't help much with the weather, but I can forecast AI opportunities. What kind of business are you running?";
  }

  if (context.businessType && !context.painPoint && !context.interest) {
    if (askedFrustratingTask && context.isExploring) {
      return `Totally fine - exploring is a smart place to start. For ${context.businessType}, I'd look for one low-risk win first: lead intake, follow-up, scheduling, or internal admin. Want a quick example?`;
    }

    if (askedFrustratingTask) {
      return `That makes sense. For ${context.businessType}, I would avoid overbuilding and look for one useful workflow first. Which area matters most: customer follow-up, scheduling, paperwork, or team productivity?`;
    }

    return `Got it - ${context.businessType}. ${getIndustryExample(context)} What task feels most repetitive right now?`;
  }

  if (context.budgetSignal) {
    return `${formatContextLeadIn(context)}pricing depends on scope, so I would start small: one workflow, one clear outcome, then expand if it proves useful. A 30-minute consult is best for narrowing scope before anyone spends money: ${CALENDLY_URL}`;
  }

  if (context.isExploring && (askedTimeline || userMessageCount > 2)) {
    return `${formatContextLeadIn(context)}no pressure. If you're exploring, I would check three places: leads, repeated staff tasks, and delays that cost money. Want a few AI ideas for your business type?`;
  }

  if (recommendation) {
    if (askedTimeline && context.isExploring) {
      return `${formatContextLeadIn(context)}${recommendation} Since you're just exploring, the next useful step is not a big build - it's identifying one workflow worth testing. Want a concrete example?`;
    }

    return `${formatContextLeadIn(context)}${recommendation} ${getDiscoveryQuestion(context, userMessageCount)}`;
  }

  return `That helps. To point you in the right direction, I need a little more context. ${getDiscoveryQuestion(context, userMessageCount)}`;
}

async function getEnbotResponse(userMessage: string, messages: Message[]) {
  const conversation = [...messages, { role: "user" as const, content: userMessage }];

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: conversation }),
    });

    if (!response.ok) throw new Error("Chat API unavailable");

    const data = await response.json();
    if (typeof data.reply === "string" && data.reply.trim()) {
      return data.reply.trim();
    }
  } catch (error) {
    if (import.meta.env.DEV) console.info("Using local Enbot fallback:", error);
  }

  return generateEnbotResponse(userMessage, messages);
}

export function HeroSection() {
  const [chatValue, setChatValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Enbot, your AI assistant. Ask me anything about how AI can transform your business!"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 60,
    maxHeight: 200,
  });

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (chatValue.trim()) {
      const userMessage = chatValue.trim();
      setChatValue("");
      adjustHeight(true);
      
      setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
      setIsTyping(true);
      
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 800));
      
      const response = await getEnbotResponse(userMessage, messages);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden relative">
      {/* Background effects */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" style={{ animationDelay: "0.7s" }} />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex w-full max-w-[22rem] min-w-0 flex-col justify-center space-y-6 sm:max-w-none">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm">
                <Sparkles className="mr-2 h-4 w-4 text-primary" />
                AI-Powered Business Solutions
              </div>
              <h1 className="max-w-full break-words text-2xl font-bold leading-tight tracking-tighter text-foreground [overflow-wrap:anywhere] min-[420px]:text-3xl sm:text-5xl xl:text-6xl/none">
                Transform Your Business with{" "}
                <span className="gradient-text">AI Consulting</span>
              </h1>
              <p className="max-w-[600px] text-foreground/75 md:text-xl">
                Enbit delivers cutting-edge AI solutions tailored to your business needs. From strategy to
                implementation, we help you harness the power of artificial intelligence.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="w-full rounded-full group sm:w-auto" asChild>
                <a href="#solutions">
                  Start Your AI Journey
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="w-full rounded-full sm:w-auto" asChild>
                <a href={CALENDLY_URL} target="_blank" rel="noreferrer">Schedule Consultation</a>
              </Button>
            </div>
          </div>

          <div className="flex min-w-0 items-center justify-start sm:justify-center">
            <div className="relative w-full max-w-[22rem] min-w-0 sm:max-w-lg">
              <div className="relative glass-effect rounded-2xl shadow-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center">
                    <Bot className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Enbot</h3>
                    <p className="text-sm text-muted-foreground">Your AI Assistant</p>
                  </div>
                </div>

                <div className="chat-scrollbar mb-6 max-h-64 min-h-[8rem] space-y-3 overflow-y-auto pr-2">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={cn(
                        "max-w-[88%] rounded-2xl p-4",
                        message.role === 'user' 
                          ? "ml-auto bg-muted/60" 
                          : "mr-auto bg-primary/10"
                      )}
                    >
                      <p className="break-words text-sm">{message.content}</p>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="mr-auto max-w-[88%] rounded-2xl bg-primary/10 p-4">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <div className="relative">
                  <Textarea
                    ref={textareaRef}
                    value={chatValue}
                    onChange={(e) => {
                      setChatValue(e.target.value);
                      adjustHeight();
                    }}
                    placeholder="Type your question..."
                    className="w-full resize-none bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary rounded-2xl pr-12"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!chatValue.trim()}
                    aria-label="Send message"
                    className={cn(
                      "absolute right-3 bottom-3 w-8 h-8 flex items-center justify-center rounded-full transition-colors",
                      chatValue.trim()
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    )}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

