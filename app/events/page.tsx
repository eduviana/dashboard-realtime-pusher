import { EventData } from "./_components/events-table/columns/Columns";
import { CreateEventDialog } from "./_components/events-table/create-event-dialog/CreateEventDialog";
import { eventService } from "@/domains/events/event.services";
import { EventsTable } from "./_components/events-table/EventsTable";

export default async function EventsPage() {
  const events: EventData[] = await eventService.fetchAllEvents();
  console.log(events);
  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold mb-6">Eventos</h1>
        <CreateEventDialog />
      </div>
      <EventsTable events={events} />
    </div>
  );
}
