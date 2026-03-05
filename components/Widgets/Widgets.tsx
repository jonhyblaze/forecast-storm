import { cn } from "@/lib/utils"

export default function Widgets({
  className,
  children,
}: {
  className: string
  children: React.ReactNode

}) {
  return (
    <div className={cn(className)}>
      {children}
    </div>
  )
}
