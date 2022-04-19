import { resolver, NotFoundError, useSession, useQuery } from "blitz"
import db from "db"
import { z } from "zod"

const GetArea = z.object({})

export default resolver.pipe(resolver.authorize(), async (_ = null, { session }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  // const user = await db.user.findFirst({ where: { id: session.userId } })

  // const session = useSession();
  if (!session.userId) return

  const area = await db.area.findMany({
    where: {
      userId: session.userId,
    },
  })

  if (!area) throw new NotFoundError()

  return area
})
