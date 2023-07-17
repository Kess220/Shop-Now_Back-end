import { db } from "../database/db.connection.js";
import { ObjectId } from "mongodb";

export async function addItem(req, res) {
  const { modelo, marca, preco, imgs, itemId, quantidade } = req.body;
  const userId = res.locals.session.userId;

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
    console.log(item);
    await db.collection("carrinho").insertOne(item);

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function increaseQuantity(req, res) {
  let itemId = req.params.id;
  itemId = new ObjectId(itemId);
  const userId = res.locals.session.userId;

  try {
    await db
      .collection("carrinho")
      .updateOne({ _id: itemId, userId }, { $inc: { quantidade: 1 } });

    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function decreaseQuantity(req, res) {
  let itemId = req.params.id;
  itemId = new ObjectId(itemId);
  const userId = res.locals.session.userId;

  try {
    await db
      .collection("carrinho")
      .updateOne({ _id: itemId, userId }, { $inc: { quantidade: -1 } });

    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function removeItem(req, res) {
  let itemId = req.params.id;
  itemId = new ObjectId(itemId);
  const userId = res.locals.session.userId;

  try {
    await db.collection("carrinho").deleteOne({ _id: itemId, userId });

    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getCartItems(req, res) {
  const userId = res.locals.session.userId;

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
  const userId = res.locals.session.userId;

  try {
    const result = await db.collection("carrinho").deleteMany({ userId });

    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
