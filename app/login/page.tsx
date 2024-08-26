import Image from "next/image";
import { Input } from "../_components/ui/input";
import { Button } from "../_components/ui/button";
import Link from "next/link";

const LoginPage = () => {
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
      <form className="mt-6 px-5">
        <label>E-mail</label>
        <Input placeholder="Digite o e-mail" className="my-2" type="email" />
        <label>Senha</label>
        <Input placeholder="Digite a senha" className="my-2" type="password" />
        <Button className="mt-6 w-full text-xl font-bold" type="submit">
          Entrar
        </Button>
      </form>
      <div className="mx-5 mt-4 flex items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-primary after:ml-4 after:block after:h-px after:flex-grow after:bg-primary">
        ou
      </div>
      <Button className="mx-5 mt-4 gap-2" variant="outline">
        <Image src="/google.png" alt="Google" width={24} height={24} />
        Entrar com Google
      </Button>
      <p className="mt-2 px-5 text-sm">
        Não tem uma conta ainda?{" "}
        <Link href="/sign-up" className="text-primary">
          Crie sua conta.
        </Link>
      </p>
    </>
  );
};

export default LoginPage;
