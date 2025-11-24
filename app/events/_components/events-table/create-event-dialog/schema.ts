import { z } from "zod";

export const createEventSchema = z.object({
  title: z
    .string()
    .min(4, "El título debe contener al menos 4 caracteres")
    .max(100, "Máximo 100 caracteres"),

  description: z
    .string()
    .min(10, "La descripción debe contener al menos 10 caracteres")
    .max(500, "Máximo 500 caracteres"),

  category: z
    .string()
    .min(4, "La categoría es obligatoria")
    .max(50, "Máximo 50 caracteres"),
});

export type CreateEventFormData = z.infer<typeof createEventSchema>;