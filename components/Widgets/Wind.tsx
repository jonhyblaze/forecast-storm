import Card, { Field } from "@/components/Card/Card"
import Windrose from "@/components/svg/Windrose"
import units from "@/data/units"
import { Wind as LucideWind, FlagTriangleRight } from "lucide-react"
import { WindType } from "./types"
import { cn } from "@/lib/utils"

export default function Wind({ data, className }: { data: WindType, className?: string }) {
  const kmhtToMps = (kmh: number) => (Number(kmh * 1000) / 3600).toFixed(1)

  const formatWindUnit = (kmh: number) => {
    if (kmh) return `${kmhtToMps(kmh)} ${units.mps}`
    else return "No data"
  }

  return (
    <Card type="wind" className={cn("flex flex-col h-full", className)}>
      <div className="flex flex-col justify-between h-full pt-4 md:pt-2">
        <Windrose winddir={data.winddir} className="w-fit mx-auto" />
        <footer className="flex justify-between pt-4">
          <Field name="Wind speed" Icon={LucideWind} value={formatWindUnit(data.windspeed)} />
          <Field name="Wind gusts" Icon={FlagTriangleRight} value={formatWindUnit(data.windgust)} />
        </footer>
      </div>
    </Card>
  )
}
