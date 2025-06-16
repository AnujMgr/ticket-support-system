import { z } from "zod";
const fileSizeLimit = 5 * 1024 * 1024; // 5MB

export const ticketFormSchema = z.object({
  subject: z.string().min(3, { message: "Subject must be at least 3 characters" }),
  description: z.string().min(3, { message: "Description must be at least 3 characters" }),
  attachment: z
    .instanceof(File)
    .refine((file) => ["image/png", "image/jpeg", "image/jpg"].includes(file.type), {
      message: "Only PNG, JPG, and JPEG files are allowed",
    })
    .refine((file) => file.size <= fileSizeLimit, {
      message: "File size must be less than 5MB",
    })
    .optional(),
  status: z.enum(["open", "in_progress", "closed"]),
})
