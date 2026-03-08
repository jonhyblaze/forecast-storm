import { BadgeLevel } from "@/components/Badge"
import { MoonphaseKey } from "@/components/Widgets/types"

export function getMoonPhaseKey(value: number): MoonphaseKey {
  if (value < 0.0625 || value >= 0.9375) return "new"
  if (value < 0.25) return "waxing-crescent"
  if (value < 0.3125) return "first-quarter"
  if (value < 0.5) return "waxing-gibbous"
  if (value < 0.5625) return "full"
  if (value < 0.75) return "waning-gibbous"
  if (value < 0.8125) return "last-quarter"
  return "waning-crescent"
}

export function getFormattedMoonphase(value: number) {
  if (value < 0.0625 || value >= 0.9375) return "New"
  if (value < 0.25) return "Waxing crescent"
  if (value < 0.3125) return "First quarter"
  if (value < 0.5) return "Waxing gibbous"
  if (value < 0.5625) return "Full"
  if (value < 0.75) return "Waning gibbous"
  if (value < 0.8125) return "Last quarter"
  return "Waning crescent"
}

export const formatForecastDate = (dateString: string) => {
  const date = new Date(dateString)

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
  }).format(date)
}

type LevelResult = {
  level?: BadgeLevel
  label: string
}

export const getUVLevel = (uvindex: number | undefined) : LevelResult => {
  if (uvindex === undefined || null) return { label: "No data" }

  if (uvindex <= 2) return { level: 1, label: "Low" }
  if (uvindex <= 5) return { level: 2, label: "Moderate" }
  if (uvindex <= 7) return { level: 3, label: "High" }
  if (uvindex <= 10) return { level: 4, label: "Very High" }
  return { level: 5, label: "Extreme" }
}

export const getPressureLevel = (pressure: number | undefined) : LevelResult => {
  if (pressure == null) return { label: "No data" }
  if (pressure < 990) return { level: 1, label: "Very Low" }
  if (pressure <= 1005) return { level: 2, label: "Low" }
  if (pressure <= 1018) return { level: 3, label: "Normal" }
  if (pressure <= 1030) return { level: 4, label: "High" }
  return { level: 5, label: "Very High" }
}

export const getAirLevel = (airIndex: number | undefined): LevelResult => {
  if (airIndex == null) return { label: "No data" }

  if (airIndex <= 1) return { level: 1, label: "Perfect" }
  if (airIndex <= 2) return { level: 2, label: "Good" }
  if (airIndex <= 3) return { level: 3, label: "Moderate" }
  if (airIndex <= 4) return { level: 4, label: "Poor" }
  if (airIndex <= 5) return { level: 4, label: "Very Poor" }
    else  return { level: 6, label: "Unhealthy" }
}

export const to24h = (time: string) => {
  const date = new Date(`1970-01-01 ${time}`)
  return date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
}
