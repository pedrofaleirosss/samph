"use server";

import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

interface createPoolProps {
  poolName: string;
  poolCapacity?: string;
  street?: string;
  neighborhood?: string;
  number?: number;
  city?: string;
  complement?: string;
  clientName?: string;
  clientContact?: string;
}

export const createPool = async (values: createPoolProps, imageURL: string) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Usuário não autenticado");
  }

  await db.pool.create({
    data: {
      name: values.poolName,
      capacity: values.poolCapacity,
      street: values.street,
      neighborhood: values.neighborhood,
      number: values.number,
      city: values.city,
      complement: values.complement,
      clientName: values.clientName,
      clientContact: values.clientContact,
      imageUrl: imageURL,
      userId: (session.user as any).id,
    },
  });

  revalidatePath("/pools");
};
