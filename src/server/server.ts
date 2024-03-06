import "dotenv/config";
import express from "express";
import { router } from "./routes";
import { especieRouter } from "./routes/especies";

const server = express();

server.use(express.json());

server.use(router);
server.use(especieRouter);


export { server };
