import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { BlitzPage, Router, useMutation, Routes, Link } from "blitz"
import { Suspense, useMemo, useState } from "react"
import DashBoard from "../components/dashboard"
import SearchBar from "../components/searchBar"
import ChangeDefaultZip from "../components/changeDefaultZip"

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
  // still need to initalize to default zip
  const [logoutMutation] = useMutation(logout)
  const user = useCurrentUser()
  const [zipcode, setZipcode] = useState<string>()
  const [location, setLocation] = useState<string>()

  // intializes page to default zipcode, occurs on refresh
  useMemo(() => {
    Router.push({ query: { zipcode: user?.defaultzip } })
  }, [user?.defaultzip])

  // callback from searchbar to change state
  function changeArea(location: string, zipcode: string) {
    setLocation(location)
    setZipcode(zipcode)
  }

  return (
    <div className="sm:flex sm:flex-col place-items-center justify-center h-screen overflow-auto inline-block w-full overflow-auto">
      <SearchBar changeArea={changeArea} zipcode={zipcode} location={location} />
      <DashBoard zipcode={zipcode} location={location} />
      <ChangeDefaultZip />
      <button
        className="underline hover:no-underline font-bold"
        onClick={async () => {
          await logoutMutation()
        }}
      >
        Logout
      </button>
      <Link href={Routes.Home()}>
        <a className="underline hover:no-underline font-bold">Back to the Home Page</a>
      </Link>
    </div>
  )
}

UserDashBoard.authenticate = true
export default UserDashBoard
