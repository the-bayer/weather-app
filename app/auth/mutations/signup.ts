import { resolver, SecurePassword } from "blitz"
import db from "db"
import { Signup } from "app/auth/validations"
import { Role } from "types"

export default resolver.pipe(resolver.zod(Signup), async ({ email, password, defaultzip }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim())
  const user = await db.user.create({
    data: { email: email.toLowerCase().trim(), hashedPassword, role: "USER", defaultzip },
    select: { id: true, name: true, email: true, role: true, defaultzip: true },
  })

  await ctx.session.$create({ userId: user.id, role: user.role as Role })
  return user
})
