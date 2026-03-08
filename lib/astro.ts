// lib/astro.ts
export async function getAstroData(city: string) {
  const WEATHERAPI_BASE_URL = process.env.WEATHERAPI_BASE_URL// Use your weatherapi.com key
  const WEATHERAPI_API_KEY = process.env.WEATHERAPI_API_KEY
  const date = new Date().toLocaleDateString("en-CA")

  const url = `${WEATHERAPI_BASE_URL}astronomy.json?key=${WEATHERAPI_API_KEY}&q=${city}&dt=${date}`

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) return null

    const data = await res.json()
    const astro = data?.astronomy?.astro

    return {
      moonrise: astro?.moonrise !== "No moonrise" ? astro.moonrise : null,
      moonset: astro?.moonset !== "No moonset" ? astro.moonset : null,
      moonphase: astro?.moon_phase || "Unknown",
      illumination: astro?.moon_illumination ?? 0
    }
  } catch (e) {
    console.error("Astro fetch failed", e)
    return null
  }
}
