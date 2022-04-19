import { BlitzPage, useQuery, useSession, Router, useRouter } from "blitz"
import { Suspense, useState } from "react"
import DashBoard from "../components/dashboard"
import SearchBar from "../components/searchBar"

const UserDashBoard: BlitzPage = () => {
  // why do I need a suspense component?
  return (
    <Suspense fallback="loading...">
      <PageContent />
    </Suspense>
  )
}

const PageContent = () => {
  // prop drilling alternative?
  // top level state for all components
  const [zipcode, setZipcode] = useState<number>()
  const [location, setLocation] = useState<string>()

  const session = useSession()

  // callback from searchbar to change state
  function changeArea(location: string, zipcode: number) {
    setLocation(location)
    setZipcode(zipcode)
  }

  return (
    <div className="flex flex-col place-items-center justify-center w-screen h-screen bg-slate-200">
      <SearchBar changeArea={changeArea} zipcode={zipcode} location={location} />
      <DashBoard zipcode={zipcode} location={location} />
    </div>
  )
}

UserDashBoard.authenticate = true
export default UserDashBoard
