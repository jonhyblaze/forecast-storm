import { LucideIcon } from "lucide-react"

export type WeatherIcon =
  | "clear-day"
  | "clear-night"
  | "partly-cloudy-day"
  | "partly-cloudy-night"
  | "cloudy"
  | "rain"
  | "showers-day"
  | "showers-night"
  | "thunder-rain"
  | "thunder-showers-day"
  | "thunder-showers-night"
  | "snow"
  | "snow-showers-day"
  | "snow-showers-night"
  | "fog"
  | "wind"

export type MoonphaseKey =
  | "new"
  | "waxing-crescent"
  | "first-quarter"
  | "waxing-gibbous"
  | "full"
  | "waning-gibbous"
  | "last-quarter"
  | "waning-crescent"

export type TodayType = {
  address: string
  description: string
  conditions: string
  icon: WeatherIcon
  temp: number
  feelslike: number
  tempmin: number
  tempmax: number
}

export type ForecastDay = {
  datetime: string
  tempmin: number
  tempmax: number
  icon: WeatherIcon
}

export type ForecastType = ForecastDay[]

export type SunType = {
  sunrise: string
  sunset: string
}

export type WindType = {
  windspeed: number
  windgust: number
  winddir: number
}

export type ConditionsType = {
  icon: LucideIcon
  precipprob: number
  cloudcover: number
  precip: number
  humidity: number
  visibility: number
}

export type AirType = {
  uvindex: number
  pressure: number
  aqieur: number
}

export type MoonType = {
  moonphase: number
  moonrise: string
  moonset: string
}

export type NormalizedWeather = {
  today: TodayType
  forecast: ForecastType
  sun: SunType
  wind: WindType
  conditions: ConditionsType
  air: AirType
  moon: MoonType
}
