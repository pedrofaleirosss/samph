import { db } from "@/app/_lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

const measurementSchema = z.object({
  poolId: z.string().min(1, "Id da piscina é obrigatório."),
  phValue: z.string().min(1, "Valor do pH é obrigatório."),
});

export async function POST(req: Request) {
  const body = await req.json();
  const { poolId, phValue } = measurementSchema.parse(body);

  try {
    const date = new Date();

    await db.measurement.create({
      data: {
        poolId,
        phValue: Number(phValue),
        date,
      },
    });

    revalidatePath("/pools");
    revalidatePath(`/pools/${poolId}`);

    return NextResponse.json(
      { message: "Medição cadastrada com sucesso!" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Algo deu errado.", error: error },
      { status: 500 },
    );
  }
}
