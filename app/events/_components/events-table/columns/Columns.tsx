"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Pencil, Trash, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type EventData = {
  id: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
};

// Columns recibe los 3 handlers desde DataTable
export const Columns = (
  onView: (id: string) => void,
  onEdit: (id: string) => void,
  onDelete: (id: string) => void
): ColumnDef<EventData>[] => [
  {
    accessorKey: "title",
    header: () => <span className="text-center w-full block">Nombre</span>,
    cell: ({ getValue }) => (
      <span className="text-center w-full block">{getValue() as string}</span>
    ),
  },
  {
    accessorKey: "description",
    header: () => <span className="text-center w-full block">Descripción</span>,
    cell: ({ getValue }) => (
      <span className="text-center w-full block">{getValue() as string}</span>
    ),
  },
  {
    accessorKey: "category",
    header: () => <span className="text-center w-full block">Categoría</span>,
    cell: ({ getValue }) => (
      <span className="text-center w-full block">{getValue() as string}</span>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => <span className="text-center w-full block">Creado</span>,
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return (
        <span className="text-center w-full block">
          {date.toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: () => <span className="text-center w-full block"></span>,
    cell: ({ row }) => {
      const event = row.original;

      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView(event.id)}>
                <Eye className="w-4 h-4 mr-2" /> Ver
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(event.id)}>
                <Pencil className="w-4 h-4 mr-2" /> Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(event.id)}>
                <Trash className="w-4 h-4 mr-2" /> Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];