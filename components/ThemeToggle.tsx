"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  return (
    <button className="p-2" onClick={() => setTheme(isDark ? "light" : "dark")}>
      <Sun size={24} className="block dark:hidden" />
      <Moon size={24} className="hidden dark:block" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
