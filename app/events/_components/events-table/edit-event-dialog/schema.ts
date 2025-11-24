import { z } from "zod";


export const updateEventSchema = z.object({
  title: z.string().min(4).max(100),
  description: z.string().min(10).max(500),
  category: z.string().min(4).max(50),
});
export type UpdateEventFormData = z.infer<typeof updateEventSchema>;