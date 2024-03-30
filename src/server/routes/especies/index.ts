import { Router } from "express";
import { ensureAuthenticated } from "../../../shared/middlewares";
import { especiesController } from "../../controllers";

const especieRouter = Router();

especieRouter.get("/especies",
  ensureAuthenticated,
  especiesController.getAllValidation,
  especiesController.getAll
);

especieRouter.get("/especies/:id",
  ensureAuthenticated,
  especiesController.getByIdValidation,
  especiesController.getById
);

especieRouter.post("/especies",
  ensureAuthenticated,
  especiesController.createValidation,
  especiesController.create
);

especieRouter.put("/especies/:id",
  ensureAuthenticated,
  especiesController.updateByIdValidation,
  especiesController.updateById
);

especieRouter.delete("/especies/:id",
  ensureAuthenticated,
  especiesController.deleteByIdValidation,
  especiesController.deleteById
);

export { especieRouter };
