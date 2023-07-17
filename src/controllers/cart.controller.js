import { db } from "../database/db.connection.js";
import { ObjectId } from "mongodb";
import { cartItemSchema } from "../schemas/cartSchemas.js";
import { v4 as uuidv4 } from "uuid";

export async function addItem(req, res) {
  const {
    modelo,
    marca,
    preco,
    imgs,
    id_item,
    quantidade,
    id_usuario,
    descricao,
  } = req.body;

  try {
    const item = {
      id_usuario,
      id_item,
      modelo,
      marca,
      descricao,
      preco,
      imgs: Array.isArray(imgs) ? imgs : [],
      quantidade,
    };

    const { error } = cartItemSchema.validate(item);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    console.log(item);
    await db.collection("carrinho").insertOne(item);

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function increaseQuantity(req, res) {
  const itemId = req.params.itemId;
  const userId = req.body.userId;

  try {
    await db
      .collection("carrinho")
      .updateOne(
        { id_usuario: userId, id_item: itemId },
        { $inc: { quantidade: 1 } }
      );

    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function decreaseQuantity(req, res) {
  const itemId = req.params.itemId;
  const userId = req.body.userId;

  try {
    await db
      .collection("carrinho")
      .updateOne(
        { id_usuario: userId, id_item: itemId },
        { $inc: { quantidade: -1 } }
      );

    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function removeItem(req, res) {
  const { userId, itemId } = req.body;

  try {
    const result = await db
      .collection("carrinho")
      .deleteOne({ id_usuario: userId, id_item: itemId });

    if (result.deletedCount === 0) {
      return res.status(404).send("Item não encontrado");
    }

    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getCartItems(req, res) {
  const userId = req.params.userId;

  try {
    const cartItems = await db
      .collection("carrinho")
      .find({ id_usuario: userId })
      .toArray();

    res.json(cartItems);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function clearCart(req, res) {
  const userId = req.body.userId;

  try {
    const result = await db
      .collection("carrinho")
      .deleteMany({ id_usuario: userId });

    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
