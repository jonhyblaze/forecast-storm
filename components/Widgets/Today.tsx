import Image from "next/image"
import Card, { Field } from "@/components/Card/Card"
import { cn } from "@/lib/utils"
import { ArrowDown, ArrowUp, Cloud, LucideLayoutTemplate } from "lucide-react"
import { TodayType } from "./types"
import { iconsMap } from "@/data/icons"
import units from "@/data/units"

const Today = ({ className, data }: { className?: string; data: TodayType }) => {
  const date = new Date()

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric"
  }).format(date)

  const formattedValues = {
    address: `${data.address}, ${formattedDate}`,
    temp: Math.floor(data.temp) + units.celcius,
    tempmin: Math.floor(data.tempmin) + units.celcius,
    tempmax: Math.floor(data.tempmax) + units.celcius,
    feelslike: Math.floor(data.feelslike) + units.celcius,
    conditions: data.conditions,
    icon: iconsMap[data.icon as keyof typeof iconsMap] ?? "/png/conditions/cloudy.png"
  }

  return (
    <Card type="today" className={cn("grid", className)}>
      <div className="flex gap-10 justify-between">
        <h3 className="uppercase 475px:text-lg text-foreground/50">Today</h3>
        <p className="uppercase 475px:text-lg text-foreground/50">{formattedValues.address}</p>
      </div>
      <header className="flex items-center gap-4 lg:gap-10">
        <div className="w-full flex justify-between">
          <h1 className="h-min font-bold leading-loose text-7xl sm:leading-tight sm:text-8xl lg:text-[120px]">{formattedValues.temp}</h1>
          {/*<div className="h-min w-48">*/}
            <Image
              src={formattedValues.icon}
              alt={formattedValues.icon}
              width={400}
              height={400}
              className="w-32 sm:w-40 lg:w-48 object-cover"
            />
          {/*</div>*/}
        </div>
      </header>
      <div className="flex justify-between">
        <Field
          name="Feels like"
          Icon={LucideLayoutTemplate}
          value={formattedValues.feelslike}
          className="pb-4"
        />
        {/*<p className="text-pretty w-sm">{data.description}</p>*/}
      </div>
      <footer className="self-end flex items-center justify-between">
        <Field name="Min" Icon={ArrowDown} value={formattedValues.tempmin} />
        <Field name="Max" Icon={ArrowUp} value={formattedValues.tempmax} />
        <Field name="Conditions" Icon={Cloud} value={formattedValues.conditions} />
      </footer>
    </Card>
  )
}

export default Today
