import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import { connectDB } from "./models/db.js";
import cadastroRoutes from "./routes/cadastroRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

// Registrar as rotas
app.use("/cadastro", cadastroRoutes);
app.use("/", loginRoutes);

const port = process.env.PORT;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor está rodando na porta ${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
