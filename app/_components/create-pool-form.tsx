"use client";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { createPool } from "./_actions/create-pool";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../_lib/firebase";

const formSchema = z.object({
  poolName: z.string().min(1, "Por favor, insira o nome da piscina").max(50),
  poolCapacity: z.string().optional(),
  street: z.string().optional(),
  neighborhood: z.string().optional(),
  number: z.coerce.number().optional(),
  city: z.string().optional(),
  image: z
    .instanceof(FileList)
    .optional()
    .refine(
      (files) =>
        !files || files.length === 0 || files[0]?.size <= 5 * 1024 * 1024,
      "A imagem deve ter no máximo 5MB",
    )
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        ["image/jpeg", "image/png"].includes(files[0]?.type),
      "A imagem deve ser JPEG ou PNG",
    ),
  complement: z.string().optional(),
});

const CreatePoolForm = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      poolName: "",
      poolCapacity: "",
      street: "",
      neighborhood: "",
      number: 0,
      city: "",
      complement: "",
    },
  });

  const fileRef = form.register("image");

  const uploadImage = async (files: FileList) => {
    if (!files || files.length === 0) {
      return "";
    }

    const file = files[0];
    const storageRef = ref(storage, `images/${file.name}`);

    try {
      const uploadTaskSnapshot = await uploadBytesResumable(storageRef, file);

      const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);

      return downloadURL;
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      return "";
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      setIsButtonDisabled(true);
      console.log(values);

      if (values.image) {
        const downloadURL = await uploadImage(values.image);
        setImageURL(downloadURL);
        console.log(imageURL);
      }

      await createPool(
        values.poolName,
        imageURL,
        values.poolCapacity,
        values.street,
        values.neighborhood,
        values.number,
        values.city,
        values.complement,
      );
    } catch (error) {
      setIsLoading(false);
      setIsButtonDisabled(false);
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsButtonDisabled(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="poolName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-normal">
                  Nome da Piscina
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o nome da piscina"
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
            name="poolCapacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-normal">
                  Capacidade da Piscina
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite a capacidade da piscina"
                    {...field}
                    maxLength={20}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-normal">Rua</FormLabel>
                <FormControl>
                  <Input placeholder="Digite a rua" {...field} maxLength={50} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="neighborhood"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-normal">Bairro</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o bairro"
                    {...field}
                    maxLength={50}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex w-full gap-4">
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-base font-normal">
                    Número
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o número"
                      {...field}
                      maxLength={10}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-base font-normal">
                    Cidade
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a cidade"
                      {...field}
                      maxLength={50}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="complement"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-base font-normal">
                  Complemento
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o complemento"
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
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-normal">
                  Anexar Imagem
                </FormLabel>
                <FormControl>
                  <Input {...fileRef} type="file" accept="image/*" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="mt-6 w-full text-xl font-bold"
          type="submit"
          disabled={isButtonDisabled}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Cadastrar"}
        </Button>
      </form>
    </Form>
  );
};

export default CreatePoolForm;
