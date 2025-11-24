import { NextRequest, NextResponse } from "next/server";
import { eventService } from "@/domains/events/event.services";
import { createEventSchema } from "@/domains/events/event.schema";

export async function GET() {
  try {
    const events = await eventService.getAll();
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("GET /api/events error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = createEventSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Invalid data",
          errors: parsed.error.issues,
        },
        { status: 400 }
      );
    }

    const event = await eventService.create(parsed.data);
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("POST /api/events error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}



export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, title, description, category } = body;

    if (!id) {
      return NextResponse.json({ message: "ID del evento requerido" }, { status: 400 });
    }

    const parsed = createEventSchema.safeParse({ title, description, category });
    if (!parsed.success) {
      return NextResponse.json(
        { message: "Datos inválidos", errors: parsed.error.issues },
        { status: 400 }
      );
    }

    const updatedEvent = await eventService.update(id, parsed.data);
    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (error) {
    console.error("PUT /api/events error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
