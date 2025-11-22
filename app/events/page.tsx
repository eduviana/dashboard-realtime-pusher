import { DataTable } from "@/components/shared/data-table/DataTable";

import { Button } from "@/components/ui/button";
import { Columns, EventData } from "./_components/columns/Columns";
import { CreateEventDialog } from "./_components/create-event-dialog/CreateEventDialog";

const mockEvents: EventData[] = [
  { id: "1", name: "Conferencia UX", date: "2025-06-15", status: "activo" },
  { id: "2", name: "Hackathon 2025", date: "2025-03-02", status: "inactivo" },
];

export default function EventsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold mb-6">Eventos</h1>
        <CreateEventDialog />
      </div>
      <DataTable columns={Columns} data={mockEvents} />
    </div>
  );
}