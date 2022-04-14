import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { NotFoundError, resolver, Ctx } from "blitz"
import db from "db"
import { any, z } from "zod"

const CreateArea = z.object({
  zipcode: z.number(),
  location: z.string(),
  id: z.number(),
})

// may need to add validation here?
// not sure how to get user on the server, had issues with context
export default resolver.pipe(
  resolver.zod(CreateArea),
  resolver.authorize(),
  async ({ location, zipcode, id }) => {
    const user = await db.user.findFirst({ where: { id: id } })
    if (!user) return
    // correct?

    const area = await db.area.create({
      data: {
        zipcode: zipcode,
        location: location,
        userId: user.id,
      },
    })

    return area
  }
)
