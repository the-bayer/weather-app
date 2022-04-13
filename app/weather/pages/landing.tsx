import { BlitzPage, Link, Routes } from "blitz"
import SearchBar from "../components/searchBar"
import { useState, useEffect } from "react"
// import LoginRedirect from "./loginredirect"

// may need to refactor props for searchbar
const Landing: BlitzPage = () => {
  // top level state
  const [zipcode, setZipcode] = useState<number>()
  const [location, setLocation] = useState<string>()

  function changeArea(name: string, number: number) {
    setLocation(name)
    setZipcode(number)
  }

  return (
    <div className="flex flex-col place-items-center justify-center align-center w-screen h-screen bg-slate-200">
      <SearchBar changeArea={changeArea} />
      <div>
        <div>
          To create a default location & add favorites, sign up or log in{" "}
          <Link href={Routes.LoginPage()}>
            <a>FIX HREF.</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Landing
