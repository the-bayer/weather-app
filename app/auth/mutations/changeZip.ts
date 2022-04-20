import { NotFoundError, SecurePassword, resolver } from "blitz"
import db from "db"
import { authenticateUser } from "./login"
import { ChangeZip } from "../validations"

export default resolver.pipe(
  resolver.zod(ChangeZip),
  resolver.authorize(),
  async (zipcode, { session }) => {
    const user = await db.user.findFirst({ where: { id: session.userId! } })
    if (!user) throw new NotFoundError()

    await db.user.update({
      where: { id: user.id },
      data: { defaultzip: zipcode },
    })

    return
  }
)
