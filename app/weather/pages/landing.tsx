import { BlitzPage, Link, Routes, useMutation } from "blitz"
import SearchBar from "../components/searchBar"
import { useState, useEffect, Suspense } from "react"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <div className="text-center m-2">You&apos;re already logged in.</div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="button small border-black border-2">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small border-black border-2">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

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
        <div>To create a default location & add favorites, sign up or log in.</div>
        <Suspense fallback="...">
          <UserInfo />
        </Suspense>
      </div>
    </div>
  )
}

export default Landing
