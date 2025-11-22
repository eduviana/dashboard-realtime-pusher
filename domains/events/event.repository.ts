import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/db/prisma";

export class EventRepository {
  async create(data: Prisma.EventCreateInput) {
    return prisma.event.create({
      data,
    });
  }

  async findAll() {
    return prisma.event.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string) {
    return prisma.event.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.EventUpdateInput) {
    return prisma.event.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    await prisma.event.delete({
      where: { id },
    });
  }
}

export const eventRepository = new EventRepository();