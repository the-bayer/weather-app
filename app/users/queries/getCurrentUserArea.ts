import { Ctx } from "blitz"
import db from "db"
import { Context } from "react"

export default async function getCurrentUser(userId: number) {
  if (!userId) return null

  const user = await db.user.findFirst({
    where: { id: userId },
    select: { defaultzip: true },
  })

  return user
}
