import { Suspense } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <div className="flex flex-col place-items-center">
        <Link href={Routes.UserDashBoard()}>
          <a className="underline font-semibold hover:no-underline mb-4 ">Go to your dashboard.</a>
        </Link>

        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>

        {/* <div className="flex flex-col">
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div> */}
      </div>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="border-2 border-slate-700 p-2 m-2 rounded-lg">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="border-2 border-slate-700 p-2 m-2 rounded-lg">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <div className="w-full h-full flex flex-col place-items-center justify-center content-center p-80">
      {/* Lots of padding :)))) */}
      <div className="flex flex-col place-items-center border-slate-700 border-4 shadow-lg rounded-lg p-4 bg-slate-300">
        <p>This is Blake&apos;s weather app, use it at your own risk.</p>
        <Link href={Routes.Landing()}>
          <a className="underline font-semibold hover:no-underline mt-4">
            Click here to get your weather.
          </a>
        </Link>
        <div className="buttons" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <Suspense fallback="Loading...">
            <UserInfo />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
