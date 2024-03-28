import { Router } from "express";
import { usuarioController } from "../../controllers";

const usuarioRouter = Router();

usuarioRouter.post("/entrar",
  usuarioController.signInValidation,
  usuarioController.signIn
);

usuarioRouter.post("/cadastrar",
  usuarioController.signUpValidation,
  usuarioController.signUp
);

usuarioRouter.put("/usuarios/:id",
  usuarioController.updateByIdValidation,
  usuarioController.updateById
);

usuarioRouter.delete("/usuarios/:id",
  usuarioController.deleteByIdValidation,
  usuarioController.deleteById
);

export { usuarioRouter };
