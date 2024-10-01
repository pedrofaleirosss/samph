"use server";

import { db } from "@/app/_lib/db";
import { storage } from "@/app/_lib/firebase";
import { Pool } from "@prisma/client";
import { deleteObject, ref } from "firebase/storage";
import { revalidatePath } from "next/cache";

interface deletePoolProps {
  pool: Pool;
}

const deleteImage = async (imageUrl: string) => {
  const imageRef = ref(storage, imageUrl);

  try {
    await deleteObject(imageRef);
  } catch (error) {
    console.error("Erro ao deletar imagem: ", error);
  }
};

export const deletePool = async ({ pool }: deletePoolProps) => {
  if (pool.imageUrl) {
    deleteImage(pool.imageUrl);
  }

  try {
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
