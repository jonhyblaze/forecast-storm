import Image from "next/image"
import Topbar from "@/components/Topbar"
import SkeletonWidgets from "@/components/Widgets/SkeletonWidgets"
import Widgets from "@/components/Widgets/Widgets"
import Today from "@/components/Widgets//Today"
import Forecast from "@/components/Widgets//Forecast"
import Sun from "@/components/Widgets//Sun"
import Wind from "@/components/Widgets//Wind"
import Conditions from "@/components/Widgets//Conditions"
import Air from "@/components/Widgets//Air"
import Moon from "@/components/Widgets//Moon"
import { getWeatherData } from "@/lib/weather"
import { getClientLocation } from "@/lib/location"
import { ForecastDay, NormalizedWeather } from "@/components/Widgets/types"
import { bgMap } from "@/data/icons"

export default async function Home({ searchParams }: { searchParams: Promise<{ city?: string }> }) {
  const { city: searchCity } = await searchParams

  let activeCity = searchCity

  if (!activeCity) {
    activeCity = await getClientLocation()
  }

  const { data, error } = await getWeatherData(activeCity)

  const normalizedWeather: NormalizedWeather = {
    today: {
      address: data?.resolvedAddress,
      description: data?.description,
      icon: data?.currentConditions.icon,
      temp: data?.currentConditions.temp,
      feelslike: data?.currentConditions.feelslike,
      conditions: data?.currentConditions.conditions,
      tempmin: data?.days[0].tempmin,
      tempmax: data?.days[0].tempmax
    },
    forecast: data?.days.slice(1, 5).map((day: ForecastDay) => ({
      datetime: day.datetime,
      tempmax: day.tempmax,
      tempmin: day.tempmin,
      icon: day.icon
    })),
    sun: {
      sunrise: data?.currentConditions.sunrise,
      sunset: data?.currentConditions.sunset
    },
    wind: {
      windspeed: data?.currentConditions.windspeed,
      windgust: data?.currentConditions.windgust,
      winddir: data?.currentConditions.winddir
    },
    conditions: {
      icon: data?.currentConditions.icon,
      precipprob: data?.currentConditions.precipprob,
      cloudcover: data?.currentConditions.cloudcover,
      precip: data?.currentConditions.precip,
      humidity: data?.currentConditions.humidity,
      visibility: data?.currentConditions.visibility
    },
    air: {
      uvindex: data?.currentConditions.uvindex,
      pressure: data?.currentConditions.pressure,
      aqieur: data?.currentConditions.aqieur
    },
    moon: {
      address: data?.resolvedAddress,
      moonphase: data?.currentConditions.moonphase,
    }
  }

  const computedBg: string = bgMap[normalizedWeather.today.icon ?? "cloudy"]

  if (error === "NOT_FOUND" || error === "SERVICE_DOWN") {
    return (
      <main className="mx-auto gap-8 py-10 px-5 sm:p-10 space-y-6 max-w-screen-2xl">
        <Topbar hasError={true} />
        <SkeletonWidgets className="grid grid-cols-4 grid-rows-2 gap-10" />
      </main>
    )
  }

  return (
    <main className="relative min-h-screen min-w-screen">
      <div className="absolute inset-0">
        <Image src={computedBg} fill alt={normalizedWeather.today.icon} className="object-cover h-full w-full"/>
      </div>
      <section className="mx-auto gap-8 py-10 px-5 sm:p-10 space-y-6 max-w-screen-2xl">
        <Topbar hasError={false} />
        <Widgets className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Today
            className="sm:col-span-2 lg:col-span-2 xl:col-span-2 "
            data={normalizedWeather.today}
          />
          <Forecast
            data={normalizedWeather.forecast}
          />
          <Sun data={normalizedWeather.sun} />
          <Wind data={normalizedWeather.wind} />
          <Conditions data={normalizedWeather.conditions} />
          <Air data={normalizedWeather.air} />
          <Moon data={normalizedWeather.moon} />
        </Widgets>
      </section>
    </main>
  )
}
