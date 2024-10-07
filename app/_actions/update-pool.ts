"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/db";
import { revalidatePath } from "next/cache";

interface updatePoolProps {
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

export const updatePool = async (
  values: updatePoolProps,
  imageURL: string | null,
  poolId: string,
) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Usuário não autenticado");
  }

  await db.pool.update({
    where: { id: poolId },
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
    },
  });

  revalidatePath(`/pools/${poolId}`);
  revalidatePath("/pools");
};
