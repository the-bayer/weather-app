import { NotFoundError, resolver, useQuery, useSession } from "blitz"
import db from "db"
import { z } from "zod"

const CreateArea = z.object({
  zipcode: z.number(),
  location: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateArea),
  resolver.authorize(),
  async ({ location, zipcode }, { session }) => {
    let exists = false
    const userAreas = await db.area.findMany({
      where: {
        userId: session.userId,
      },
    })

    if (userAreas) {
      for (let area of userAreas) {
        if (zipcode === area.zipcode) {
          // throw error
          console.log("Favorite already exists")
          exists = true
        }
      }
    }

    if (!exists) {
      const area = await db.area.create({
        data: {
          zipcode: zipcode,
          location: location,
          userId: session.userId,
        },
      })
      return area
    }
  }
)
