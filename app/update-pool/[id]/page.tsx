import { getServerSession } from "next-auth";
import Header from "../../_components/header";
import { authOptions } from "../../_lib/auth";
import { db } from "@/app/_lib/db";
import { notFound, redirect } from "next/navigation";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import PoolForm from "@/app/_components/pool-form";

interface UpdatePoolPageProps {
  params: {
    id: string;
  };
}

const UpdatePoolPage = async ({ params }: UpdatePoolPageProps) => {
  const session = await getServerSession(authOptions);

  const pool = await db.pool.findUnique({
    where: {
      id: params.id,
    },
    include: {
      user: true,
    },
  });

  if (!session?.user) {
    redirect("/");
  }

  if (!pool || pool.userId != (session.user as any).id) {
    return notFound();
  }

  return (
    <>
      <Header />

      <div className="mt-6 px-5 pb-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-primary">Editar Piscina</h2>

          <Link
            href={`/pools/${pool.id}`}
            className="flex items-center text-primary"
          >
            <ChevronLeftIcon />
            <p className="font-semibold">Voltar</p>
          </Link>
        </div>

        <div className="mt-6">
          <PoolForm pool={pool} />
        </div>
      </div>
    </>
  );
};

export default UpdatePoolPage;
