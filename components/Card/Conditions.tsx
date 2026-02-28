import Card, { Field } from "./Card"
import { Cloud, CloudDrizzle, Droplet, Eye, Umbrella } from "lucide-react"

type ConditionsType = {
  icon: string
  precipprob: number
  cloudcover: number
  precip: number
  visibility: number
  humidity: number
}

export default function Conditions({ data }: { data: ConditionsType }) {
  const umbrellaPhrase = "Don't forget umbrella!"
  return (
    <Card type="conditions">
      <ul className="grid grid-rows-3 h-full">
        <li className="w-full inline-flex items-center justify-between gap-10">
          <Field name="Rain chance" Icon={Umbrella} value={`${data.precipprob}%`} />
          {data.precipprob === 0 && (
            <p className="font-bold text-sky-400/75 w-2/5 text-right">{umbrellaPhrase}</p>
          )}
        </li>
        <li className="inline-flex items-center gap-10">
          <Field name="Cloud cover" Icon={Cloud} value={`${data.cloudcover}%`} className="w-1/2" />
          <Field name="Precipation" Icon={CloudDrizzle} value={`${data.precip} mm`} className="w-1/2" />
        </li>
        <li className="inline-flex items-center gap-10">
          <Field name="Visibility" Icon={Eye} value={`${data.visibility} km`} className="w-1/2" />
          <Field name="Humidity" Icon={Droplet} value={`${data.humidity}%`} className="w-1/2" />
        </li>
      </ul>
    </Card>
  )
}
