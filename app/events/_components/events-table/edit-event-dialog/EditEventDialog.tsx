"use client";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UpdateEventFormData, updateEventSchema } from "./schema";

interface EditEventDialogProps {
  eventId: string;
  open: boolean;
  onClose: () => void;
}

export function EditEventDialog({
  eventId,
  open,
  onClose,
}: EditEventDialogProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<UpdateEventFormData>({
    resolver: zodResolver(updateEventSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
      category: "",
    },
  });

  const closeDialog = useCallback(() => {
    form.reset();
    form.clearErrors();
    onClose();
  }, [form, onClose]);

  // Cargar datos del evento al abrir
  useEffect(() => {
    if (!open) return;

    const fetchEvent = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/events/${eventId}`);
        if (!res.ok) {
          throw new Error("Error al obtener el evento");
        }
        const data = await res.json();
        form.reset({
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
  }, [eventId, open, form, closeDialog]);

  const onSubmit = async (data: UpdateEventFormData) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/events`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: eventId, ...data }),
      });

      const responseBody = await res.json();

      if (!res.ok) {
        toast.error(responseBody.message ?? "Error al actualizar el evento");
        return;
      }

      toast.success("Evento actualizado correctamente");
      closeDialog();
    } catch (error) {
      console.error(error);
      toast.error("Error inesperado al actualizar el evento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !val && closeDialog()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="mb-4">
          <DialogTitle>Editar Evento</DialogTitle>
          <DialogDescription>
            Modifica la información del evento.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Título del evento"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <div className="min-h-5">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Descripción del evento"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <div className="min-h-5">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Categoría del evento"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <div className="min-h-5">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter className="flex gap-2 justify-end">
              <Button
                variant="outline"
                type="button"
                onClick={closeDialog}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                Guardar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
