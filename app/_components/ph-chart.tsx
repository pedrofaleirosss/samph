"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";

const chartConfig = {
  phValue: {
    label: "phValue",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

type DailyAveragePH = {
  date: Date;
  phValue: string;
};

interface PhChartProps {
  dailyAveragePH: DailyAveragePH[];
}

const PhChart = ({ dailyAveragePH }: PhChartProps) => {
  const chartData = [{}];

  if (dailyAveragePH.length > 0) {
    chartData.pop();
  }

  dailyAveragePH.map((data) => {
    chartData.push({
      day: new Intl.DateTimeFormat("pt-BR", { weekday: "short" }).format(
        data.date,
      ),
      phValue: data.phValue,
    });
  });

  return (
    <Card className="rounded-sm">
      <CardHeader className="bg-white">
        <CardTitle className="text-primary">Média diária do pH</CardTitle>
        <CardDescription className="text-primary">
          {format(dailyAveragePH[0].date, "dd/MM/yyyy", {
            locale: ptBR,
          })}
          {" até "}
          {format(
            dailyAveragePH[dailyAveragePH.length - 1].date,
            "dd/MM/yyyy",
            {
              locale: ptBR,
            },
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="bg-white">
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis domain={[0, 14]} width={15} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="phValue" fill="#015CAF" radius={4}>
              <LabelList
                position="top"
                offset={12}
                className="fill-primary"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PhChart;
