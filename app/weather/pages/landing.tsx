import { BlitzPage, Link, Routes, useMutation } from "blitz"
import SearchBar from "../components/searchBar"
import { useState, Suspense } from "react"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

const UserInfo = () => {
  const currentUser = useCurrentUser()

  if (currentUser) {
    return (
      <div className="flex flex-col place-items-center">
        <div className="text-center m-2">You&apos;re logged in.</div>
        <Link href={Routes.UserDashBoard()}>
          <a className="border-black border-2 p-2 rounded-xl bg-slate-400 hover:bg-slate-600">
            Navigate to your dashboard.
          </a>
        </Link>
      </div>
    )
  } else {
    return (
      <>
        <div className="">
          To create a default location & add favorites,{" "}
          <Link href={Routes.SignupPage()}>
            <a className="underline hover:no-underline">
              <strong>sign up</strong>
            </a>
          </Link>{" "}
          or{" "}
          <Link href={Routes.LoginPage()}>
            <a className="underline hover:no-underline">
              <strong>log in.</strong>
            </a>
          </Link>
        </div>
      </>
    )
  }
}

const Landing: BlitzPage = () => {
  // top level state for all components
  const [zipcode, setZipcode] = useState<string>()
  const [location, setLocation] = useState<string>()

  function changeArea(location: string, zipcode: string) {
    setLocation(location)
    setZipcode(zipcode)
  }

  return (
    <div className="flex flex-col place-items-center justify-center h-screen w-full overflow-auto">
      <SearchBar changeArea={changeArea} zipcode={zipcode} location={location} />
      <div>
        <Suspense fallback="...">
          <UserInfo />
        </Suspense>
        <div className="flex flex-col place-items-center">
          <Link href={Routes.Home()}>
            <a className="underline hover:no-underline font-bold m-4">Back to the Home Page</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Landing
