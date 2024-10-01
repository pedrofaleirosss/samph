"use server";

import { getServerSession } from "next-auth";
import { db } from "../_lib/db";
import { authOptions } from "../_lib/auth";

interface getPoolsProps {
  searchParams: {
    name?: string;
  };
}

export const getPools = async ({ searchParams }: getPoolsProps) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) return [];

  const filters: any = {
    userId: (session?.user as any).id,
  };

  if (searchParams?.name) {
    filters.name = {
      contains: searchParams.name,
      mode: "insensitive",
    };
  }

  return db.pool.findMany({
    where: filters,
  });
};
