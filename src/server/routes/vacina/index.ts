import { Router } from "express";
import { ensureAuthenticated } from "../../../shared/middlewares";
import { vacinaController } from "../../controllers";

const vacinaRouter = Router();

vacinaRouter.get("/vacina",
  ensureAuthenticated,
  vacinaController.getAllValidation,
  vacinaController.getAll
);

vacinaRouter.get("/vacina/:id",
  ensureAuthenticated,
  vacinaController.getByIdValidation,
  vacinaController.getById
);

vacinaRouter.post("/vacina",
  ensureAuthenticated,
  vacinaController.createValidation,
  vacinaController.create
);

vacinaRouter.put("/vacina/:id",
  ensureAuthenticated,
  vacinaController.updateByIdValidation,
  vacinaController.updateById
);

vacinaRouter.delete("/vacina/:id",
  ensureAuthenticated,
  vacinaController.deleteByIdValidation,
  vacinaController.deleteById
);

export { vacinaRouter };
