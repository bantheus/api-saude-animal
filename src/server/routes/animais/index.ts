import { Router } from "express";
import { ensureAuthenticated } from "../../../shared/middlewares";
import { animaisController } from "../../controllers";

const animalRouter = Router();

animalRouter.get("/animais",
  ensureAuthenticated,
  animaisController.getAllValidation,
  animaisController.getAll
);

animalRouter.get("/animais/:id",
  ensureAuthenticated,
  animaisController.getByIdValidation,
  animaisController.getById
);

animalRouter.post("/animais",
  ensureAuthenticated,
  animaisController.createValidation,
  animaisController.create
);

animalRouter.put("/animais/:id",
  ensureAuthenticated,
  animaisController.updateByIdValidation,
  animaisController.updateById
);

animalRouter.delete("/animais/:id",
  ensureAuthenticated,
  animaisController.deleteByIdValidation,
  animaisController.deleteById
);

export { animalRouter };
