import DeletePoolButton from "@/app/_components/delete-pool-button";
import PhHistory from "@/app/_components/ph-history";
import PoolInformation from "@/app/_components/pool-information";
import SidebarContent from "@/app/_components/sidebar-content";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { db } from "@/app/_lib/db";
import { ChevronLeftIcon, ChevronRightIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface PoolPageProps {
  params: {
    id: string;
  };
}

const PoolPage = async ({ params }: PoolPageProps) => {
  const pool = await db.pool.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!pool) {
    return notFound();
  }

  const measurements = await db.measurement.findMany({
    where: {
      poolId: pool.id,
    },
    orderBy: {
      date: "desc",
    },
  });

  const lastMeasurement = measurements[0];

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-grow">
        <div className="relative h-[200px] w-full">
          <Image
            src={pool.imageUrl ? pool.imageUrl : "/sem-imagem.png"}
            alt={pool.name}
            className="object-cover"
            fill
          />

          <Button size="icon" className="absolute left-4 top-4" asChild>
            <Link href="/pools">
              <ChevronLeftIcon />
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" className="absolute right-4 top-4">
                <MenuIcon size={18} />
              </Button>
            </SheetTrigger>
            <SidebarContent />
          </Sheet>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between border-b border-solid border-gray-300 pb-5">
            <h1 className="text-xl font-medium text-primary">{pool.name}</h1>

            <Button className="gap-1 rounded-xl p-3" asChild>
              <Link href={`/update-pool/${pool.id}`}>
                <span className="text-xs">Editar Informações</span>
                <ChevronRightIcon size={18} />
              </Link>
            </Button>
          </div>

          {measurements.length > 0 ? (
            <div className="mt-5 flex flex-col items-center justify-center space-y-4">
              <h2 className="text-lg font-semibold text-primary">
                Última Medição:{" "}
                {format(lastMeasurement.date, "HH:mm", { locale: ptBR })} -{" "}
                {format(lastMeasurement.date, "dd/MM/yyyy", { locale: ptBR })}
              </h2>

              <div className="space-y-4">
                <div className="rounded-2xl border-2 border-solid border-primary p-5">
                  <h3 className="text-xl font-semibold text-primary">
                    Valor do pH:{" "}
                    {Number(lastMeasurement.phValue).toLocaleString("pt-BR", {
                      minimumFractionDigits: 3,
                      maximumSignificantDigits: 4,
                    })}
                  </h3>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="my-4">
            <PoolInformation pool={pool} />
          </div>

          <div className="my-4">
            <PhHistory measurements={measurements} />
          </div>
        </div>
      </div>

      <div className="px-5 pb-5">
        <DeletePoolButton pool={pool} />
      </div>
    </div>
  );
};

export default PoolPage;
