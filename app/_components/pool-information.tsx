"use client";

import { Pool } from "@prisma/client";
import { Button } from "./ui/button";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface PoolInformationProps {
  pool: Pool;
}

const PoolInformation = ({ pool }: PoolInformationProps) => {
  const [showPoolInfo, setShowPoolInfo] = useState<boolean>(false);

  const tooglePoolInfoVisibility = () => {
    setShowPoolInfo((prevState) => !prevState);
  };

  const variants = {
    open: { opacity: 1, y: 0, height: "auto" },
    closed: { opacity: 0, y: "-20%", height: 0 },
  };

  const poolHasInfo =
    pool.capacity ||
    pool.street ||
    pool.neighborhood ||
    pool.number! > 0 ||
    pool.city ||
    pool.complement ||
    pool.clientName ||
    pool.clientContact
      ? true
      : false;

  return (
    <>
      <Button
        className="flex items-center justify-start px-0"
        variant="secondary"
        onClick={tooglePoolInfoVisibility}
      >
        Informações da Piscina
        {showPoolInfo === false ? <ChevronDownIcon /> : <ChevronUpIcon />}
      </Button>

      <AnimatePresence>
        {showPoolInfo === true && (
          <motion.div
            key="pool-info" // Chave única para identificação
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ overflow: "hidden", minHeight: "20px" }}
          >
            <div className="space-y-2">
              {poolHasInfo ? (
                <div>
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
                <p>Nenhuma informação cadastrada.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PoolInformation;
