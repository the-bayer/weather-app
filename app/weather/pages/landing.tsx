import { BlitzPage } from "blitz"
import SearchBar from "../components/SearchBar"
import { useState, useEffect } from "react"

// may need to refactor props for searchbar
const Landing: BlitzPage = () => {
  const [zipcode, setZipcode] = useState<number>()
  const [location, setLocation] = useState<string>()

  function changeArea(name: string, number: number) {
    setLocation(name)
    setZipcode(number)
  }

  return (
    <div className="flex justify-center align-center w-screen h-screen bg-slate-200">
      <SearchBar changeArea={changeArea} />
    </div>
  )
}

export default Landing
