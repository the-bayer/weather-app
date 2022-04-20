import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

export default resolver.pipe(resolver.authorize(), async (_ = null, { session }) => {
  if (!session.userId) return

  const area = await db.area.findMany({
    where: {
      userId: session.userId,
    },
  })

  if (!area) throw new NotFoundError()

  return area
})
