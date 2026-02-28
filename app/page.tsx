import SearchBar from "@/components/SearchBar"
import Widgets from "@/components/Widgets/Widgets"
import SkeletonWidgets from "@/components/Widgets/SkeletonWidgets"
import { ThemeToggle } from "@/components/ThemeToggle"
import { getWeatherData } from "@/lib/weather"

export default async function Home({ searchParams }: { searchParams: Promise<{ city?: string }> }) {
  const { city = "london" } = await searchParams
  const { data, error } = await getWeatherData(city)

  if (error === "NOT_FOUND" || error === "SERVICE_DOWN") {
    return (
      <main className="mx-auto gap-8 py-10 px-10 space-y-16 max-w-screen-2xl">
        <header className="flex gap-2 justify-end grow-0 h-fit">
          <ThemeToggle />
          <SearchBar hasError={true} />
        </header>
        <SkeletonWidgets className="grid grid-cols-4 grid-rows-2 gap-10" />
      </main>
    )
  }

  return (
    <main className="mx-auto gap-8 py-10 px-10 space-y-16 max-w-screen-2xl">
      <header className="flex gap-2 justify-end grow-0 h-fit">
        <ThemeToggle />
        <SearchBar hasError={false}/>
      </header>
      <Widgets className="grid grid-cols-4 grid-rows-2 gap-6" data={data} />
    </main>
  )
}
