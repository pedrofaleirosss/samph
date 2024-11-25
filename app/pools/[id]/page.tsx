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
import { toZonedTime } from "date-fns-tz";

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

  const getLast7Days = () => {
    const today = new Date();
    const last7Days = [];
    for (let i = 0; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i); // Subtrai dias para pegar os 7 últimos
      last7Days.push(date.toISOString().split("T")[0]); // Formata como 'yyyy-MM-dd'
    }
    return last7Days;
  };

  const last7Days = getLast7Days();

  const groupedByDay = measurements.reduce(
    (acc, measurement) => {
      const date = new Date(measurement.date);

      // Formata a data no formato 'yyyy-MM-dd', respeitando o fuso horário
      const localDay = format(date, "yyyy-MM-dd", { locale: ptBR });

      // Verifica se a data está dentro dos últimos 7 dias
      if (last7Days.includes(localDay)) {
        if (!acc[localDay]) {
          acc[localDay] = [];
        }
        acc[localDay].push(parseFloat(String(measurement.phValue))); // Certifique-se de que phValue é um número
      }
      return acc;
    },
    {} as Record<string, number[]>,
  );

  // Calcular a média por dia
  const dailyAveragePH = Object.entries(groupedByDay)
    .map(([day, values]) => {
      const average =
        values.reduce((sum, value) => sum + value, 0) / values.length;

      // Criar uma data no fuso horário local, ajustando para início do dia
      const [year, month, dayOfMonth] = day.split("-").map(Number);
      const localDate = new Date(year, month - 1, dayOfMonth); // Note que o mês é 0-indexado

      return {
        date: localDate,
        phValue: average.toFixed(2), // Mantém 2 casas decimais
      };
    })
    .reverse(); // Inverte a ordem para a data mais antiga primeiro

  const timeZone = "America/Sao_Paulo";
  const zonedDate = lastMeasurement
    ? toZonedTime(lastMeasurement.date, timeZone)
    : "";

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
                Última Medição: {format(zonedDate, "HH:mm", { locale: ptBR })} -{" "}
                {format(zonedDate, "dd/MM/yyyy", { locale: ptBR })}
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
            <div>
              <div className="mt-5 flex flex-col items-center justify-center space-y-4">
                <h2 className="text-lg font-semibold text-primary">
                  Última Medição: --
                </h2>

                <div className="space-y-4">
                  <div className="rounded-2xl border-2 border-solid border-primary p-5">
                    <h3 className="text-xl font-semibold text-primary">
                      Valor do pH: --
                    </h3>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-center text-sm text-primary">
                Conecte o sensor de pH
              </p>
            </div>
          )}

          <div className="my-4">
            <PoolInformation pool={pool} />
          </div>

          <div className="my-4">
            <PhHistory
              measurements={measurements}
              dailyAveragePH={dailyAveragePH}
            />
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
