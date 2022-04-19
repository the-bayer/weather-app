import deleteArea from "app/areas/mutations/deleteArea"
import { Link, Routes, useMutation, useSession } from "blitz"

interface AppProps {
  zipcode?: number
  location?: string
  refetch: Function
}

const FavoriteCard = ({ zipcode, location, refetch }: AppProps) => {
  const [deleteAreaMutation] = useMutation(deleteArea)
  const session = useSession()

  // Edit TS - mouseevent does not work
  async function removeCard(e: any) {
    if (!session) return
    const badZip = Number(e.target.name)
    if (!badZip || !session.userId) return
    await deleteAreaMutation({ badZip })
    refetch()
  }

  return (
    <li
      id="location-card"
      className="border-2 border-slate-700 rounded-xl shadow-md shadow-slate-700 grid place-items-center p-2 bg-slate-400 m-2 w-44"
    >
      {/* Correct use of routes here? Should I use router.push? */}
      <Link href={Routes.UserDashBoard({ zipcode: zipcode })}>
        <a>
          Location: {location}
          <br />
          Zipcode: {zipcode}
        </a>
      </Link>
      <button onClick={removeCard} name={String(zipcode)} className="text-center" type="button">
        Remove Card
      </button>
    </li>
  )
}

export default FavoriteCard
