import { BlitzPage } from "blitz"
import { useState } from "react"
import DashBoard from "../components/dashboard"
import SearchBar from "../components/searchBar"

const UserDashBoard: BlitzPage = () => {
  // prop drilling alternative??
  const [zipcode, setZipcode] = useState<number>()
  const [location, setLocation] = useState<string>()

  function changeArea(name: string, number: number) {
    setLocation(name)
    setZipcode(number)
  }

  return (
    <div className="flex flex-col place-items-center justify-center w-screen h-screen bg-slate-200">
      <SearchBar changeArea={changeArea} />
      <DashBoard zipcode={zipcode} location={location} />
    </div>
  )
}

// page has zipcode & location state, changed by searchbar component
// Passed to Dashboard
// user clicks add to fav - triggers new card creation & database update
// user clicks remove - triggers card deletion & database update

export default UserDashBoard