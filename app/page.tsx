import Image from "next/image";
import { Button } from "./_components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <div className="relative h-[100vh] w-full">
      <div>
        <Image
          src="/piscina.png"
          fill
          className="object-cover"
          alt="Fundo de piscina"
        />

        <div className="custom-gradiente absolute flex h-[100vh] w-full justify-center"></div>

        <div className="absolute flex h-[100vh] w-full justify-center sm:hidden">
          <Image src="/linhas.png" width={1000} height={1000} alt="Linhas" />
        </div>

        <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform flex-col items-center space-y-20 p-10 text-center">
          <Image
            src="/logo-home.png"
            width={400}
            height={100}
            alt="SAMPH"
            className="object-cover"
          />

          <p className="text-white">Bem-vindo(a) ao SAMPH</p>

          <div className="flex flex-col gap-10">
            <Link href="/sign-up">
              <Button className="w-[300px] rounded-lg border-2 border-white bg-transparent py-4 text-xl font-bold">
                Cadastrar
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="secondary"
                className="w-[300px] rounded-lg text-xl font-bold"
              >
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
