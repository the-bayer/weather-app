import { BlitzPage, useQuery, useSession, Router, useRouter } from "blitz"
import { Suspense, useEffect, useState } from "react"
import DashBoard from "../components/dashboard"
import SearchBar from "../components/searchBar"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import getUserAreas from "app/areas/queries/getUserAreas"

const UserDashBoard: BlitzPage = () => {
  return (
    <Suspense fallback="loading...">
      <PageContent />
    </Suspense>
  )
}

const PageContent = () => {
  const user = useCurrentUser()
  const router = useRouter()
  // prop drilling alternative??
  const [zipcode, setZipcode] = useState<number>()
  const [location, setLocation] = useState<string>()

  const session = useSession()
  const [userAreas] = useQuery(getUserAreas, session)

  // callback from searchbar to change state
  function changeArea(location: string, zipcode: number) {
    setLocation(location)
    setZipcode(zipcode)
  }

  // sets location based on favorite card
  function handleFavorite(zipcode: number) {
    setZipcode(zipcode)
  }

  return (
    <div className="flex flex-col place-items-center justify-center w-screen h-screen bg-slate-200">
      <SearchBar
        changeArea={changeArea}
        favoriteZipcode={zipcode}
        zipcode={zipcode}
        location={location}
      />
      {/* Why do I need a suspense component */}
      <Suspense fallback="Loading...">
        <DashBoard zipcode={zipcode} location={location} handleFavorite={handleFavorite} />
      </Suspense>
    </div>
  )
}

// page has zipcode & location state, changed by searchbar component
// Passed to Dashboard
// user clicks add to fav - triggers new card creation & database update
// user clicks remove - triggers card deletion & database update

export default UserDashBoard
