import Image from "next/image"
import Card, { Field } from "@/components/Card/Card"
import { MoonIcon, Sunrise, Sunset } from "lucide-react"
import { MoonType } from "./types"
import { moonMap } from "@/data/icons"
import { getFormattedMoonphase, getMoonPhaseKey } from "@/lib/helpers"
import { cn } from "@/lib/utils"

export default function Moon({ data, className }: { data: MoonType, className?: string }) {
  const moonphaseKey = getMoonPhaseKey(data.moonphase)
  const formattedMoonphase = getFormattedMoonphase(data.moonphase)
  const moonIcon = moonMap[moonphaseKey]

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
      <Field name="Moonphase" Icon={MoonIcon} value={formattedMoonphase} className="pb-4"/>
      <footer className="flex items center justify-between justify-self-end">
        <Field name="Moonrise" Icon={Sunrise} value={data.moonrise.slice(0, 5)} />
        <Field name="Moonset" Icon={Sunset} value={data.moonset.slice(0, 5)} />
      </footer>
    </Card>
  )
}
