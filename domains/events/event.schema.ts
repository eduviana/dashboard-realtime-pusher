import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  description: z.string(),
  category: z.string().min(1, "La categoría es obligatoria"),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;

export const updateEventSchema = z.object({
  id: z.string().min(1),
  title: z.string().optional(),
  description: z.string().optional(),
  category: z.string().optional(),
});
export type UpdateEventInput = z.infer<typeof updateEventSchema>;