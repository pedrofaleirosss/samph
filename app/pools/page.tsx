import { getServerSession } from "next-auth";
import Header from "../_components/header";
import Search from "../_components/search";
import { authOptions } from "../_lib/auth";
import { Button } from "../_components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const PoolsPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header />

      <div className="mt-6 px-5 pb-6">
        <h2 className="font-semibold text-primary">Minhas Piscinas</h2>

        <div className="mt-6">
          <Search />
        </div>

        <div>
          <Button
            className="mt-6 h-[140px] w-full rounded-xl border-2 border-primary bg-white hover:bg-gray-100"
            asChild
          >
            <Link
              href="/create-pool"
              className="flex h-full w-full items-center justify-center"
            >
              <PlusIcon className="text-primary" size={24} />
            </Link>
          </Button>
          <p className="mt-2">Adicionar nova piscina</p>
        </div>
      </div>
    </>
  );
};

export default PoolsPage;
