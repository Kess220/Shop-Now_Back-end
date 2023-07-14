import { db } from "../database/db.connection.js";
import { ObjectId } from 'mongodb';


export async function addItem(req, res) {
    const { modelo, marca, descricao, preco, imgs, itemId, quantidade } = req.body;
    // const { userId } = res.locals.session;
    
    try {
        const item = {
            modelo,
            marca,
            descricao,
            preco,
            imgs,
            quantidade,
            // userId: id,
            userId: 1,
            _id: itemId,
        };
        console.log(item)
        await db.collection("carrinho").insertOne(item);
        
        res.sendStatus(201);

    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function removeItem(req, res) {
    const itemId = req.params.id;
    // const { id } = res.locals.session;

    try {
        const result = await db.collection("carrinho").deleteOne({
            _id: ObjectId(itemId),
            // userId: id
            userId: 1
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Item not found in cart" });
        }

        res.sendStatus(204);
    } catch (err) {
        res.status(500).send(err.message);
    }
}


export async function updateItemQuantity(req, res) {
    const { itemId, quantidade } = req.body;
  
    try {
      const result = await db.collection("carrinho").updateOne(
        { _id: ObjectId(itemId), userId: 1 },
        { $set: { quantidade: quantidade } }
      );
  
      if (result.modifiedCount === 0) {
        return res.status(404).json({ error: "Item not found in cart" });
      }
  
      res.sendStatus(204);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

export async function getCartItems(req, res) {
    // const { id } = res.locals.session;

    try {
        const cartItems = await db
            .collection("carrinho")
            // .find({ userId: id })
            .find({ userId: 1 })

            .toArray();

        res.json(cartItems);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function clearCart(req, res) {
    // const { id } = res.locals.session;

    try {
        const result = await db.collection("carrinho").deleteMany({ userId: 1 });

        res.sendStatus(204);
    } catch (err) {
        res.status(500).send(err.message);
    }
}