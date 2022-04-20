import deleteArea from "app/areas/mutations/deleteArea"
import { Link, Routes, useMutation } from "blitz"
import React from "react"

interface AppProps {
  zipcode?: string
  location?: string
  refetch: Function
}

// interface CardEventTarget extends React.MouseEvent<HTMLButtonElement> {

// }

const FavoriteCard = ({ zipcode, location, refetch }: AppProps) => {
  const [deleteAreaMutation] = useMutation(deleteArea)

  // Edit TS - mouseevent does not work
  async function removeCard(e: any) {
    const badZip = e.target.name
    if (!badZip) return
    await deleteAreaMutation({ badZip })
    refetch()
  }

  return (
    <li
      id="location-card"
      className="flex flex-col border-2 border-slate-700 rounded-xl shadow-md shadow-slate-700 grid place-items-center p-2 bg-slate-400 m-2 min-w-fit"
    >
      {/* Correct use of routes here? Should I use router.push? */}
      <Link href={Routes.UserDashBoard({ zipcode: zipcode })}>
        <a className="text-center hover:bg-slate-600 hover:text-white rounded-xl place-self-center">
          Location: {location}
          <br />
          Zipcode: {zipcode}
        </a>
      </Link>
      <button
        onClick={removeCard}
        name={String(zipcode)}
        className="text-center mt-2 border-slate-700 border-2 shadow rounded-md p-2 hover:bg-slate-600 hover:text-white"
        type="button"
      >
        Remove Card
      </button>
    </li>
  )
}

export default FavoriteCard
