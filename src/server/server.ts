import "dotenv/config";
import express from "express";
import { router } from "./routes";
import { animalRouter } from "./routes/animais";
import { consultaRouter } from "./routes/consulta";
import { especieRouter } from "./routes/especies";
import { historicoRouter } from "./routes/historico";
import { usuarioRouter } from "./routes/usuarios";
import { vacinaRouter } from "./routes/vacina";

const server = express();

server.use(express.json());

server.use(router);
server.use(especieRouter);
server.use(animalRouter);
server.use(historicoRouter);
server.use(consultaRouter);
server.use(vacinaRouter);
server.use(usuarioRouter);

export { server };
