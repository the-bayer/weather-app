import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteArea = z.object({
  badZip: z.number(),
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteArea),
  resolver.authorize(),
  async ({ badZip, id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const user = await db.user.findFirst({ where: { id: id } })
    if (!user) return

    const area = await db.area.deleteMany({ where: { zipcode: badZip, userId: user.id } })

    return area
  }
)
