"use server";

import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/db";
import { getServerSession } from "next-auth";

export const createPool = async (
  poolName: string,
  imageURL: string,
  poolCapacity?: string,
  street?: string,
  neighborhood?: string,
  number?: number,
  city?: string,
  complement?: string,
) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Usuário não autenticado");
  }

  if (!session.user?.email) {
    return;
  }

  const user = await db.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  await db.pool.create({
    data: {
      name: poolName,
      capacity: poolCapacity,
      street: street,
      neighborhood: neighborhood,
      number: number,
      city: city,
      complement: complement,
      imageUrl: imageURL,
      userId: user?.id as any,
    },
  });
};
