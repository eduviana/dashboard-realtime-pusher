import { NextResponse } from "next/server";
import { eventService } from "@/domains/events/event.services";

interface Params {
  params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ message: "ID del evento requerido" }, { status: 400 });
    }

    const event = await eventService.getById(id);

    if (!event) {
      return NextResponse.json({ message: "Evento no encontrado" }, { status: 404 });
    }

    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.error("GET /api/events/[id] error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}


export async function DELETE(req: Request, { params }: Params) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ message: "ID del evento requerido" }, { status: 400 });
    }

    await eventService.delete(id);
    return NextResponse.json({ message: "Evento eliminado correctamente" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/events/[id] error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}