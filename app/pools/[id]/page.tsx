import SidebarContent from "@/app/_components/sidebar-content";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { db } from "@/app/_lib/db";
import { ChevronLeftIcon, ChevronRightIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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

  return (
    <div>
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

          <Button className="gap-1 rounded-xl p-3">
            <span className="text-xs">Editar Informações</span>
            <ChevronRightIcon size={18} />
          </Button>
        </div>

        {pool.capacity ||
        pool.street ||
        pool.neighborhood ||
        pool.number! > 0 ||
        pool.city ||
        pool.complement ||
        pool.clientName ||
        pool.clientContact ? (
          <div className="space-y-2 border-b border-solid border-gray-300 py-5">
            {pool.capacity && <p>Capacidade: {pool.capacity}</p>}
            {pool.street && <p>Rua: {pool.street}</p>}
            {pool.neighborhood && <p>Bairro: {pool.neighborhood}</p>}
            {pool.number! > 0 && <p>Número: {pool.number}</p>}
            {pool.city && <p>Cidade: {pool.city}</p>}
            {pool.complement && <p>Complemento: {pool.complement}</p>}
            {pool.clientName && <p>Cliente: {pool.clientName}</p>}
            {pool.clientContact && <p>Contato: {pool.clientContact}</p>}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PoolPage;
