import { MoonphaseKey, WeatherIcon } from "@/components/Widgets/types"

export const iconsMap: Record<WeatherIcon, string> = {
  "clear-day": "/png/conditions/clear-day.png",
  "clear-night": "/png/conditions/clear-night.png",
  cloudy: "/png/conditions/cloudy.png",
  fog: "/png/conditions/fog.png",
  "partly-cloudy-day": "/png/conditions/partly-cloudy-day.png",
  "partly-cloudy-night": "/png/conditions/partly-cloudy-night.png",
  rain: "/png/conditions/rain.png",
  "showers-day": "/png/conditions/showers-day.png",
  "showers-night": "/png/conditions/showers-night.png",
  "snow-showers-day": "/png/conditions/snow-showers-day.png",
  "snow-showers-night": "/png/conditions/snow-showers-night.png",
  snow: "/png/conditions/snow.png",
  "thunder-rain": "/png/conditions/thunder-rain.png",
  "thunder-showers-day": "/png/conditions/thunder-showers-day.png",
  "thunder-showers-night": "/png/conditions/thunder-showers-night.png",
  wind: "/png/conditions/wind.png"
}



export const moonMap: Record<MoonphaseKey, string> = {
  new: "/png/moon/new-moon.png",
  "waxing-crescent": "/png/moon/waxing-crescent.png",
  "first-quarter": "/png/moon/first-quarter.png",
  "waxing-gibbous": "/png/moon/waxing-gibbous.png",
  full: "/png/moon/full-moon.png",
  "waning-gibbous": "/png/moon/waning-gibbous.png",
  "last-quarter": "/png/moon/last-quarter.png",
  "waning-crescent": "/png/moon/waning-crescent.png",
}

export const bgMap: Record<WeatherIcon, string> = {
  "clear-day": "/bg/clear-day.png",
  "clear-night": "/bg/clear-night.png",
  cloudy: "/bg/rain.png",
  fog: "/bg/fog.png",
  "partly-cloudy-day": "/bg/partly-cloudy-day.png",
  "partly-cloudy-night": "/bg/cloudy-night.png",
  rain: "/bg/showers.png",
  "showers-day": "/bg/showers.png",
  "showers-night": "/bg/showers.png",
  "snow-showers-day": "/bg/blizzard.png",
  "snow-showers-night": "/bg/blizzard.png",
  snow: "/bg/snow.png",
  "thunder-rain": "/bg/thunder-rain.png",
  "thunder-showers-day": "/bgthunder-showers-day.png",
  "thunder-showers-night": "/bg/thunder-showers-night.png",
  wind: "/bg/wind.png"
}
