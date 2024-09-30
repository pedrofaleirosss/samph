"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Button } from "./ui/button";
import { Pool } from "@prisma/client";
import { deletePool } from "./_actions/delete-pool";
import { useRouter } from "next/navigation";

interface deletePoolButtonProps {
  pool: Pool;
}

const DeletePoolButton = ({ pool }: deletePoolButtonProps) => {
  const router = useRouter();

  const handleDeletePool = () => {
    deletePool({ pool });
    router.push("/pools");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant="destructive">
          Excluir Piscina
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[80%] rounded-xl">
        <DialogHeader>
          <DialogTitle>Excluir Piscina</DialogTitle>
          <DialogDescription>Deseja mesmo excluir a piscina?</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-row items-center justify-center gap-2">
          <DialogClose asChild>
            <Button className="w-[100px] bg-gray-300 font-semibold text-gray-700">
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="destructive"
              className="w-[100px]"
              onClick={handleDeletePool}
            >
              Excluir
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePoolButton;
