import { db } from "../database/db.connection.js";

export async function addToCart(req, res) {
  const itemId = req.body.itemId; 

  try {
      const userId = res.locals.session.userId; 

      await db.collection("users").updateOne(
          { _id: userId },
          { $push: { cart: itemId } }
      );

      res.sendStatus(200);
  } catch (err) {
      res.status(500).send(err.message);
  }
}
