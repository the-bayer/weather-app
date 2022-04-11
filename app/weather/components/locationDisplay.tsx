import { BlitzPage } from "blitz"
import { ReactChild, ReactFragment, ReactPortal } from "react"

const LocationDisplay = (props: { zipcode: number | undefined }) => {
  return (
    <div className="bg-slate-500 w-3/4 h-20 flex items-center justify-center border-2 border-slate-400 rounded shadow-sm shadow-black p-1 m-1">
      Location Display
      <div>{props.zipcode}</div>
    </div>
  )
}

export default LocationDisplay
