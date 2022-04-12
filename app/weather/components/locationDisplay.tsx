interface AppProps {
  zipcode?: number
  location?: string
}

const LocationDisplay = (props: AppProps) => {
  return (
    <div className="bg-slate-500 w-3/4 h-20 flex items-center justify-center border-4 border-slate-400 rounded shadow-sm shadow-black p-1 m-1">
      <div className="bg-slate-400 border-2 border-slate-700 rounded-lg p-3 w-1/3 text-center shadow-sm shadow-black">
        {props.location}
      </div>
      {/* <div>{props.zipcode}</div> */}
    </div>
  )
}

export default LocationDisplay
