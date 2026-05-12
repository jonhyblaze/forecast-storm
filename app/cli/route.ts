import { readFileSync } from "fs"
import { join } from "path"
import { NextResponse } from "next/server"

export async function GET() {
  const script = readFileSync(join(process.cwd(), "cli/forecast-storm"), "utf-8")
    .replace("__VISUAL_CROSSING_KEY__", process.env.VISUAL_CROSSING_API_KEY ?? "")
    .replace("__WEATHERAPI_KEY__", process.env.WEATHERAPI_API_KEY ?? "")

  return new NextResponse(script, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": 'inline; filename="forecast-storm"',
      "Cache-Control": "no-store",
    },
  })
}
