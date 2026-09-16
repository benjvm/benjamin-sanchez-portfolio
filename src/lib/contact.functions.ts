import { createServerFn } from "@tanstack/react-start";

import { contactSchema } from "./contact-schema";
import { sendContactEmail } from "./contact.server";

export const sendContactMessage = createServerFn({ method: "POST" })
  .validator(contactSchema)
  .handler(async ({ data }) => {
    if (data.website) {
      return { success: true };
    }

    await sendContactEmail(data);
    return { success: true };
  });
