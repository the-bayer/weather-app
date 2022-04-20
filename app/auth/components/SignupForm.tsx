import { Link, Routes, useMutation } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <div className="flex flex-col place-items-center justify-center">
      <h1 className="font-600 text-xl text-center w-full border-b-2 border-black">
        Create an Account
      </h1>

      <Form
        schema={Signup}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            props.onSuccess?.()
          } catch (error: any) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <div className="flex flex-col place-items-center">
          <p className="mt-4">Email:</p>
          <LabeledTextField name="email" label="" placeholder="Email" />
          <p className="mt-2">Password:</p>
          <LabeledTextField name="password" label="" placeholder="Password" type="password" />
          <p className="mt-2">Zipcode:</p>
          <LabeledTextField name="defaultzip" label="" placeholder="Zipcode" />
        </div>
        <div className="flex flex-col place-items-center">
          <button type="submit" className="font-semibold text-lg underline mt-6 hover:no-underline">
            Sign Up
          </button>
          <Link href={Routes.Home()}>
            <a className="font-medium underline mt-6 hover:no-underline">Back to the Home Page</a>
          </Link>
        </div>
      </Form>
    </div>
  )
}

export default SignupForm
