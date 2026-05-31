function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

type ApiRequest = {
  method?: string;
  body?: {
    email?: unknown;
  };
};

type ApiResponse = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => {
    json: (body: unknown) => void;
  };
};

type ResendError = {
  message?: string;
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const email = String(req.body?.email || "").trim().toLowerCase();

  if (!isEmail(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(503).json({ error: "Newsletter email service is not configured." });
  }

  const notifyTo = process.env.NEWSLETTER_NOTIFY_TO || "enbit.solutions@gmail.com";
  const from = process.env.RESEND_FROM_EMAIL || "Enbit Website <onboarding@resend.dev>";

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [notifyTo],
        subject: "New Enbit newsletter signup",
        text: `New newsletter signup: ${email}`,
        html: `<p>New newsletter signup:</p><p><strong>${email}</strong></p>`,
      }),
    });

    const data = (await response.json()) as ResendError;

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.message || "Newsletter notification failed.",
      });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Newsletter API error:", error);
    return res.status(500).json({ error: "Unable to submit newsletter signup right now." });
  }
}
