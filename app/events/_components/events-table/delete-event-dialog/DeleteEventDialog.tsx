"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteEventDialogProps {
  eventId: string;
  open: boolean;
  onClose: () => void;
  
}

export function DeleteEventDialog({ eventId, open, onClose }: DeleteEventDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/events/${eventId}`, { method: "DELETE" });
      const body = await res.json();

      if (!res.ok) {
        toast.error(body.message ?? "Error al eliminar el evento");
        return;
      }

      toast.success("Evento eliminado correctamente");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Error inesperado al eliminar el evento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={val => !val && onClose()}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Eliminar Evento</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que quieres eliminar este evento? Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onClose} disabled={loading}>Cancelar</Button>
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>Eliminar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}