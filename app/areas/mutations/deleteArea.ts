import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteArea = z.object({
  badZip: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteArea),
  resolver.authorize(),
  async ({ badZip }, { session }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    // const user = await db.user.findFirst({ where: { id: session.userId } })
    // if (!user) return

    const badArea = await db.area.findFirst({ where: { zipcode: badZip, userId: session.userId } })
    if (!badArea) return
    // add error
    const area = await db.area.delete({ where: { id: badArea.id } })

    return area
  }
)
