import { Router } from "express";
import { consultaController } from "../../controllers/consulta";

const consultaRouter = Router();

consultaRouter.get("/consulta",
  consultaController.getAllValidation,
  consultaController.getAll
);

consultaRouter.get("/consulta/:id",
  consultaController.getByIdValidation,
  consultaController.getById
);

consultaRouter.post("/consulta",
  consultaController.createValidation,
  consultaController.create
);

consultaRouter.put("/consulta/:id",
  consultaController.updateByIdValidation,
  consultaController.updateById
);

consultaRouter.delete("/consulta/:id",
  consultaController.deleteByIdValidation,
  consultaController.deleteById
);

export { consultaRouter };
