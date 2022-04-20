import Form from "app/core/components/Form"
import LabeledTextField from "app/core/components/LabeledTextField"
import { useRouter, useSession } from "blitz"
import LocationDisplay from "./locationDisplay"
import WeatherDisplay from "./weatherDisplay"
import React, { useMemo, useState } from "react"

interface AppProps {
  changeArea: Function
  zipcode?: string
  location?: string
}

const SearchBar = (props: AppProps) => {
  const router = useRouter()
  // state to allow search bar to display current zipcode
  const [fieldZip, SetFieldZip] = useState<string>()
  const session = useSession()

  useMemo(() => {
    if (!router.query.zipcode) return
    SetFieldZip(String(router.query.zipcode))
  }, [router.query.zipcode])

  // callback to retrieve location name from weatherDisplay
  function changeLocation(location: string) {
    props.changeArea(location, router.query.zipcode)
  }

  return (
    <div className="flex flex-col bg-slate-200 w-11/12 mx-2 lg:m-0 lg:w-3/4 place-items-center bg-slate-300 border-8 p-8 border-slate-600 rounded-xl md:mt-0 mt-2 overflow-auto">
      <div className="border-4 border-slate-500 rounded lg:w-3/4 w-full flex justify-center shadow-sm shadow-black p-1 m-1">
        <Form
          onSubmit={(values) => {
            router.push({
              query: { zipcode: fieldZip },
            })

            props.changeArea("", values.zipcode)
          }}
          className="flex m-2 p-2 border-slate-500 border-2 rounded-md shadow-slate-800 shadow-sm bg-slate-400"
        >
          <LabeledTextField
            name="zipcode"
            label=""
            placeholder="Enter your zipcode"
            className="m-3 border-black border-2"
            value={fieldZip}
            onChange={(e) => {
              SetFieldZip(e.target.value)
            }}
            onClick={(e: any) => e.target.select()}
          />
          <button
            type="submit"
            className=" border-slate-700 border-2 shadow rounded-md p-2 hover:bg-slate-600 hover:text-white"
          >
            Search
          </button>
        </Form>
      </div>
      <div className="flex flex-col place-items-center justify-content-center content-center lg:w-3/4 w-full">
        <LocationDisplay location={props.location} />
        <WeatherDisplay changeLocation={changeLocation} zipcode={props.zipcode} />
      </div>
    </div>
  )
}

export default SearchBar
