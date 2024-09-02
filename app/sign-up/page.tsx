"use client";

import Image from "next/image";
import { Input } from "../_components/ui/input";
import { Button } from "../_components/ui/button";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../_components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import GoogleSignInButton from "../_components/googleSignInButton";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    firstName: z.string().min(1, "Por favor, insira o seu nome").max(50),
    lastName: z.string().min(1, "Por favor, insira o seu sobrenome").max(50),
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
    confirmPassword: z.string().min(1, "Por favor, confirme sua senha").max(30),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem",
  });

const SignUpPage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const name = values.firstName.concat(" ", values.lastName);

    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: values.email,
        password: values.password,
      }),
    });

    if (response.ok) {
      router.push("/login");
    } else {
      console.error("Falha ao cadastrar usuário.");
    }
  };

  return (
    <>
      <div className="my-[60px] flex justify-center">
        <Image src="/logo-login.png" alt="SAMPH" width={200} height={170} />
      </div>
      <div className="flex w-full justify-center bg-primary">
        <h2 className="py-3 text-xl font-semibold uppercase text-white">
          Cadastro
        </h2>
      </div>

      <Form {...form}>
        <form className="mt-6 px-5" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-normal">Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o nome"
                      {...field}
                      maxLength={50}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-normal">
                    Sobrenome
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o sobrenome"
                      {...field}
                      maxLength={50}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-normal">
                    E-mail
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o e-mail"
                      {...field}
                      maxLength={254}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-normal">Senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a senha"
                      {...field}
                      type="password"
                      maxLength={30}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-normal">
                    Confirmar senha
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a senha novamente"
                      {...field}
                      type="password"
                      maxLength={30}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="mt-6 w-full text-xl font-bold" type="submit">
            Cadastrar
          </Button>
        </form>
      </Form>

      <div className="mx-5 mt-4 flex items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-primary after:ml-4 after:block after:h-px after:flex-grow after:bg-primary">
        ou
      </div>

      <div className="mx-5 mt-4">
        <GoogleSignInButton />
      </div>

      <p className="mb-6 mt-2 px-5 text-sm">
        Já possui uma conta?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Faça seu Login.
        </Link>
      </p>
    </>
  );
};

export default SignUpPage;
