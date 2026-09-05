const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL as string | undefined;

export type LeadSource = "quiz" | "contact";

export interface QuizAnswer {
  readonly question: string;
  readonly answer: string;
}

export interface LeadPayload {
  readonly name: string;
  readonly phone: string;
  readonly email?: string;
  readonly message?: string;
  readonly answers?: readonly QuizAnswer[];
  readonly source: LeadSource;
}

/** Posts a lead to the admin backend. Silently no-ops if the admin URL isn't configured. */
export async function submitLead(payload: LeadPayload): Promise<void> {
  if (!ADMIN_API_URL) {
    console.warn("[leads] VITE_ADMIN_API_URL is not set — lead was not sent", payload);
    return;
  }

  const res = await fetch(`${ADMIN_API_URL}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Lead submission failed: ${res.status}`);
  }
}
