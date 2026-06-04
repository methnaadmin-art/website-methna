import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .email("Please enter a valid email address.");

export const contactTicketSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name is required.")
    .max(120, "Name is too long."),
  email: emailSchema,
  subject: z
    .string()
    .trim()
    .min(3, "Subject is required.")
    .max(200, "Subject is too long."),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(2000, "Message is too long."),
  accountEmail: emailSchema.optional(),
});
