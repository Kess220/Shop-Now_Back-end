import { db } from "../database/db.connection.js"
import bcrypt from "bcrypt"
import { ObjectId } from "mongodb";


export async function getProfile(req, res) {
  const userId = req.params.userId;

  try {
    const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });
    if (!user) return res.status(404).send("Usuário não encontrado");

    res.send({ username: user.name, email: user.email, image: user.image});

  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function changePassword(req, res) {
  const userId = req.params.userId;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });
    if (!user) return res.status(404).send("Usuário não encontrado");

    const isPasswordCorrect = bcrypt.compareSync(currentPassword, user.password);
    if (!isPasswordCorrect) return res.status(401).send("Senha atual incorreta");

    const newHash = bcrypt.hashSync(newPassword, 10);

    await db.collection("users").updateOne({ _id: new ObjectId(userId) }, { $set: { password: newHash } });

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function changeName(req, res) {
  const userId = req.params.userId;
  const { newName } = req.body;

  try {
    await db.collection("users").updateOne({ _id: new ObjectId(userId) }, { $set: { name: newName } });

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function changeEmail(req, res) {
  const userId = req.params.userId;
  const { newEmail } = req.body;

  try {
    const existingUser = await db.collection("users").findOne({ email: newEmail });
    if (existingUser) return res.status(409).send("E-mail já está sendo utilizado por outro usuário");

    await db.collection("users").updateOne({ _id: new ObjectId(userId) }, { $set: { email: newEmail } });

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function changeImage(req, res) {
  const userId = req.params.userId;
  const { newImage } = req.body;

  try {
    await db.collection("users").updateOne({ _id: new ObjectId(userId) }, { $set: { image: newImage } });

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

