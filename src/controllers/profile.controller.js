import { db } from "../database/db.connection.js"

export async function getProfile(req, res) {
  const token = res.locals.session.token
  try {
      const session = await db.collection("sessions").findOne({ token })
      if (!session) return res.status(401).send("Token inválido")

      const user = await db.collection("users").findOne({ _id: session.userId })
      if (!user) return res.status(404).send("Usuário não encontrado")

      res.send({ username: user.name, email: user.email })

  } catch (err) {
      res.status(500).send(err.message)
  }
}