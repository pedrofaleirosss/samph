import { db } from "@/app/_lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(1, "Por favor, insira um nome").max(60),
  email: z
    .string()
    .min(1, "Por favor, insira o seu e-mail")
    .email("Por favor, insira um e-mail válido")
    .max(254),
  password: z
    .string()
    .min(1, "Por favor, insira uma senha")
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .max(30),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = userSchema.parse(body);

    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "Usuário com este e-mail já existe." },
        { status: 409 },
      );
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "Usuário criado com sucesso!" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ message: "Algo deu errado." }, { status: 500 });
  }
}
