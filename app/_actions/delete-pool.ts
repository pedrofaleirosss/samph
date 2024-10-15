"use server";

import { db } from "@/app/_lib/db";
import { Pool } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { deleteImage } from "./delete-image";

interface deletePoolProps {
  pool: Pool;
}

export const deletePool = async ({ pool }: deletePoolProps) => {
  if (pool.imageUrl) {
    deleteImage(pool.imageUrl);
  }

  try {
    await db.measurement.deleteMany({
      where: {
        poolId: pool.id,
      },
    });
    await db.pool.delete({
      where: {
        id: pool.id,
      },
    });
    revalidatePath("/pools");
  } catch (error) {
    console.log(error);
  }
};
