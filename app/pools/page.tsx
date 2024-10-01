import { getServerSession } from "next-auth";
import Header from "../_components/header";
import Search from "../_components/search";
import { authOptions } from "../_lib/auth";
import { Button } from "../_components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import PoolItem from "../_components/pool-item";
import { getPools } from "../_data/get-pools";
import Home from "../page";

interface PoolsPageProps {
  searchParams: {
    name?: string;
  };
}

const PoolsPage = async ({ searchParams }: PoolsPageProps) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return Home();
  }

  const pools = await getPools({ searchParams });

  return (
    <>
      <Header />

      <div className="mt-6 px-5 pb-6">
        <h2 className="font-semibold text-primary">Minhas Piscinas</h2>

        <div className="mt-6">
          <Search />
        </div>

        <div className="mt-6">
          {pools.map((pool) => (
            <PoolItem key={pool.id} pool={pool} />
          ))}
        </div>

        <div>
          <Button
            className="w-full rounded-xl border-2 border-primary bg-white p-12 hover:bg-gray-100"
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
