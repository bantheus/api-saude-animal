import { Router } from "express";
import { ensureAuthenticated } from "../../../shared/middlewares";
import { historicoController } from "../../controllers";

const historicoRouter = Router();

historicoRouter.get("/historico",
  ensureAuthenticated,
  historicoController.getAllValidation,
  historicoController.getAll
);

historicoRouter.get("/historico/:id",
  ensureAuthenticated,
  historicoController.getByIdValidation,
  historicoController.getById
);

historicoRouter.post("/historico",
  ensureAuthenticated,
  historicoController.createValidation,
  historicoController.create
);

historicoRouter.put("/historico/:id",
  ensureAuthenticated,
  historicoController.updateByIdValidation,
  historicoController.updateById
);

historicoRouter.delete("/historico/:id",
  ensureAuthenticated,
  historicoController.deleteByIdValidation,
  historicoController.deleteById
);

export { historicoRouter };
