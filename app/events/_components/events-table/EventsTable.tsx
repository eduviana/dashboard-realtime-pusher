// "use client";

// import { useEffect, useState, useCallback } from "react";
// import { DataTable } from "@/components/shared/data-table/DataTable";
// import { Columns, EventData } from "./columns/Columns";
// import { EditEventDialog } from "./edit-event-dialog/EditEventDialog";
// import { DeleteEventDialog } from "./delete-event-dialog/DeleteEventDialog";
// import { ViewEventDialog } from "./view-event-dialog/ViewEventDialog";
// import { useEventsRealtime } from "../../_hooks/useEventsRealtime";

// interface EventsTableProps {
//   events: EventData[];
// }

// export function EventsTable({ events }: EventsTableProps) {
//   // Estado local que será actualizado por Pusher
//   const [items, setItems] = useState<EventData[]>(events);

//   // Estados de modales
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [deletingId, setDeletingId] = useState<string | null>(null);
//   const [viewingId, setViewingId] = useState<string | null>(null);

//   // Handlers de acciones en la tabla
//   const handleEdit = (id: string) => setEditingId(id);
//   const handleCloseEdit = () => setEditingId(null);

//   const handleDelete = (id: string) => setDeletingId(id);
//   const handleCloseDelete = () => setDeletingId(null);

//   const handleView = (id: string) => setViewingId(id);
//   const handleCloseView = () => setViewingId(null);

//   // Callbacks de realtime
//   const handleCreated = useCallback((event: EventData) => {
//     setItems((prev) => {
//       const exists = prev.some((e) => e.id === event.id);
//       return exists ? prev : [...prev, event];
//     });
//   }, []);

//   const handleUpdated = useCallback((event: EventData) => {
//     setItems((prev) =>
//       prev.map((e) => (e.id === event.id ? { ...e, ...event } : e))
//     );
//   }, []);

//   const handleDeleted = useCallback((id: string) => {
//     setItems((prev) => prev.filter((e) => e.id !== id));
//   }, []);

//   // Activamos la escucha realtime
//   useEventsRealtime(handleCreated, handleUpdated, handleDeleted);

//   // Si los eventos iniciales del servidor cambian,
//   // sincronizamos el estado local (esto ocurre al navegar entre páginas).
//   useEffect(() => {
//     setItems(events);
//   }, [events]);

//   return (
//     <>
//       <DataTable
//         columns={Columns(handleView, handleEdit, handleDelete)}
//         data={items}
//       />

//       {viewingId && (
//         <ViewEventDialog
//           eventId={viewingId}
//           open={!!viewingId}
//           onClose={handleCloseView}
//         />
//       )}

//       {editingId && (
//         <EditEventDialog
//           eventId={editingId}
//           open={!!editingId}
//           onClose={handleCloseEdit}
//         />
//       )}

//       {deletingId && (
//         <DeleteEventDialog
//           eventId={deletingId}
//           open={!!deletingId}
//           onClose={handleCloseDelete}
//         />
//       )}
//     </>
//   );
// }




"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/shared/data-table/DataTable";
import { Columns, EventData } from "./columns/Columns";
import { EditEventDialog } from "./edit-event-dialog/EditEventDialog";
import { DeleteEventDialog } from "./delete-event-dialog/DeleteEventDialog";
import { ViewEventDialog } from "./view-event-dialog/ViewEventDialog";
import { useEventsRealtime } from "../../_hooks/useEventsRealtime";


interface EventsTableProps {
  events: EventData[];
}

export function EventsTable({ events }: EventsTableProps) {
  // Estado local para manejar los eventos en tiempo real
  const [rows, setRows] = useState<EventData[]>(events);

  // Sincronizar por si el server-side rendering cambia
  useEffect(() => {
    setRows(events);
  }, [events]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [viewingId, setViewingId] = useState<string | null>(null);

  const handleEdit = (id: string) => setEditingId(id);
  const handleCloseEdit = () => setEditingId(null);

  const handleDelete = (id: string) => setDeletingId(id);
  const handleCloseDelete = () => setDeletingId(null);

  const handleView = (id: string) => setViewingId(id);
  const handleCloseView = () => setViewingId(null);

  // Integración con Pusher
  useEventsRealtime(
    // CREATE
    (event) => {
      setRows((prev) => [...prev, event]);
    },

    // UPDATE
    (event) => {
      setRows((prev) =>
        prev.map((item) => (item.id === event.id ? event : item))
      );
    },

    // DELETE
    (id) => {
      setRows((prev) => prev.filter((item) => item.id !== id));
    }
  );

  return (
    <>
      <DataTable
        columns={Columns(handleView, handleEdit, handleDelete)}
        data={rows}
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