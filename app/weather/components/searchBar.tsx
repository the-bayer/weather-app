import Form, { FORM_ERROR } from "app/core/components/Form"
import LabeledTextField from "app/core/components/LabeledTextField"
import { BlitzPage } from "blitz"
import LocationDisplay from "./locationDisplay"
import WeatherDisplay from "./weatherDisplay"
import { zipcode } from "../validations"
import { useState } from "react"
import { number, z } from "zod"

const SearchBar: BlitzPage = () => {
  const [zipcode, setZipcode] = useState<number | undefined>()

  // Unnecessary typescript?
  function handleSubmit(values: { zipcode: number }) {
    const toNumber = Number(values.zipcode)
    setZipcode(toNumber)
  }

  return (
    // set max fit for content
    <div className="flex flex-col bg-slate-300 w-3/4 justify-center items-center">
      <div className="border-2 border-slate-400 rounded w-3/4 flex justify-center shadow-sm shadow-black p-1 m-1">
        <Form
          // schema={zipcode}
          submitText="Search"
          onSubmit={(values) => {
            // if (FORM_ERROR) {
            //   // Add error message
            //   console.log("Whoops")
            //   return
            // }
            handleSubmit(values)
          }}
          className="flex p-1"
        >
          <LabeledTextField
            name="zipcode"
            label=""
            placeholder="Enter your zipcode"
            className="m-3"
          />
        </Form>
      </div>
      <LocationDisplay zipcode={zipcode} />
      <WeatherDisplay zipcode={zipcode} />
    </div>
  )
}

export default SearchBar
