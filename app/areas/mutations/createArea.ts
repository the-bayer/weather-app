import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateArea = z.object({
  zipcode: z.string(),
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

    // can't throw error on the browser here
    if (userAreas) {
      for (let area of userAreas) {
        if (zipcode === area.zipcode) {
          console.log("Favorite already exists")
          exists = true
        }
      }
    }

    if (!exists || session.userId) {
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
