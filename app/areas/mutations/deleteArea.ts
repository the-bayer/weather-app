import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteArea = z.object({
  badZip: z.string(),
})

export default resolver.pipe(
  resolver.zod(DeleteArea),
  resolver.authorize(),
  async ({ badZip }, { session }) => {
    const badArea = await db.area.findFirst({ where: { zipcode: badZip, userId: session.userId } })

    if (!badArea) {
      console.log("No area with this zipcode exists under this user")
      return
    }

    const area = await db.area.delete({ where: { id: badArea.id } })

    return area
  }
)
