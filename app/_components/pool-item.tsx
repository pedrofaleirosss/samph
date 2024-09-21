import { Pool } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface PoolItemProps {
  pool: Pool;
}

const PoolItem = ({ pool }: PoolItemProps) => {
  return (
    <Link href={`/pools/${pool.id}`}>
      <div className="relative h-[140px] w-full">
        <Image
          src={pool.imageUrl ? pool.imageUrl : "/sem-imagem.png"}
          alt={pool.name}
          fill
          className="rounded-xl object-cover"
        />
      </div>
      <p className="mb-4 mt-2">{pool.name}</p>
    </Link>
  );
};

export default PoolItem;
