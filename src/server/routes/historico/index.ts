import { Router } from "express";
import { historicoController } from "../../controllers";

const historicoRouter = Router();

historicoRouter.get("/historico",
  historicoController.getAllValidation,
  historicoController.getAll
);

historicoRouter.get("/historico/:id",
  historicoController.getByIdValidation,
  historicoController.getById
);

historicoRouter.post("/historico",
  historicoController.createValidation,
  historicoController.create
);

historicoRouter.put("/historico/:id",
  historicoController.updateByIdValidation,
  historicoController.updateById
);

historicoRouter.delete("/historico/:id",
  historicoController.deleteByIdValidation,
  historicoController.deleteById
);

export { historicoRouter };
