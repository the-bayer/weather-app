import { useEffect, useState, MouseEvent, Suspense } from "react"
import { useMutation, useSession } from "blitz"
import createArea from "../../areas/mutations/createArea"
import deleteArea from "app/areas/mutations/deleteArea"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

interface AppProps {
  location?: string
  zipcode?: number
}

interface Card {
  location?: string
  zipcode?: number
}

export const DashBoard = (props: AppProps) => {
  // Edit TS here: create Zod schema?
  const [cards, setCards] = useState<Card[]>([])
  const [zipcode, setZipcode] = useState<number>()
  const [location, setLocation] = useState<string>()
  // const currentUser = useCurrentUser()
  const [createAreaMutation] = useMutation(createArea)
  const [deleteAreaMutation] = useMutation(deleteArea)
  const session = useSession()

  useEffect(() => {
    setZipcode(props.zipcode)
    setLocation(props.location)
  }, [props, zipcode, location])

  // Edit TS - mouseevent does not work
  function removeCard(e: any) {
    const id = session.userId
    // can refactor here if needed
    const badCard = cards.find((card: Card) => card.zipcode === Number(e.target.name))
    const badZip = badCard?.zipcode
    const badCardIndex = cards.findIndex((card: Card) => card.zipcode === Number(e.target.name))
    setCards(cards.filter((card: Card, index: number) => index != badCardIndex))

    if (!badZip || !id) return

    deleteAreaMutation({ badZip, id })
  }

  // displays new favorite and updates database
  function createCard() {
    // prevents duplicate cards
    for (let card of cards) {
      if (zipcode === card.zipcode) {
        console.log("card already exists")
        return
      }
    }

    setCards([
      ...cards,
      {
        location: location,
        zipcode: zipcode,
      },
    ])

    const databaseCard = async () => {
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
    databaseCard()
  }

  function handleEvent() {}

  // useEffect(() => {
  //   console.log(cards)
  // }, [cards])

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
            {cards
              ? cards.map((card: any) => {
                  return (
                    <li
                      id="location-card"
                      className="border-2 border-slate-700 rounded-xl shadow-md shadow-slate-700 grid place-items-center p-2 bg-slate-400 m-2 w-44"
                      key={card.zipcode}
                    >
                      <div className="text-center">Location: {card.location}</div>
                      <div className="text-center">Zipcode: {card.zipcode}</div>
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

export default DashBoard
