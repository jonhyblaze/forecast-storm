import { cardLayoutStyle } from "./Card"
import { cn } from "@/lib/utils"
import { Field } from "./Card"
import { ArrowDown, ArrowUp, Cloud, LucideLayoutTemplate } from "lucide-react"
import Image from "next/image"

const fields = {
  currentTemprature: "17°",
  feelsLike: {
    value: "17°",
    icon: LucideLayoutTemplate
  },
  min: {
    value: "10°",
    icon: ArrowDown
  },
  max: {
    value: "22°",
    icon: ArrowUp
  },
  conditions: {
    value: "Cloudy",
    icon: Cloud
  }
}

type TodayData = {
  address: string
  temp: number
  feelslike: number
  conditions: string
  tempmin: number
  tempmax: number
  description: string
}

const Today = ({ className, data }: { className?: string; data: TodayData }) => {
  const date = new Date()

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric"
  }).format(date)

  return (
    <div className={cn("grid", cardLayoutStyle, className)}>
      <div className="flex gap-10 justify-between">
        <h3 className="uppercase text-lg text-foreground/50">Today</h3>
        <p className="uppercase text-lg  text-foreground/50">
          {data.address}, {formattedDate}
        </p>
      </div>
      <header className="flex items-center gap-4 lg:gap-10 xl:gap-16">
        <div className="flex gap-2">
          <h1 className="font-bold text-[120px]">{data.temp}</h1>
          <div className="h-fit w-48">
            <Image
              src="/png/conditions/cloudy.png"
              alt="today's conditions icon"
              width={400}
              height={400}
              className="w-48 object-cover"
            />
          </div>
        </div>
      <p className="text-pretty">{data.description}</p>
      </header>
      <Field name="Feels like" Icon={fields.feelsLike.icon} value={data.feelslike} className="pb-4"/>
      <footer className="self-end flex items-center justify-between">
        <Field name="Min" Icon={fields.min.icon} value={data.tempmin} />
        <Field name="Max" Icon={fields.max.icon} value={data.tempmax} />
        <Field name="Conditions" Icon={fields.conditions.icon} value={data.conditions} />
      </footer>
    </div>
  )
}

export default Today
