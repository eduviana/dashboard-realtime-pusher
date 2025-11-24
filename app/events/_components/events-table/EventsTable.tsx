"use client";

import { useState } from "react";
import { DataTable } from "@/components/shared/data-table/DataTable";
import { Columns, EventData } from "./columns/Columns";
import { EditEventDialog } from "./edit-event-dialog/EditEventDialog";
import { DeleteEventDialog } from "./delete-event-dialog/DeleteEventDialog";
import { ViewEventDialog } from "./view-event-dialog/ViewEventDialog";

interface EventsTableProps {
  events: EventData[];
}

export function EventsTable({ events }: EventsTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [viewingId, setViewingId] = useState<string | null>(null);

  const handleEdit = (id: string) => setEditingId(id);
  const handleCloseEdit = () => setEditingId(null);

  const handleDelete = (id: string) => setDeletingId(id);
  const handleCloseDelete = () => setDeletingId(null);

  const handleView = (id: string) => setViewingId(id);
  const handleCloseView = () => setViewingId(null);

  return (
    <>
      <DataTable
        columns={Columns(handleView, handleEdit, handleDelete)}
        data={events}
      />

      {viewingId && (
        <ViewEventDialog
          eventId={viewingId}
          open={!!viewingId}
          onClose={handleCloseView}
        />
      )}

      {editingId && (
        <EditEventDialog
          eventId={editingId}
          open={!!editingId}
          onClose={handleCloseEdit}
        />
      )}

      {deletingId && (
        <DeleteEventDialog
          eventId={deletingId}
          open={!!deletingId}
          onClose={handleCloseDelete}
        />
      )}
    </>
  );
}