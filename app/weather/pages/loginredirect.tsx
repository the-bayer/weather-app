import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { BlitzPage, Routes, useMutation, Link } from "blitz"
import { Suspense } from "react"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return <>{/* redirect to dashboard?*/}</>
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

const LoginRedirect: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback="Loading..">
        <UserInfo />
      </Suspense>
    </div>
  )
}

export default LoginRedirect
