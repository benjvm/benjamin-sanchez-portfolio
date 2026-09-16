import { Resend } from "resend";

import type { ContactMessage } from "./contact-schema";

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character] ?? character,
  );
}

export async function sendContactEmail({ name, email, message }: ContactMessage) {
  const apiKey = process.env["RESEND_API_KEY"];
  const recipient = process.env["CONTACT_TO_EMAIL"];
  const sender = process.env["RESEND_FROM_EMAIL"];

  if (!apiKey || !recipient || !sender) {
    throw new Error("Contact email is not configured.");
  }

  const resend = new Resend(apiKey);
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br />");
  const { data, error } = await resend.emails.send({
    from: `Benjamin Sánchez Contact <${sender}>`,
    to: [recipient],
    replyTo: email,
    subject: `Portfolio contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `<h2>New portfolio contact</h2><p><strong>Name:</strong> ${safeName}</p><p><strong>Email:</strong> ${safeEmail}</p><p><strong>Message:</strong><br />${safeMessage}</p>`,
  });

  if (error || !data) {
    throw new Error("Resend could not deliver the contact message.");
  }

  return { id: data.id };
}
