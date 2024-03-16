import { Router } from "express";
import { animaisController } from "../../controllers";

const animalRouter = Router();

animalRouter.get("/animais",
  animaisController.getAllValidation,
  animaisController.getAll
);

animalRouter.get("/animais/:id",
  animaisController.getByIdValidation,
  animaisController.getById
);

animalRouter.post("/animais",
  animaisController.createValidation,
  animaisController.create
);

animalRouter.put("/animais/:id",
  animaisController.updateByIdValidation,
  animaisController.updateById
);

animalRouter.delete("/animais/:id",
  animaisController.deleteByIdValidation,
  animaisController.deleteById
);

export { animalRouter };
