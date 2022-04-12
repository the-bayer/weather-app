interface AppProps {
  zipcode?: number
  location?: string
}

const LocationDisplay = (props: AppProps) => {
  return (
    <div className="bg-slate-500 w-3/4 h-20 flex items-center justify-center border-2 border-slate-400 rounded shadow-sm shadow-black p-1 m-1">
      <div>{props.location}</div>
      <div>{props.zipcode}</div>
    </div>
  )
}

export default LocationDisplay
