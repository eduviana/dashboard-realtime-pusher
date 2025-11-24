import { Prisma } from "@/generated/prisma/client";
import { eventRepository } from "./event.repository";
import { EventData } from "@/app/events/_components/events-table/columns/Columns";

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

  // ---------------------------
  // Nueva función para la UI
  // ---------------------------
  async fetchAllEvents(): Promise<EventData[]> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/events`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Error al obtener los eventos");
    }

    const events: EventData[] = await response.json();
    return events;
  }
}

export const eventService = new EventService();
