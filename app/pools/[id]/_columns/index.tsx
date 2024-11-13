"use client";

import { Measurement } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const measurementColumns: ColumnDef<Measurement>[] = [
  {
    accessorKey: "phValue",
    header: "Valor do pH",
    cell: ({ row: { original: measurement } }) => (
      <p>
        {Number(measurement.phValue).toLocaleString("pt-BR", {
          minimumFractionDigits: 3,
          maximumSignificantDigits: 4,
        })}
      </p>
    ),
  },
  {
    header: "Hora da Medição",
    accessorFn: (row) => format(row.date, "HH:mm", { locale: ptBR }),
    cell: ({ getValue }) => <p>{String(getValue())}</p>,
  },
  {
    header: "Data da Medição",
    accessorFn: (row) => format(row.date, "dd/MM/yyyy", { locale: ptBR }),
    cell: ({ getValue }) => <p>{String(getValue())}</p>,
  },
];
