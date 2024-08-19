import Image from "next/image";
import { Input } from "../_components/ui/input";
import { Button } from "../_components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const SignUpPage = () => {
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
      <form className="mt-6 px-5">
        <label>Nome</label>
        <Input placeholder="Digite o nome" className="my-2" type="text" />
        <label>Sobrenome</label>
        <Input placeholder="Digite o sobrenome" className="my-2" type="text" />
        <label>E-mail</label>
        <Input placeholder="Digite o e-mail" className="my-2" type="email" />
        <label>Senha</label>
        <Input placeholder="Digite a senha" className="my-2" type="password" />
        <label>Confirmar senha</label>
        <Input
          placeholder="Digite a senha novamente"
          className="my-2"
          type="password"
        />
        <Link
          href="/login"
          className="mt-2 flex items-center text-sm text-primary"
        >
          <ArrowLeft size={18} />
          Login
        </Link>
        <Button className="my-6 w-full text-xl font-bold" type="submit">
          Cadastrar
        </Button>
      </form>
    </>
  );
};

export default SignUpPage;
