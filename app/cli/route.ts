import { readFileSync } from "fs"
import { join } from "path"
import { NextResponse } from "next/server"

export async function GET() {
  const script = readFileSync(join(process.cwd(), "cli/forecast-storm"), "utf-8")
  return new NextResponse(script, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": 'inline; filename="forecast-storm"',
      "Cache-Control": "public, max-age=3600",
    },
  })
}
