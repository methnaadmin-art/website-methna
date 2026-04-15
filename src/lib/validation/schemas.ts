import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .email("Please enter a valid email address.");

export const emailCheckSchema = z.object({
  email: emailSchema,
});

export const checkoutSchema = z.object({
  email: emailSchema,
  planCode: z
    .string()
    .trim()
    .min(1, "A subscription plan code is required."),
  successUrl: z.string().url().optional(),
  cancelUrl: z.string().url().optional(),
});

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
