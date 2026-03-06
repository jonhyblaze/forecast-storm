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
      moonphase: data?.currentConditions.moonphase,
      moonrise: "13:23:55",
      moonset: "04:18:23"
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
      <Image
        src={computedBg}
        alt={normalizedWeather.today.icon}
        fill
        className="absolute object-cover blur-xs scale-[102%] "
      />
      <section className="mx-auto gap-8 py-10 px-5 sm:p-10 space-y-6 max-w-screen-2xl">
        <Topbar hasError={false} />
        <Widgets className="flex flex-col md:grid grid-cols-1 gap-6 grid-rows-7 md:grid-cols-2 lg:grid-cols-6 lg:grid-rows-4 xl:grid-rows-2 xl:grid-cols-4">
          <Today
            className="sm:col-span-2 lg:col-span-4 xl:col-start-1 xl:col-span-2 xl:row-start-1"
            data={normalizedWeather.today}
          />
          <Forecast
            data={normalizedWeather.forecast}
            className="col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-1"
          />
          <Sun data={normalizedWeather.sun} className="lg:col-span-2 xl:col-span-1" />
          <Wind data={normalizedWeather.wind} className="lg:col-span-2 xl:col-span-1" />
          <Conditions data={normalizedWeather.conditions} className="lg:col-span-2 xl:col-span-1" />
          <Air data={normalizedWeather.air} className="lg:col-span-2 xl:col-span-1" />
          <Moon data={normalizedWeather.moon} className="lg:col-span-2 xl:col-span-1" />
        </Widgets>
      </section>
    </main>
  )
}
