import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { especiesController } from "../controllers";

const router = Router();

router.get("/", (_, res) => {

  return res.status(StatusCodes.OK).json("API ta joia! 🤙🏻");
});

router.post("/especies",
  especiesController.createValidation,
  especiesController.create
);

export { router };
