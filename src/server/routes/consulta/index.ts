import { Router } from "express";
import { ensureAuthenticated } from "../../../shared/middlewares";
import { consultaController } from "../../controllers";

const consultaRouter = Router();

consultaRouter.get("/consulta",
  ensureAuthenticated,
  consultaController.getAllValidation,
  consultaController.getAll
);

consultaRouter.get("/consulta/:id",
  ensureAuthenticated,
  consultaController.getByIdValidation,
  consultaController.getById
);

consultaRouter.post("/consulta",
  ensureAuthenticated,
  consultaController.createValidation,
  consultaController.create
);

consultaRouter.put("/consulta/:id",
  ensureAuthenticated,
  consultaController.updateByIdValidation,
  consultaController.updateById
);

consultaRouter.delete("/consulta/:id",
  ensureAuthenticated,
  consultaController.deleteByIdValidation,
  consultaController.deleteById
);

export { consultaRouter };
