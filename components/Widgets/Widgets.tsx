import Card from "@/components/Card/Card"
import Today from "@/components/Card/Today"
import Conditions from "@/components/Card/Conditions"
import { cn } from "@/lib/utils"
import Sun from "../Card/Sun"
import Air from "./Air"

export default function Widgets({ className, data }: { className: string, data: any }) {

  const todayData = {
    address: data?.resolvedAddress,
    temp: Math.round(data?.currentConditions.temp),
    feelslike: Math.round(data?.currentConditions.feelslike),
    conditions: data?.currentConditions.conditions,
    tempmin: Math.round(data?.days[0].tempmin),
    tempmax: Math.round(data?.days[0].tempmax),
    description: data?.description
  }

  const widgetsData = {
    sun: {
      sunrise: data?.currentConditions.sunrise,
      sunset: data?.currentConditions.sunset,
    },
    wind: {},
    conditions: {
      icon: data?.currentConditions.icon,
      precipprob: data?.currentConditions.precipprob,
      cloudcover: data?.currentConditions.cloudcover,
      precip: data?.currentConditions.precip,
      humidity: data?.currentConditions.humidity,
      visibility: data?.currentConditions.visibility,
    },
    air: {
      uvindex: data?.currentConditions.uvindex,
      pressure: data?.currentConditions.pressure,
      airquality: 23
    },
    moon: {
      moonphase: data?.currentConditions.moonphase,
    }
  }

  return (
    <div className={cn(className)}>
      <Today className="col-span-2" data={todayData} />
      <Card type="forecast" />
      <Sun data={widgetsData.sun} />
      <Card type="wind" />
      <Conditions data={widgetsData.conditions} />
      <Air data={widgetsData.air} />
      <Card type="moon" />
    </div>
  )
}
