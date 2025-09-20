import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  contactNumber: z
    .string()
    .regex(/^04\d{8}$/, "Contact number must be in the format 04xx xxx xxx"),
  companyWebsite: z.url("Must be a valid URL").optional().or(z.literal("")),
  message: z.string().optional().or(z.literal("")),
});

export type ContactFormData = z.infer<typeof contactSchema>;
