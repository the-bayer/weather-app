import { AuthenticationError, Link, useMutation, Routes, PromiseReturnType, Router } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <div className="flex flex-col place-items-center justify-center">
      <h1 className="font-600 text-xl text-center w-full border-b-2 border-black">Login</h1>

      <Form
        schema={Login}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            const user = await loginMutation(values)
            props.onSuccess?.(user)
            Router.push(Routes.UserDashBoard())
          } catch (error: any) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
            }
          }
        }}
      >
        <div className="flex flex-col place-items-center">
          <p className="mt-4">Email:</p>
          <LabeledTextField name="email" label="" placeholder="Email" />
          <p className="mt-2">Password:</p>
          <LabeledTextField name="password" label="" placeholder="Password" type="password" />
        </div>
        <div className="flex flex-col place-items-center">
          <Link href={Routes.ForgotPasswordPage()}>
            <a className="font-light underline hover:no-underline">Forgot your password?</a>
          </Link>
          <button type="submit" className="font-semibold text-lg underline mt-6 hover:no-underline">
            Login
          </button>
        </div>
      </Form>

      <div className="flex flex-col place-items-center">
        or{" "}
        <Link href={Routes.SignupPage()}>
          <a className="font-medium underline hover:no-underline">Sign Up</a>
        </Link>
      </div>
    </div>
  )
}

export default LoginForm
