import { headers } from "next/headers"

type City = "Kyiv" | "Berlin" | string

type GeoResponse = {
  city?: City
}

export async function getClientLocation(): Promise<string | undefined> {
  const headerList = await headers()
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0] || // Get the first IP in the list
    headerList.get("x-real-ip") ||
    ""

  // 1.Detect Localhost/Loopback
  // 1. If we are on Localhost, don't even call the API
  if (!ip || ip === "::1" || ip === "127.0.0.1") {
    // While developing, use a fixed IP (e.g., London) to see it work
    // In production, this won't be hit because users have public IPs
    console.log("🛠️ Localhost detected: Skipping API and returning Berlin")
    return "Berlin"
  }

  const apiKey = process.env.IP_GEOLOCATION_API_KEY
  const baseUrl = process.env.IP_GEOLOCATION_BASE_URL

  if (!apiKey || !baseUrl) {
    throw new Error("Missing geolocation environment variables")
  }

  const url = `${baseUrl}ipgeo?apiKey=${apiKey}&ip=${ip}&fields=geo`
  const dayInSeconds = 86400

  try {
    const response = await fetch(url, {
      next: { revalidate: dayInSeconds } // 24 hours
    })

    // 2. Handle API Errors gracefully (like that 423)
    if (!response.ok) {
      console.warn(`Geo API returned status: ${response.status}`)
      return undefined
    }

    const data: GeoResponse = await response.json()

    if (data.city) {
      // Normalization logic
      if (data.city === "Kiev") return "Kyiv"
      return data.city
    }
  } catch (e) {
    console.error("Geolocation fetch failed:", e)
  }

  return "Kyiv"
}
