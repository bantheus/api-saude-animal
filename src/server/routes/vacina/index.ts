import { Router } from "express";
import { vacinaController } from "../../controllers/vacina";

const vacinaRouter = Router();

vacinaRouter.get("/vacina",
  vacinaController.getAllValidation,
  vacinaController.getAll
);

vacinaRouter.get("/vacina/:id",
  vacinaController.getByIdValidation,
  vacinaController.getById
);

vacinaRouter.post("/vacina",
  vacinaController.createValidation,
  vacinaController.create
);

vacinaRouter.put("/vacina/:id",
  vacinaController.updateByIdValidation,
  vacinaController.updateById
);

vacinaRouter.delete("/vacina/:id",
  vacinaController.deleteByIdValidation,
  vacinaController.deleteById
);

export { vacinaRouter };
