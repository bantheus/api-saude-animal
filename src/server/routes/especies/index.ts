import { Router } from "express";
import { especiesController } from "../../controllers";

const especieRouter = Router();

especieRouter.get("/especies",
  especiesController.getAllValidation,
  especiesController.getAll
);

especieRouter.get("/especies/:id",
  especiesController.getByIdValidation,
  especiesController.getById
);

especieRouter.post("/especies",
  especiesController.createValidation,
  especiesController.create
);

especieRouter.put("/especies/:id",
  especiesController.updateByIdValidation,
  especiesController.updateById
);

especieRouter.delete("/especies/:id",
  especiesController.deleteByIdValidation,
  especiesController.deleteById
);

export { especieRouter };
