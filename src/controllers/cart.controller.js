import { db } from "../database/db.connection.js";
import { ObjectId } from 'mongodb';

//colocar no botão de adicionar no carrinho usando banco de dados
export async function addItem(req, res) {
    const { modelo, marca, preco, imgs, itemId, quantidade } = req.body;
    // const { userId } = res.locals.session;
    const userId = 1;

    try {
        const item = {
            _id: itemId,
            userId,
            modelo,
            marca,
            preco,
            imgs,
            quantidade,
        };
        console.log(item)
        await db
            .collection("carrinho")
            .insertOne(item);

        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

// adiciona 1 na quantidade do item no carrinho
export async function increaseQuantity(req, res) {
    let itemId = req.params.id;
    itemId = new ObjectId(itemId)
    // const { userId } = res.locals.session;
    const userId = 1;

    try {
        await db
            .collection("carrinho")
            .updateOne(
                { _id: itemId, userId },
                { $inc: { quantidade: 1 } } // Incrementa a quantidade em 1
            );

        res.sendStatus(204);
    } catch (err) {
        res.status(500).send(err.message);
    }
}
// remove item do carrinho
export async function decreaseQuantity(req, res) {
    let itemId = req.params.id;
    itemId = new ObjectId(itemId)
    // const { userId } = res.locals.session;
    const userId = 1;

    try {
        await db
            .collection("carrinho")
            .updateOne(
                { _id: itemId, userId },
                { $inc: { quantidade: -1 } } // Diminui a quantidade em 1
            );

        res.sendStatus(204);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

//colocar no borão de lixo
export async function removeItem(req, res) {
    let itemId = req.params.id;
    itemId = new ObjectId(itemId)
    // const { userId } = res.locals.session;
    const userId = 1;

    try {
        await db
            .collection("carrinho")
            .deleteOne(
                { _id: itemId, userId },
            );

        if (await db.deletedCount === 0) return res.sendStatus(404)
        res.sendStatus(202)

        res.sendStatus(204);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getCartItems(req, res) {
    // const { userId } = res.locals.session;
    const userId = 1;

    try {
        const cartItems = await db
            .collection("carrinho")
            .find({ userId })

            .toArray();

        res.json(cartItems);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function clearCart(req, res) {
    // const { userId } = res.locals.session;
    const userId = 1;

    try {
        const result = await db.collection("carrinho").deleteMany({ userId });

        res.sendStatus(204);
    } catch (err) {
        res.status(500).send(err.message);
    }
}