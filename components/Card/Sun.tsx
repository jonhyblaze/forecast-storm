import Image from "next/image"
import Card, { Field } from "./Card"
import { Sunrise, Sunset } from "lucide-react"

type SunType = {
  sunrise: string
  sunset: string
}

export default function Sun({ data }: { data: SunType }) {
  return (
    <Card type="sun" className="flex flex-col justify-between">
      <div className="relative overflow-auto -mx-6">
        <Image
          src="/png/sun/sunset.png"
          alt="Sunset over sea illustration"
          className="object-cover"
          width={400}
          height={400}
        />
      </div>
      <footer className="flex items center justify-between justify-self-end">
        <Field name="Sunrise" Icon={Sunrise} value={data.sunrise.slice(0, 5)} />
        <Field name="Sunset" Icon={Sunset} value={data.sunset.slice(0, 5)} />
      </footer>
    </Card>
  )
}
