import Card, { Field } from "@/components/Card/Card"
import Badge from "@/components/Badge"
import { Sun, Gauge, Waves } from "lucide-react"
import { AirType } from "./types"
import { getUVLevel, getPressureLevel, getAirLevel } from "@/lib/helpers"

export default function Air({ data, className }: { data: AirType; className?: string }) {
  const uvLevel = getUVLevel(data.uvindex)
  const pressureLevel = getPressureLevel(data.pressure)
  const airLevel = getAirLevel(data.aqieur)

  return (
    <Card type="air" className={className}>
      <ul className="h-full grid grid-rows-3 gap-12 pt-10 md:p-0 md:gap-0">
        <li className="flex items-center justify-between">
          <Field name="UV Index" Icon={Sun} value={`${data.uvindex}`} />
          <Badge className="w-24" level={uvLevel.level}>
            {uvLevel.label}
          </Badge>
        </li>
        <li className="flex items-center justify-between">
          <Field name="Pressure" Icon={Gauge} value={`${data.pressure}`} />
          <Badge className="w-24" level={pressureLevel.level}>
            {pressureLevel.label}
          </Badge>
        </li>
        <li className="flex items-center justify-between">
          <Field name="Air Quality" Icon={Waves} value={`${data.aqieur}`} />
          <Badge className="w-24" level={airLevel.level}>
            {airLevel.label}
          </Badge>
        </li>
      </ul>
    </Card>
  )
}
