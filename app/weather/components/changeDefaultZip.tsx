import Form from "app/core/components/Form"
import LabeledTextField from "app/core/components/LabeledTextField"
import changeZip from "app/auth/mutations/changeZip"
import { useMutation } from "blitz"

const ChangeDefaultZip = () => {
  const [changeZipMutation] = useMutation(changeZip)

  return (
    <div className="border-2 border-slate-700 shadow-sm bg-slate-300 p-2 m-2 rounded-lg grid justify-items-center">
      <Form
        onSubmit={async (values) => {
          try {
            await changeZipMutation(values.defaultZip)
            alert("Default Zip changed to " + values.defaultZip)
            values.defaultZip = ""
          } catch (error: any) {
            alert(error)
          }
        }}
        className="grid justify-items-center"
      >
        <label htmlFor="defaultZip" className="">
          Change your Default Zipcode
        </label>
        <div className="flex flex-row place-items-center">
          <LabeledTextField
            type="text"
            label=""
            name="defaultZip"
            onClick={(e: any) => e.target.select()}
          />
          <button
            type="submit"
            className="mt-2 ml-2 border-slate-700 border-2 shadow rounded-md p-2 hover:bg-slate-600 hover:text-white"
          >
            Submit
          </button>
        </div>
      </Form>
    </div>
  )
}

export default ChangeDefaultZip
