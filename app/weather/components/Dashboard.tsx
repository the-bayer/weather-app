import { useEffect, useState } from "react"
import { useMutation, useQuery, useSession } from "blitz"
import createArea from "../../areas/mutations/createArea"
import deleteArea from "app/areas/mutations/deleteArea"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import getUserAreas from "app/areas/queries/getUserAreas"

interface AppProps {
  location?: string
  zipcode?: number
  setFavoriteZipcode: Function
}

interface Card {
  location?: string
  zipcode?: number
}

const DashBoard = (props: AppProps) => {
  // Edit TS here: create Zod schema?
  const [cards, setCards] = useState<Card[]>([])
  const [zipcode, setZipcode] = useState<number>()
  const [location, setLocation] = useState<string>()
  // const currentUser = useCurrentUser()
  const [createAreaMutation] = useMutation(createArea)
  const [deleteAreaMutation] = useMutation(deleteArea)
  const [userId, setUserId] = useState<number>()
  const session = useSession()

  const [userAreas] = useQuery(getUserAreas, { id: userId })

  // sets user ID
  useEffect(() => {
    if (!session.userId) return
    setUserId(session.userId)
  }, [userId, session])

  // sets state on searchbar entry
  useEffect(() => {
    setZipcode(props.zipcode)
    setLocation(props.location)
  }, [props, zipcode, location])

  // Edit TS - mouseevent does not work
  function removeCard(e: any) {
    const id = session.userId
    // can refactor here if needed

    const badZip = Number(e.target.name)
    if (!badZip || !id) return
    deleteAreaMutation({ badZip, id })

    const badCard = cards.find((card: Card) => card.zipcode === Number(e.target.name))
    const badCardIndex = cards.findIndex((card: Card) => card.zipcode === Number(e.target.name))
    setCards(cards.filter((card: Card, index: number) => index != badCardIndex))
  }

  const createdatabaseCard = async () => {
    // add validation here?
    const id = session.userId
    if (!location || !zipcode || !id) return
    // seems like there is a better way to do this

    try {
      await createAreaMutation({ location, zipcode, id })
    } catch (error) {
      console.log(error)
    }
  }

  // displays new favorite and updates database
  async function createCard() {
    // prevents duplicate cards
    let areaExists = false
    for (let card of cards) {
      if (zipcode === card.zipcode) {
        console.log("card already exists")
        areaExists = true
        return
      }
    }

    if (userAreas) {
      for (let area of userAreas) {
        if (zipcode === area.zipcode) {
          console.log("card already exists")
          areaExists = true
          console.log(areaExists)
          return
        }
      }
    }

    if (!areaExists) {
      setCards([
        ...cards,
        {
          location: location,
          zipcode: zipcode,
        },
      ])
      await createdatabaseCard()
    }
    // databaseCard();
  }

  function handleEvent() {
    console.log(userAreas)
  }

  function handleFavorite(e: any) {
    props.setFavoriteZipcode(Number(e.target.name))
  }

  // need to format scrollbar
  return (
    <>
      <div className="bg-slate-500 w-3/4 h-1/8 flex items-center justify-center border-4 border-slate-400 rounded shadow-sm shadow-black m-1 box-border">
        <button
          className="border-2 border-slate-700 rounded-xl shadow-md shadow-slate-700 grid place-items-center p-2 bg-slate-400 place-self-start m-2"
          onClick={createCard}
        >
          Add Location To Favorites
        </button>
        <div>
          <ul className="flex flex-row overflow-x-scroll">
            {userAreas
              ? userAreas.map((area) => {
                  return (
                    <li
                      id="location-card"
                      className="border-2 border-slate-700 rounded-xl shadow-md shadow-slate-700 grid place-items-center p-2 bg-slate-400 m-2 w-44"
                      key={area.zipcode}
                    >
                      <button name={String(area.zipcode)} onClick={handleFavorite}>
                        Location: {area.location}
                        <br />
                        Zipcode: {area.zipcode}
                      </button>
                      <button
                        onClick={removeCard}
                        name={String(area.zipcode)}
                        className="text-center"
                      >
                        Remove Card
                      </button>
                    </li>
                  )
                })
              : ""}
            {cards
              ? cards.map((card: any) => {
                  return (
                    <li
                      id="location-card"
                      className="border-2 border-slate-700 rounded-xl shadow-md shadow-slate-700 grid place-items-center p-2 bg-slate-400 m-2 w-44"
                      key={card.zipcode}
                    >
                      <button name={card.zipcode} onClick={handleFavorite} className="text-center ">
                        Location: {card.location}
                        <br />
                        Zipcode: {card.zipcode}
                      </button>
                      <button onClick={removeCard} name={card.zipcode} className="text-center">
                        Remove Card
                      </button>
                    </li>
                  )
                })
              : "Loading"}
          </ul>
        </div>
      </div>
      {/* <button>New Event</button> */}
      <button onClick={handleEvent}>Handle Event</button>
    </>
  )
}

DashBoard.authenticate = true
DashBoard.suppressFirstRenderFlicker = true

export default DashBoard
