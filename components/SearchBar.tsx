"use client"
import { cn } from "@/lib/utils"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useEffect, useState, useTransition } from "react"

export default function SearchBar({ hasError, className }: { hasError: boolean; className?: string }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [query, setQuery] = useState(searchParams.get("city") ?? "")
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const currentCity = searchParams.get("city")

      if (query.length > 2 && query.toLowerCase() !== currentCity?.toLowerCase()) {
        const params = new URLSearchParams(searchParams)
        params.set("city", query)

        startTransition(() => {
          router.replace(`${pathname}?${params.toString()}`)
        })
      }
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return (
    <form className={cn("relative flex items-center gap-4", className)}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={cn(
          "w-full md:w-auto rounded-full ring-0 outline-none border-none backdrop-blur-lg bg-foreground/10 px-5.5 py-2.5 dark:bg-background/25 placeholder:text-base",
          hasError ? "ring-1 ring-amber-500" : "ring-0"
        )}
        placeholder="Search"
      />
      {hasError && <p className="text-xs text-amber-500 absolute top-12 left-6">City not found</p>}
      {isPending && (
        <div className="absolute right-4 animate-spin h-5 w-5 border-2 border-zinc-200 border-t-transparent rounded-full" />
      )}
    </form>
  )
}
