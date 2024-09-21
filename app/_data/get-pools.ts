"use server";

import { getServerSession } from "next-auth";
import { db } from "../_lib/db";
import { authOptions } from "../_lib/auth";

export const getPools = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) return [];

  return db.pool.findMany({
    where: {
      userId: (session?.user as any).id,
    },
  });
};
