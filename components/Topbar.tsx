import SearchBar from "./SearchBar"
import { ThemeToggle } from "./ThemeToggle"

const Topbar = ({ hasError }: { hasError: boolean }) => {
  return (
    <header className="flex flex-row-reverse md:flex-row gap-2 justify-end grow-0 h-fit">
      <ThemeToggle />
      <SearchBar hasError={hasError} className="w-full md:w-auto"/>
    </header>
  )
}

export default Topbar
