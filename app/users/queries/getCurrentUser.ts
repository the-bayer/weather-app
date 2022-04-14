import { Ctx } from "blitz"
import db from "db"

export default async function getCurrentUser(_ = null, { session }: Ctx) {
  if (!session.userId) return null

  const user = await db.user.findFirst({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, role: true },
  })

  return user
}

//ERROR Failed to load /Users/blake/Documents/blitz/weather-app/app/areas/mutations/createArea.ts: TSError: ⨯ Unable to compile TypeScript:
// app/users/queries/getCurrentUser.ts:4:58 - error TS2339: Property 'session' does not exist on type 'Ctx'.

// 4 export default async function getCurrentUser(_ = null, { session }: Ctx) {
