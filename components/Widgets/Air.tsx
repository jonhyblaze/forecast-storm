import { Sun, Gauge, Waves } from "lucide-react"
import Card, { Field } from "@/components/Card/Card"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"

type AirType = {
  uvindex: number
  pressure: number
  airquality: number
}

type LevelResult = {
  level?: BadgeLevel
  label: string
}

export default function Air({ data }: { data: AirType }) {
  const getUVLevel = (uvindex: number | undefined) : LevelResult => {
    if (uvindex === undefined || null) return { label: "No data" }

    if (uvindex <= 2) return { level: 1, label: "Low" }
    if (uvindex <= 5) return { level: 2, label: "Moderate" }
    if (uvindex <= 7) return { level: 3, label: "High" }
    if (uvindex <= 10) return { level: 4, label: "Very High" }
    return { level: 5, label: "Extreme" }
  }

  const getPressureLevel = (pressure: number | undefined) : LevelResult => {
    if (pressure == null) return { label: "No data" }
    if (pressure < 990) return { level: 1, label: "Very Low" }
    if (pressure <= 1005) return { level: 2, label: "Low" }
    if (pressure <= 1018) return { level: 3, label: "Normal" }
    if (pressure <= 1030) return { level: 4, label: "High" }
    return { level: 5, label: "Very High" }
  }

  const uvLevel = getUVLevel(data.uvindex)
  const pressureLevel = getPressureLevel(data.pressure)

  return (
    <Card type="air">
      <ul className="h-full grid grid-rows-3">
        <li className="flex items-center justify-between">
          <Field name="UV Index" Icon={Sun} value={`${data.uvindex}`} />
          <Badge className="w-24" level={uvLevel.level}>
            {uvLevel.label}
          </Badge>
        </li>
        <li className="flex items-center justify-between">
          <Field name="Pressure" Icon={Gauge} value={`${data.pressure}`} />
          <Badge className="w-24" level={pressureLevel.level}>{pressureLevel.label}</Badge>
        </li>
        <li className="flex items-center justify-between">
          <Field name="Air Quality" Icon={Waves} value={`${data.airquality}`} />
          <span>Badge</span>
        </li>
      </ul>
    </Card>
  )
}

type BadgeLevel = 1 | 2 | 3 | 4 | 5

type BadgeProps = {
  children: ReactNode
  level?: BadgeLevel
  className?: string
}

const Badge = ({
  children,
  className,
  level = 1
}: BadgeProps) => {
  const variations: Record<BadgeLevel, string> = {
    1: "bg-zinc-500/75",
    2: "bg-emerald-500/75",
    3: "bg-teal-500/75",
    4: "bg-orange-500/65",
    5: "bg-red-500/65"
  }

  const color = variations[level] ?? "bg-zinc-500"

  return (
    <div className={cn("text-sm leading-4 text-center rounded-full px-2 py-1", color, className)}>
      {children}
    </div>
  )
}
