import { Prisma } from "@/generated/prisma/client";
import { eventRepository } from "./event.repository";

export class EventService {
  async create(data: Prisma.EventCreateInput) {
    const event = await eventRepository.create(data);
    return event;
  }

  async getAll() {
    return eventRepository.findAll();
  }

  async getById(id: string) {
    const event = await eventRepository.findById(id);
    return event;
  }

  async update(id: string, data: Prisma.EventUpdateInput) {
    const updated = await eventRepository.update(id, data);
    return updated;
  }

  async delete(id: string) {
    await eventRepository.delete(id);
  }
}

export const eventService = new EventService();