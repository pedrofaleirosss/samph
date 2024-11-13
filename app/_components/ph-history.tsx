"use client";

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Measurement } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DataTable } from "./ui/data-table";
import { measurementColumns } from "../pools/[id]/_columns/index";

interface PhHistoryProps {
  measurements?: Measurement[];
}

const PhHistory = ({ measurements }: PhHistoryProps) => {
  const [showPhHistory, setShowPhHistory] = useState<boolean>(false);

  const tooglePhHistoryVisibility = () => {
    setShowPhHistory((prevState) => !prevState);
  };

  const variants = {
    open: { opacity: 1, y: 0, height: "auto" },
    closed: { opacity: 0, y: "-20%", height: 0 },
  };

  return (
    <>
      <Button
        className="flex items-center justify-start px-0"
        variant="secondary"
        onClick={tooglePhHistoryVisibility}
      >
        Histórico de Medições do pH
        {showPhHistory === false ? <ChevronDownIcon /> : <ChevronUpIcon />}
      </Button>

      <AnimatePresence>
        {showPhHistory ? (
          <motion.div
            key="ph-history" // Chave única para identificação
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ overflow: "hidden", minHeight: "20px" }}
          >
            <div className="mt-4">
              <DataTable
                columns={measurementColumns}
                data={measurements ?? []}
              />
            </div>
          </motion.div>
        ) : (
          ""
        )}
      </AnimatePresence>
    </>
  );
};

export default PhHistory;
