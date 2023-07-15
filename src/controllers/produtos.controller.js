import { db } from "../database/db.connection.js"

export async function getProdutos(req, res) {

    try {

        const produtos = await db.collection("produtos").find().toArray()
        res.status(201).send(produtos)

    } catch (err) {
        res.status(500).send(err.message)
    }
}


