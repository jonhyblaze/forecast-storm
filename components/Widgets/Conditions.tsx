import Card, { Field } from "@/components/Card/Card"
import { Cloud, CloudDrizzle, Droplet, Eye, Umbrella } from "lucide-react"
import { ConditionsType } from "./types"
import units from "@/data/units"
import { cn } from "@/lib/utils"

export default function Conditions({ data, className }: { data: ConditionsType, className?: string }) {
  const umbrellaPhrase = "Don't forget umbrella!"

  const formatedValues = {
    precipprob: data.precipprob !== null ? data.precipprob.toFixed(0) + units.percent : "No data",
    cloudcover: data.cloudcover !== null ? data.cloudcover.toFixed(0) + units.percent : "No data",
    precip: data.precip !== null ? `${data.precip.toFixed(0)} ${units.milimeter}` : "No data",
    visibility: data.visibility !== null ? data.visibility.toFixed(1) + " km" : "No data",
    humidity: data.humidity !== null ? data.humidity.toFixed(0) + "%" : "No data"
  }

  return (
    <Card type="conditions" className={cn(className)}>
      <ul className="h-full grid grid-rows-3 gap-12 pt-10 md:p-0 md:gap-0">
        <li className="w-full inline-flex items-center justify-between gap-10">
          <Field name="Rain chance" Icon={Umbrella} value={formatedValues.precipprob} />
          {data?.precipprob > 30 && (
            <p className="font-bold text-sky-400/75 w-2/5 text-right">{umbrellaPhrase}</p>
          )}
        </li>
        <li className="inline-flex items-center gap-10">
          <Field name="Cloud cover" Icon={Cloud} value={formatedValues.cloudcover} className="w-1/2" />
          <Field name="Precipation" Icon={CloudDrizzle} value={formatedValues.precip} className="w-1/2" />
        </li>
        <li className="inline-flex items-center gap-10">
          <Field name="Visibility" Icon={Eye} value={formatedValues.visibility} className="w-1/2" />
          <Field name="Humidity" Icon={Droplet} value={formatedValues.humidity} className="w-1/2" />
        </li>
      </ul>
    </Card>
  )
}
