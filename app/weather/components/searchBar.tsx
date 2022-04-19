import Form from "app/core/components/Form"
import LabeledTextField from "app/core/components/LabeledTextField"
import { useRouter } from "blitz"
import LocationDisplay from "./locationDisplay"
import WeatherDisplay from "./weatherDisplay"
import { useState, useEffect } from "react"

interface AppProps {
  changeArea: Function
  favoriteZipcode?: number
  zipcode?: number
  location?: string
}

const SearchBar = (props: AppProps) => {
  const router = useRouter()
  // attempted to intialize to string here for search field
  const [fieldZip, SetFieldZip] = useState<string>()

  // is there a better way to update search field?
  // useEffect(() => {
  //   SetFieldZip(String(router.query.zipcode))
  // }, [router.query.zipcode])

  // callback to retrieve location name from weatherDisplay
  function changeLocation(location: string) {
    props.changeArea(location, props.zipcode)
  }

  return (
    // set max fit for content
    <div className="flex flex-col bg-slate-300 w-3/4 justify-center items-center">
      <div className="border-4 border-slate-500 rounded w-3/4 flex justify-center shadow-sm shadow-black p-1 m-1">
        <Form
          submitText="Search"
          onSubmit={(values) => {
            // if (FORM_ERROR) {
            //   // Add error message
            //   console.log("Whoops")
            //   return
            // }
            router.push({
              query: { zipcode: values.zipcode },
            })
            const toNumber = Number(values.zipcode)
            props.changeArea("", toNumber)
          }}
          className="flex m-2 p-2 border-slate-500 border-2 rounded-md shadow-slate-800 shadow-sm bg-slate-400"
        >
          <LabeledTextField
            name="zipcode"
            label=""
            placeholder="Enter your zipcode"
            className="m-3 border-black border-2"
            // value={fieldZip}
            // onChange={(e) => {
            //   SetFieldZip(e.target.value)
            // }}
            // add TS for events here
            onClick={(e: any) => e.target.select()}
          />
        </Form>
      </div>

      <LocationDisplay location={props.location} />

      <WeatherDisplay changeLocation={changeLocation} zipcode={props.zipcode} />
    </div>
  )
}

export default SearchBar
