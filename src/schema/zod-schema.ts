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

export const shopSchema = z.object({
  name: z.string().min(1, "Shop name is required").optional(),
  subTitle: z.string().max(30, "Max 30 characters").optional().nullable(),
  description: z.string().max(150, "Max 150 characters").optional().nullable(),
  favicon: z.any().optional().optional().nullable(),
  image: z.any().optional().optional().nullable(),
});
