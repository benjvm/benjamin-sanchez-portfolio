import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .max(100, "Your name is too long."),
  email: z.string().trim().email("Please enter a valid email address.").max(254),
  message: z
    .string()
    .trim()
    .min(10, "Your message is too short.")
    .max(5000, "Your message is too long."),
  website: z.string().max(0, "Invalid submission.").optional().default(""),
});

export type ContactMessage = z.infer<typeof contactSchema>;
