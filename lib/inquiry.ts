/** Website inquiry form → Next.js /api/inquiry → Express backend */

export type InquiryFormData = {
  studentName: string;
  parentName: string;
  phone: string;
  email?: string;
  desiredClass: string;
  message?: string;
};

export type InquirySubmitResult =
  | { ok: true; id?: string }
  | { ok: false; message: string; field?: keyof InquiryFormData };

const INQUIRY_API = "/api/inquiry";

/** Bangladesh mobile: 01XXXXXXXXX */
export const INQUIRY_PHONE_REGEX = /^01[0-9]{9}$/;

export function normalizeInquiryPhone(phone: string): string {
  return phone.replace(/\s+/g, "").replace(/[()-]/g, "").trim();
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateInquiryClient(
  data: InquiryFormData,
  messages: {
    required: string;
    phoneInvalid: string;
    emailInvalid: string;
  }
): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.studentName) errors.studentName = messages.required;
  if (!data.parentName) errors.parentName = messages.required;
  if (!data.desiredClass) errors.desiredClass = messages.required;

  if (!data.phone) {
    errors.phone = messages.required;
  } else if (!INQUIRY_PHONE_REGEX.test(normalizeInquiryPhone(data.phone))) {
    errors.phone = messages.phoneInvalid;
  }

  if (data.email && !EMAIL_REGEX.test(data.email)) {
    errors.email = messages.emailInvalid;
  }

  return errors;
}

function mapServerMessageToField(
  message: string
): keyof InquiryFormData | undefined {
  const lower = message.toLowerCase();
  if (lower.includes("phone")) return "phone";
  if (lower.includes("email")) return "email";
  if (lower.includes("student")) return "studentName";
  if (lower.includes("parent") || lower.includes("guardian")) return "parentName";
  if (lower.includes("class")) return "desiredClass";
  return undefined;
}

/** POST inquiry to the website API route (proxies to backend MongoDB) */
export async function submitInquiry(
  payload: InquiryFormData
): Promise<InquirySubmitResult> {
  const body = {
    ...payload,
    phone: normalizeInquiryPhone(payload.phone),
    email: payload.email || undefined,
    message: payload.message || undefined,
  };

  try {
    const res = await fetch(INQUIRY_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = (await res.json().catch(() => ({}))) as {
      success?: boolean;
      error?: string;
      message?: string;
      id?: string;
    };

    if (!res.ok || data.success === false) {
      const message =
        data.error || data.message || "Failed to submit inquiry";
      return {
        ok: false,
        message,
        field: mapServerMessageToField(message),
      };
    }

    return { ok: true, id: data.id };
  } catch {
    return {
      ok: false,
      message: "Network error. Please check your connection and try again.",
    };
  }
}
