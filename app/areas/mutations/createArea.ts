import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateArea = z.object({
  zipcode: z.number(),
  location: z.string(),
})

// may need to add validation here?
// for selecting Areas - verify correct user, search by zipcode and delete by ID or zipcode? not sure which yet
export default resolver.pipe(
  resolver.zod(CreateArea),
  resolver.authorize(),
  async ({ location, zipcode }) => {
    const currentUser = useCurrentUser()
    let area

    if (currentUser) {
      area = await db.area.create({
        data: {
          zipcode: zipcode,
          location: location,
          // userId: currentUser.id
        },
      })
    } else return

    return area
  }
)

//  ERROR Failed to load /Users/blake/Documents/blitz/weather-app/app/areas/mutations/createArea.ts:
// TSError: ⨯ Unable to compile TypeScript:app/users/queries/getCurrentUser.ts:4:58 -
// error TS2339: Property 'session' does not exist on type 'Ctx'.
