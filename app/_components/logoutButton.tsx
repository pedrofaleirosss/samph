"use client";

import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  const handleLogoutClick = () => {
    signOut({
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="justify-start gap-2" variant="ghost">
          <LogOutIcon size={18} />
          Sair da conta
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[80%] rounded-xl">
        <DialogHeader>
          <DialogTitle>Sair</DialogTitle>
          <DialogDescription>
            Deseja mesmo sair da plataforma?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-row items-center justify-center gap-2">
          <DialogClose asChild>
            <Button variant="ghost" className="w-[100px]">
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="destructive"
              onClick={handleLogoutClick}
              className="w-[100px]"
            >
              Sair
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutButton;
