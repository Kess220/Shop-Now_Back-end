import { db } from "../database/db.connection.js";
import { ObjectId } from "mongodb";
import { cartItemSchema } from "../schemas/cartSchemas.js";

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
      id_usuario: id_usuario,
      id_item: id_item,
      modelo,
      marca,
      descricao,
      preco,
      imgs: imgs,
      quantidade,
    };

    // Validar o item do carrinho com o esquema definido
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
  let itemId = req.params.id;
  itemId = new ObjectId(itemId);
  const userId = req.body.userId;

  try {
    await db
      .collection("carrinho")
      .updateOne(
        { _id: itemId, id_usuario: userId },
        { $inc: { quantidade: 1 } }
      );

    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function decreaseQuantity(req, res) {
  let itemId = req.params.id;
  itemId = new ObjectId(itemId);
  const userId = req.body.userId;

  try {
    await db
      .collection("carrinho")
      .updateOne(
        { _id: itemId, id_usuario: userId },
        { $inc: { quantidade: -1 } }
      );

    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function removeItem(req, res) {
  let itemId = req.params.id;
  itemId = new ObjectId(itemId);
  const userId = req.body.userId;

  try {
    await db
      .collection("carrinho")
      .deleteOne({ _id: itemId, id_usuario: userId });

    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getCartItems(req, res) {
  const userId = req.body.userId;

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
