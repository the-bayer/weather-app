import { useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div className="flex flex-col place-items-center justify-center bg-slate-400 h-screen w-screen">
      <div className="flex border-4 rounded-xl border-slate-500 p-20 bg-slate-300">
        <SignupForm onSuccess={() => router.push(Routes.Home())} />
      </div>
    </div>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
