import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "contact.errors.nameRequired")
    .max(100, "contact.errors.nameTooLong"),
  email: z
    .string()
    .trim()
    .email("contact.errors.emailInvalid")
    .max(254, "contact.errors.emailTooLong"),
  message: z
    .string()
    .trim()
    .min(10, "contact.errors.messageTooShort")
    .max(5000, "contact.errors.messageTooLong"),
  website: z.string().max(0, "contact.errors.invalidSubmission").optional().default(""),
});

export type ContactMessage = z.infer<typeof contactSchema>;
