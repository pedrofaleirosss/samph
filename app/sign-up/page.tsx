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
import GoogleSignInButton from "../_components/google-sign-in-button";
import { useState } from "react";
import { Check, Eye, EyeOff, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../_components/ui/dialog";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailConflictMessage, setEmailConflictMessage] =
    useState<boolean>(false);
  const [signUpErrorMessage, setSignUpErrorMessage] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

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
    setIsButtonDisabled(true);
    setIsLoading(true);
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
      setIsButtonDisabled(false);
      setIsLoading(false);
      setIsDialogOpen(true);
    } else {
      setIsButtonDisabled(false);
      setIsLoading(false);
      if (response.statusText === "Conflict") {
        return setEmailConflictMessage(true);
      }
      setSignUpErrorMessage(true);
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
        <form
          className="mt-6 px-5"
          onSubmit={form.handleSubmit(onSubmit)}
          onChange={() => {
            setEmailConflictMessage(false);
            setSignUpErrorMessage(false);
          }}
        >
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

            {emailConflictMessage && (
              <p className="mt-2 text-sm font-medium text-destructive">
                Este e-mail já está sendo utilizado por outro usuário.
              </p>
            )}

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
                        {...field}
                        type={showPassword ? "text" : "password"}
                        maxLength={30}
                      />

                      <button
                        className="absolute inset-y-0 right-0 px-3 py-2"
                        onClick={togglePasswordVisibility}
                        type="button"
                      >
                        {showPassword ? (
                          <Eye className="text-primary" />
                        ) : (
                          <EyeOff className="text-primary" />
                        )}
                      </button>
                    </div>
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
                    <div className="relative">
                      <Input
                        placeholder="Digite a senha novamente"
                        {...field}
                        type={showConfirmPassword ? "text" : "password"}
                        maxLength={30}
                      />

                      <button
                        className="absolute inset-y-0 right-0 px-3 py-2"
                        onClick={toggleConfirmPasswordVisibility}
                        type="button"
                      >
                        {showConfirmPassword ? (
                          <Eye className="text-primary" />
                        ) : (
                          <EyeOff className="text-primary" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {signUpErrorMessage && (
            <p className="mt-2 text-sm font-medium text-destructive">
              Erro ao cadastrar usuário. Tente novamente mais tarde.
            </p>
          )}

          <Button
            className="mt-6 w-full text-xl font-bold"
            type="submit"
            disabled={isButtonDisabled}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Cadastrar"}
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[60%] rounded-xl">
          <DialogHeader className="flex flex-col items-center">
            <Check
              className="rounded-full bg-primary p-2 text-white"
              size={50}
            />
            <DialogTitle className="py-4">Cadastro Efetuado!</DialogTitle>
            <DialogDescription>
              Seu cadastro foi realizado com sucesso.
            </DialogDescription>
          </DialogHeader>
          <DialogClose asChild>
            <Button asChild>
              <Link href="/login">Continuar</Link>
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SignUpPage;
