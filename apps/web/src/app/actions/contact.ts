"use server";

import type { ContactInput } from "@/lib/validations/contact";
import { contactSchema } from "@/lib/validations/contact";

export type SubmitContactResult = { ok: true } | { ok: false; message: string };

export async function submitContactAction(
  input: ContactInput,
): Promise<SubmitContactResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: "Please fix the highlighted fields." };
  }

  // Placeholder: integrate transactional email or CRM when wiring Phase 11+.
  await Promise.resolve();
  return { ok: true };
}
