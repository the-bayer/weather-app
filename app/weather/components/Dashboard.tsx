import { useEffect, useState } from "react"
import { useMutation, useQuery, useSession } from "blitz"
import createArea from "../../areas/mutations/createArea"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import getUserAreas from "app/areas/queries/getUserAreas"
import FavoriteCard from "./favoriteCard"

interface AppProps {
  location?: string
  zipcode?: number
  handleFavorite: Function
}

const DashBoard = ({ location, zipcode, handleFavorite }: AppProps) => {
  const session = useSession()
  const [createAreaMutation] = useMutation(createArea)
  const [userAreas, { refetch }] = useQuery(getUserAreas, session)

  function handleFavoriteCard(zipcode: number) {
    handleFavorite(zipcode)
  }

  // need to format scrollbar
  return (
    <>
      <div className="bg-slate-500 w-3/4 h-1/8 flex items-center justify-center border-4 border-slate-400 rounded shadow-sm shadow-black m-1 box-border">
        <button
          className="border-2 border-slate-700 rounded-xl shadow-md shadow-slate-700 grid place-items-center p-2 bg-slate-400 place-self-start m-2"
          onClick={async () => {
            try {
              if (!zipcode || !location) return
              await createAreaMutation({ location, zipcode })
              refetch()
            } catch (error) {
              console.log(error)
            }
          }}
        >
          Add Location To Favorites
        </button>
        <div>
          <ul className="flex flex-row overflow-x-scroll">
            {userAreas
              ? userAreas.map((area) => {
                  return (
                    <FavoriteCard
                      zipcode={area.zipcode}
                      location={area.location}
                      key={area.zipcode}
                      refetch={refetch}
                      handleFavoriteCard={handleFavoriteCard}
                    />
                  )
                })
              : ""}
          </ul>
        </div>
      </div>
    </>
  )
}

DashBoard.authenticate = true
export default DashBoard
