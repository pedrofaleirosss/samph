import { getServerSession } from "next-auth";
import PoolForm from "../_components/pool-form";
import Header from "../_components/header";
import { authOptions } from "../_lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";

const CreatePoolPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
  }

  return (
    <>
      <Header />

      <div className="mt-6 px-5 pb-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-primary">Nova Piscina</h2>

          <Link href="/pools" className="flex items-center text-primary">
            <ChevronLeftIcon />
            <p className="font-semibold">Voltar</p>
          </Link>
        </div>

        <div className="mt-6">
          <PoolForm />
        </div>
      </div>
    </>
  );
};

export default CreatePoolPage;
