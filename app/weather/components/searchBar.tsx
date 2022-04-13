import Form, { FORM_ERROR } from "app/core/components/Form"
import LabeledTextField from "app/core/components/LabeledTextField"
import { BlitzPage } from "blitz"
import LocationDisplay from "./LocationDisplay"
import WeatherDisplay from "./WeatherDisplay"
import { zipcode } from "../validations"
import { useState, useEffect } from "react"
import { number, z } from "zod"

// store zipcode in url
// query Router.push

// if authenticated
interface AppProps {
  changeArea: Function
}

const SearchBar = (props: AppProps) => {
  const [zipcode, setZipcode] = useState<number>()
  const [location, setLocation] = useState<string>()

  // if authenticated user
  function dashboardLocation() {}

  useEffect(() => {
    if (!zipcode || !location) return
    props.changeArea(location, zipcode)
  }, [zipcode, location, props])

  function changeLocation(name: string) {
    setLocation(name)
  }

  return (
    // set max fit for content
    <div className="flex flex-col bg-slate-300 w-3/4 justify-center items-center">
      <div className="border-4 border-slate-500 rounded w-3/4 flex justify-center shadow-sm shadow-black p-1 m-1">
        <Form
          // schema={zipcode} ??
          submitText="Search"
          onSubmit={(values) => {
            // if (FORM_ERROR) {
            //   // Add error message
            //   console.log("Whoops")
            //   return
            // }
            const toNumber = Number(values.zipcode)
            setZipcode(toNumber)
          }}
          className="flex m-2 p-2 border-slate-500 border-2 rounded-md shadow-slate-800 shadow-sm bg-slate-400"
        >
          <LabeledTextField
            name="zipcode"
            label=""
            placeholder="Enter your zipcode"
            className="m-3 border-black border-2"
          />
        </Form>
      </div>
      <LocationDisplay zipcode={zipcode} location={location} />
      <WeatherDisplay zipcode={zipcode} changeLocation={changeLocation} />
    </div>
  )
}

export default SearchBar
