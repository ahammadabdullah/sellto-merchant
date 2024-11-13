import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export const onboardingForm = z.object({
  shopName: z
    .string()
    .min(1, "Shop name is required")
    .max(15, "Max 15 characters"),
  shopLogo: z.any().optional(),
  subDomain: z
    .string()
    .min(1, "Subdomain is required")
    .regex(
      /^[a-zA-Z0-9-]+$/,
      "Subdomain can only contain letters, numbers, and hyphens"
    ),
  currency: z.string().min(1, "Currency is required"),
  description: z
    .string()
    .max(500, "Description must be 500 characters or less")
    .optional(),
  productTypes: z.string().optional(),
});
