const API_KEY = process.env.VISUAL_CROSSING_API_KEY
const BASE_URL = process.env.VISUAL_CROSSING_BASE_URL

export const getWeatherData = async (city: string) => {
  const url = `${BASE_URL}${city}?unitGroup=metric&key=${API_KEY}&contentType=json`

  const res = await fetch(url)

  // 1. Check if the HTTP status is okay (200-299)
  if (res.status === 404) {
    return { data: null, error: "NOT_FOUND" }
  }

  if (!res.ok) {
    // Try to get the text error message from the body
    const errorText = await res.text()
    return { data: null, error: "SERVICE_DOWN", text: errorText }
  }

  // 2. Check the Content-Type header to ensure it's actually JSON
  const contentType = res.headers.get("content-type")

  if (!contentType || !contentType.includes("application/json")) {
    const text = await res.text()
    throw new Error(`Expected JSON but got: ${text}`)
  }

  const data = await res.json()
  return { data, error: null }
}
