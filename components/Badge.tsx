import { cn } from "@/lib/utils"
import { ReactNode } from "react"

export type BadgeLevel = 1 | 2 | 3 | 4 | 5 | 6

type BadgeProps = {
  children: ReactNode
  level?: BadgeLevel
  className?: string
}

const Badge = ({
  children,
  className,
  level = 1
}: BadgeProps) => {
  const variations: Record<BadgeLevel, string> = {
    1: "bg-sky-500/75",
    2: "bg-emerald-500/75",
    3: "bg-amber-500/75",
    4: "bg-red-500/65",
    5: "bg-red-700/45",
    6: "bg-purple-500/65"
  }

  const color = variations[level] ?? "bg-zinc-500"

  return (
    <div className={cn("text-sm leading-4 text-center rounded-full px-2 py-1", color, className)}>
      {children}
    </div>
  )
}

export  default Badge
