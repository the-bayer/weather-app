import { BlitzPage } from "blitz"
import SearchBar from "../components/searchBar"

const Landing: BlitzPage = () => {
  return (
    <div className="flex justify-center align-center w-screen h-screen bg-slate-200">
      <SearchBar />
    </div>
  )
}

export default Landing
