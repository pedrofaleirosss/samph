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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Por favor, insira o e-mail")
    .email("Por favor, insira um e-mail válido"),
  password: z
    .string()
    .min(1, "Por favor, insira a senha")
    .min(8, "A senha deve ter no mínimo 8 caracteres"),
});

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [invalidCredentialsMessage, setInvalidCredentialsMessage] =
    useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const loginData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (loginData?.error == "CredentialsSignin") {
      setIsLoading(false);
      setInvalidCredentialsMessage(true);
    } else {
      setIsLoading(false);
      router.push("/pools");
    }
  };

  return (
    <>
      <div className="my-[60px] flex justify-center">
        <Image src="/logo-login.png" alt="SAMPH" width={200} height={170} />
      </div>
      <div className="flex w-full justify-center bg-primary">
        <h2 className="py-3 text-xl font-semibold uppercase text-white">
          Login
        </h2>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onChange={() => setInvalidCredentialsMessage(false)}
          className="mt-6 px-5"
        >
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-normal">
                    E-mail
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o e-mail" {...field} />
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
                    <div className="relative">
                      <Input
                        placeholder="Digite a senha"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />

                      <button
                        className="absolute inset-y-0 right-0 px-3 py-2"
                        onClick={togglePasswordVisibility}
                        type="button"
                      >
                        {showPassword ? (
                          <EyeOff className="text-primary" />
                        ) : (
                          <Eye className="text-primary" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {invalidCredentialsMessage && (
            <p className="mt-2 text-sm font-medium text-destructive">
              E-mail ou senha incorretos.
            </p>
          )}

          <Button className="mt-6 w-full text-xl font-bold" type="submit">
            {isLoading ? <Loader2 className="animate-spin" /> : "Entrar"}
          </Button>
        </form>
      </Form>

      <div className="mx-5 mt-4 flex items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-primary after:ml-4 after:block after:h-px after:flex-grow after:bg-primary">
        ou
      </div>

      <div className="mx-5 mt-4">
        <GoogleSignInButton />
      </div>

      <p className="mt-2 px-5 text-sm">
        Não tem uma conta ainda?{" "}
        <Link href="/sign-up" className="text-primary hover:underline">
          Crie sua conta.
        </Link>
      </p>
    </>
  );
};

export default LoginPage;
