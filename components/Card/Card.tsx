import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

type CardType = "conditions" | "air" | "sun" | "moon" | "wind" | "today" | "forecast"

// const cardMap = {
//   today: {
//     title: "Today",
//     fields: [
//       { name: "Feels like", icon: CloudSun, value: "30" },
//       { name: "Min", icon: Cloud },
//       { name: "Max", icon: CloudDrizzle },
//       { name: "Conditions", icon: CloudDrizzle }
//     ]
//   },
//   conditions: {
//     title: "conditions",
//     fields: [
//       { name: "Conditions", icon: CloudSun, value: "Cloudy" },
//       { name: "Cloud cover", icon: Cloud, value: "84%" },
//       { name: "Precipation", icon: CloudDrizzle, value: "20%" },
//       { name: "Visibility", icon: Eye, value: "100%" },
//       { name: "Humidity", icon: Droplet, value: "74%" }
//     ]
//   },
//   air: {
//     title: "air",
//     fields: [
//       { name: "UV Index", icon: Sun, value: 2 },
//       { name: "Pressure", icon: Gauge, value: 1024 },
//       { name: "AirQ Index", icon: Waves, value: 142 }
//     ]
//   },
//   sun: {
//     title: "sun",
//     fields: [
//       { name: "Sunrise", icon: Sunrise },
//       { name: "Sunset", icon: Sunset }
//     ]
//   },
//   wind: {
//     title: "wind",
//     fields: [
//       { name: "Wind speed", icon: Wind, value: "22 m/s" },
//       { name: "Wind gust", icon: FlagTriangleRight, value: "300 m/s" }
//     ]
//   },
//   moon: {
//     title: "moon",
//     fields: [
//       { name: "Moonphase", icon: Moon },
//       { name: "Moonrise", icon: CircleArrowUp },
//       { name: "Moonset", icon: CircleArrowDown }
//     ]
//   }
// }
//
export const cardLayoutStyle = "bg-white/5 rounded-3xl p-6 pb-10 min-w-80"

type CardProps = {
  type: CardType
  children?: React.ReactNode
  className?: string
}

export default function Card({ type, children, className }: CardProps) {
  return (
    <div className={cn("bg-white/5 rounded-3xl p-6 pb-10 min-w-80", className)}>
      <h2 className="text-lg uppercase text-foreground/50">{type}</h2>
      {children}
    </div>
  )
}

type FieldProps = {
  name: string
  value: string | number
  Icon: LucideIcon
  className?: string
}

export const Field = ({ Icon, name, value, className }: FieldProps) => {
  return (
    <div className={cn("flex gap-4 items-center", className)}>
      <Icon size={24} />
      <div>
        <p className="text-lg font-bold leading-5 pb-0.5">{value}</p>
        <p className="text-foreground/50 leading-5">{name}</p>
      </div>
    </div>
  )
}
