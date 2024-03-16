import "dotenv/config";
import express from "express";
import { router } from "./routes";
import { animalRouter } from "./routes/animais";
import { especieRouter } from "./routes/especies";
import { historicoRouter } from "./routes/historico";

const server = express();

server.use(express.json());

server.use(router);
server.use(especieRouter);
server.use(animalRouter);
server.use(historicoRouter);


export { server };
