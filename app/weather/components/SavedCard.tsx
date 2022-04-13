import { useState, useEffect, useRef } from "react"

interface AppProps {
  zipcode?: number
  location?: string
  key?: string
  removeCard: Function
}

const SavedCard = (props: AppProps) => {
  const zipcode = useRef(props.zipcode)
  const location = useRef(props.location)

  // useEffect(() => {
  //   // if (!props.location) return;
  //   // if (!props.zipcode) return;
  //   setLocation(props.location),
  //   setZipcode(props.zipcode)
  // }, [])

  return (
    <div
      id="location-card"
      className="border-2 border-slate-700 rounded-xl shadow-md shadow-slate-700 grid place-items-center p-2 bg-slate-400"
    >
      <div>Location : {props.location ? location : "Loading..."}</div>
      <div>Zipcode: {props.zipcode ? zipcode : "Loading..."}</div>
      <button name="remove" onClick={props.removeCard()}>
        remove
      </button>
    </div>
  )
}

export default SavedCard
