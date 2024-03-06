import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { especiesController } from "../controllers";

const router = Router();

router.get("/", (_, res) => {

  return res.status(StatusCodes.OK).json("API ta joia! 🤙🏻");
});

router.get("/especies",
  especiesController.getAllValidation,
  especiesController.getAll
);

router.get("/especies/:id",
  especiesController.getByIdValidation,
  especiesController.getById
);

router.post("/especies",
  especiesController.createValidation,
  especiesController.create
);

router.put("/especies/:id",
  especiesController.updateByIdValidation,
  especiesController.updateById
);

export { router };
