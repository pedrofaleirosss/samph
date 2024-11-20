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
import { Check, Loader2 } from "lucide-react";
import { createPool } from "../_actions/create-pool";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../_lib/firebase";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import Link from "next/link";
import { Pool } from "@prisma/client";
import { deleteImage } from "../_actions/delete-image";
import { updatePool } from "../_actions/update-pool";
import { useRouter } from "next/navigation";

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
  clientName: z.string().optional(),
  clientContact: z.string().optional(),
});

interface poolFormProps {
  pool?: Pool;
}

const PoolForm = ({ pool }: poolFormProps) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      poolName: pool?.name ? pool.name : "",
      poolCapacity: pool?.capacity ? pool.capacity : "",
      street: pool?.street ? pool.street : "",
      neighborhood: pool?.neighborhood ? pool.neighborhood : "",
      number: pool?.number ? pool.number : 0,
      city: pool?.city ? pool.city : "",
      complement: pool?.complement ? pool.complement : "",
      clientName: pool?.clientName ? pool.clientName : "",
      clientContact: pool?.clientContact ? pool.clientContact : "",
    },
  });

  const fileRef = form.register("image");

  const uploadImage = async (files: FileList) => {
    if (!files || files.length === 0) {
      return "";
    }

    const file = files[0];
    const storageRef = ref(
      storage,
      `images/${file.name}-${Math.floor(Math.random() * 1000)}`,
    );

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

      const { image, ...otherValues } = values;

      let downloadURL = "";

      if (!pool) {
        if (image) {
          downloadURL = await uploadImage(image);
        }

        await createPool(otherValues, downloadURL);

        setIsDialogOpen(true);
      }

      if (pool) {
        if (image && image.length > 0) {
          if (pool.imageUrl) {
            deleteImage(pool.imageUrl);
          }
          downloadURL = await uploadImage(image);
        }
        await updatePool(
          otherValues,
          image && image.length > 0 ? downloadURL : pool.imageUrl,
          pool.id,
        );
        router.push(`/pools/${pool.id}`);
      }
    } catch (error) {
      setIsLoading(false);
      setIsButtonDisabled(false);
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsButtonDisabled(false);
      form.reset();
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="poolName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-normal">
                    Nome da Piscina <span className="text-red-600">*</span>
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
                    <Input
                      placeholder="Digite a rua"
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
              name="neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-normal">
                    Bairro
                  </FormLabel>
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
              name="clientName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-base font-normal">
                    Nome do Cliente
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o nome do cliente"
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
              name="clientContact"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-base font-normal">
                    Contato do Cliente
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o contato do cliente"
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
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : pool ? (
              "Editar"
            ) : (
              "Cadastrar"
            )}
          </Button>
        </form>
      </Form>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[60%] rounded-xl">
          <DialogHeader className="flex flex-col items-center">
            <Check
              className="rounded-full bg-primary p-2 text-white"
              size={50}
            />
            <DialogTitle className="py-4">Cadastro Efetuado!</DialogTitle>
            <DialogDescription>
              Piscina cadastrada com sucesso!
            </DialogDescription>
          </DialogHeader>
          <DialogClose asChild>
            <Button asChild>
              <Link href="/pools">Continuar</Link>
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PoolForm;
