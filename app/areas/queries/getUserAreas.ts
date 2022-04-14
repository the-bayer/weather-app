import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetArea = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional(),
})

export default resolver.pipe(resolver.zod(GetArea), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const user = await db.user.findFirst({ where: { id: id } })
  if (!user) return

  const area = await db.area.findMany({
    where: {
      userId: user.id,
    },
  })

  if (!area) throw new NotFoundError()

  return area
})
