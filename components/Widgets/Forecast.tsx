import Image from "next/image"
import Card from "@/components/Card/Card"
import { iconsMap } from "@/data/icons"
import { ForecastType } from "./types"
import { formatForecastDate } from "@/lib/helpers"
import units from "@/data/units"
import { cn } from "@/lib/utils"

export default function Forecast({ data, className }: { data: ForecastType, className?: string }) {
  return (
    <Card type="forecast" className={cn("h-full", className)}>
      <ul className="flex flex-col gap-6 pt-8">
        {data.map((day) => {
          const formattedData = {
            date: formatForecastDate(day.datetime),
            icon: iconsMap[day.icon],
            tempmin: Math.floor(day.tempmin) + units.celcius,
            tempmax: Math.floor(day.tempmax) + units.celcius
          }
          return (
            <li key={day.datetime} className="text-lg flex justify-between items-center">
              <span>{formattedData.date}</span>
              <span className="font-bold">
                {formattedData.tempmin} / {formattedData.tempmax}
              </span>
              <Image src={formattedData.icon} width={48} height={48} alt={day.icon} />
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
