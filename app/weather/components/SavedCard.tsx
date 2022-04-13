import { useState, useEffect, useRef } from "react"

interface AppProps {
  zipcode?: number
  location?: string
  removeCard?: Function
}

const SavedCard = (props: AppProps) => {
  // let zipcode;
  // let location;
  // const [zipcode, setZipcode] = useState<any>();
  // const [location, setLocation] = useState<any>();
  const zipcode = useRef<any>()
  const location = useRef<any>()

  useEffect(() => {
    zipcode.current = String(props.zipcode)
    location.current = String(props.location)
  }, [props])

  // useEffect(() => {
  //   // if (!props.location) return;
  //   // if (!props.zipcode) return;
  //   setLocation(props.location),
  //   setZipcode(props.zipcode)
  // }, [props])

  // useEffect(() => {
  //   zipcode = props.zipcode;
  // })

  function cardFunction() {
    console.log(zipcode.current)
    console.log(location.current)
  }

  return (
    <div
      id="location-card"
      className="border-2 border-slate-700 rounded-xl shadow-md shadow-slate-700 grid place-items-center p-2 bg-slate-400"
    >
      <div>Location: {location ? location.current : "Loading..."}</div>
      <div>Zipcode: {zipcode ? zipcode.current : "Loading..."}</div>
      {/* <button name="remove" onClick={props.removeCard()}>
        remove
      </button> */}
      <button>Card Button</button>
    </div>
  )
}

export default SavedCard
