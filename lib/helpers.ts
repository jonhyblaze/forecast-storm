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
