import { BlitzPage, useSession } from "blitz"
import { Suspense, useEffect, useState } from "react"
import DashBoard from "../components/dashboard"
import SearchBar from "../components/searchBar"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import getCurrentUserArea from "app/users/queries/getCurrentUserArea"

const UserDashBoard: BlitzPage = () => {
  return (
    <Suspense fallback="loading...">
      <PageContent />
    </Suspense>
  )
}

const PageContent = () => {
  // prop drilling alternative??
  // top level state (all components should read from this state)
  const [zipcode, setZipcode] = useState<number>()
  const [location, setLocation] = useState<string>()
  const session = useSession()
  const user = useCurrentUser()
  // store this info in public data?

  useEffect(() => {
    if (!user?.defaultzip) return
    setZipcode(Number(user.defaultzip))
  }, [user?.defaultzip])

  // callback from searchbar to change state
  function changeArea(location: string, zipcode: number) {
    setLocation(location)
    setZipcode(zipcode)
  }

  function selectFavorite(zipcode: number) {
    setZipcode(zipcode)
  }

  return (
    <div className="flex flex-col place-items-center justify-center w-screen h-screen bg-slate-200">
      <SearchBar changeArea={changeArea} favoriteZipcode={zipcode} />
      {/* Why do I need a suspense component */}
      <Suspense fallback="Loading...">
        <DashBoard zipcode={zipcode} location={location} setFavoriteZipcode={selectFavorite} />
      </Suspense>
    </div>
  )
}

// page has zipcode & location state, changed by searchbar component
// Passed to Dashboard
// user clicks add to fav - triggers new card creation & database update
// user clicks remove - triggers card deletion & database update

export default UserDashBoard
