import Image from "next/image"
import Card, { Field } from "@/components/Card/Card"
import { Sunrise, Sunset } from "lucide-react"
import { SunType } from "./types"
import { cn } from "@/lib/utils"

export default function Sun({ data, className }: { data: SunType, className?: string }) {
  return (
    <Card type="sun" className={cn("grid", className)}>
      <div className="relative overflow-auto -mx-6">
        <Image
          src="/png/sun/sunset.png"
          alt="Sunset over sea illustration"
          className="object-fill w-full lg:w-auto lg:object-cover"
          width={350}
          height={220}
        />
      </div>
      <footer className="flex items-center justify-between ">
        <Field name="Sunrise" Icon={Sunrise} value={data.sunrise.slice(0, 5)} />
        <Field name="Sunset" Icon={Sunset} value={data.sunset.slice(0, 5)} />
      </footer>
    </Card>
  )
}
