import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

type CardType = "conditions" | "air" | "sun" | "moon" | "wind" | "today" | "forecast" | "skeleton"

type CardProps = {
  type: CardType
  children?: React.ReactNode
  className?: string
}

export default function Card({ type, children, className }: CardProps) {
  const renderCardTitle = () => {
    if (type === "today" || type === "skeleton") return

    else return <h2 className="475px:text-lg uppercase text-foreground/50">{type}</h2>
  }

  return (
    <div className={cn("bg-foreground/1 dark:bg-background/15 rounded-3xl p-6 pb-10 backdrop-blur-md border border-foreground/10 dark:border-background/10", className)}>
      {renderCardTitle()}
      {children}
    </div>
  )
}

type FieldProps = {
  name: string
  value: string | number
  Icon: LucideIcon
  className?: string
}

export const Field = ({ Icon, name, value, className }: FieldProps) => {
  return (
    <div className={cn("flex gap-2 475px:gap-4", className)}>
      <Icon size={24} />
      <div>
        <p className="475px:text-lg font-bold leading-5 475px:pb-0.5">{value}</p>
        <p className="text-sm 475px:text-base text-foreground/50 leading-5">{name}</p>
      </div>
    </div>
  )
}
