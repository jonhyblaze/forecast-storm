"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  return (
    <button className="z-10 p-2" onClick={() => setTheme(isDark ? "light" : "dark")}>
      <Sun size={24} className="block dark:hidden" />
      <Moon size={24} className="hidden dark:block" />
    </button>
  )
}
