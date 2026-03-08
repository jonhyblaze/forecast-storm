import { cn } from "@/lib/utils"

function SkeletonBlock({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-2xl bg-foreground/20", className)} />
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("min-h-96 rounded-2xl bg-foreground/25 p-6 flex flex-col gap-4", className)}>
      {/* Title */}
      <SkeletonBlock className="h-4 w-24 mb-12" />
      {/* Content */}
      <div className="space-y-4">
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-5/6" />
        <SkeletonBlock className="h-4 w-2/3" />
      </div>
    </div>
  )
}

export default function SkeletonWidgets({ className }: { className?: string }) {
  return (
    <div className={cn(className)}>
      {/* Today (col-span-2) */}
      <div className="col-span-2 rounded-2xl bg-foreground/25 p-6 space-y-6 animate-pulse">
        <SkeletonBlock className="h-6 w-32" />
        <SkeletonBlock className="h-12 w-24" />
        <div className="flex gap-4">
          <SkeletonBlock className="h-4 w-16" />
          <SkeletonBlock className="h-4 w-16" />
        </div>
        <SkeletonBlock className="h-4 w-40" />
      </div>
      {/* Forecast */}
      <SkeletonCard />
      {/* Sun */}
      <SkeletonCard />
      {/* Wind */}
      <SkeletonCard />
      {/* Conditions */}
      <SkeletonCard />
      {/* Air */}
      <SkeletonCard />
      {/* Moon */}
      <SkeletonCard />
    </div>
  )
}
