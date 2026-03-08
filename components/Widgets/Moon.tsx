import Image from "next/image"
import Card, { Field } from "@/components/Card/Card"
import { MoonIcon, Sunrise, Sunset } from "lucide-react"
import { MoonType } from "./types"
import { moonMap } from "@/data/icons"
import { getMoonPhaseKey, to24h } from "@/lib/helpers"
import { cn } from "@/lib/utils"
import { getAstroData } from "@/lib/astro"


export default async function Moon({ data, className }: { data: MoonType; className?: string }) {
  const astroData = await getAstroData(data.address)
  const moonphaseKey = getMoonPhaseKey(data.moonphase)
  const moonIcon = moonMap[moonphaseKey]

  if (!data) return <MoonSkeleton />

  return (
    <Card type="moon" className={cn("flex flex-col justify-between", className)}>
      <div className="relative">
        <Image
          src={moonIcon}
          alt="Moonphase illustration"
          className="object-cover mx-auto"
          width={200}
          height={200}
        />
      </div>
      <div className="flex items center justify-between justify-self-end pb-4">
        <Field
          name="Moonphase"
          Icon={MoonIcon}
          value={astroData?.moonphase ?? "No data"}
          className="w-fit"
        />
      </div>
      <footer className="flex items center justify-between justify-self-end">
        <Field name="Moonrise" Icon={Sunrise} value={to24h(astroData?.moonrise) ?? "No data"} />
        <Field name="Moonset" Icon={Sunset} value={to24h(astroData?.moonset) ?? "No data"} />
      </footer>
    </Card>
  )
}

const MoonSkeleton = () => (
  <Card type="moon" className="grid gap-4.5 h-full">
    <div className="mx-auto">
      <div className="p-18 bg-foreground/25 animate-pulse rounded-full" />
    </div>
    <div className="space-y-6 pt-2">
      <div className="flex justify-between">
        <div className="flex gap-2 items-start">
          <div className="p-3 rounded-full bg-foreground/25 animate-pulse" />
          <div className="space-y-2">
            <div className="h-5 w-16 rounded-full bg-foreground/25 animate-pulse" />
            <div className="h-4 rounded-full bg-foreground/25 animate-pulse" />
          </div>
        </div>
        <div className="flex gap-2 items-start">
          <div className="p-3 rounded-full bg-foreground/25 animate-pulse" />
          <div className="space-y-2">
            <div className="h-5 w-16 rounded-full bg-foreground/25 animate-pulse" />
            <div className="h-4 rounded-full bg-foreground/25 animate-pulse" />
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2 items-start">
          <div className="p-3 rounded-full bg-foreground/25 animate-pulse" />
          <div className="space-y-2">
            <div className="h-5 w-16 rounded-full bg-foreground/25 animate-pulse" />
            <div className="h-4 rounded-full bg-foreground/25 animate-pulse" />
          </div>
        </div>
        <div className="flex gap-2 items-start">
          <div className="p-3 rounded-full bg-foreground/25 animate-pulse" />
          <div className="space-y-2">
            <div className="h-5 w-16 rounded-full bg-foreground/25 animate-pulse" />
            <div className="h-4 rounded-full bg-foreground/25 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  </Card>
)
