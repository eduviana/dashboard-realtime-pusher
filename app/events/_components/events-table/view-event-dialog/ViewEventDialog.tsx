"use client";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ViewEventDialogProps {
  eventId: string;
  open: boolean;
  onClose: () => void;
}

interface EventDataResponse {
  title: string;
  description: string;
  category: string;
}

export function ViewEventDialog({
  eventId,
  open,
  onClose,
}: ViewEventDialogProps) {
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState<EventDataResponse | null>(null);

  const closeDialog = useCallback(() => {
    setEvent(null);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const fetchEvent = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/events/${eventId}`);
        if (!res.ok) throw new Error("Error al obtener el evento");

        const data = await res.json();
        setEvent({
          title: data.title,
          description: data.description,
          category: data.category,
        });
      } catch (err) {
        console.error(err);
        toast.error("Error al cargar el evento");
        closeDialog();
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId, open, closeDialog]);

  return (
    <Dialog open={open} onOpenChange={(val) => !val && closeDialog()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="mb-4">
          <DialogTitle>Ver Evento</DialogTitle>
          <DialogDescription>
            Información completa del evento.
          </DialogDescription>
        </DialogHeader>

        {!event || loading ? (
          <p className="text-sm text-slate-500">Cargando...</p>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Título</Label>
              <Input value={event.title} disabled />
            </div>

            <div className="space-y-2">
              <Label>Descripción</Label>
              <Textarea value={event.description} rows={4} disabled />
            </div>

            <div className="space-y-2">
              <Label>Categoría</Label>
              <Input value={event.category} disabled />
            </div>

            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={closeDialog}>
                Cerrar
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}