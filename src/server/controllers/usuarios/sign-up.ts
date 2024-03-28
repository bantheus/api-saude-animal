import { Usuario } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { validation } from "../../../shared/middlewares";
import { usuarioProviders } from "../../providers/usuarios";

interface IBodyProps extends Omit<Usuario, "id" | "createdAt" | "updatedAt"> { }

export const signUpValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(z.object({
    nome: z.string({ required_error: "Nome é obrigatório" })
      .min(1, { message: "Nome deve ter no mínimo 1 caractere" })
      .max(255, { message: "Nome deve ter no máximo 255 caracteres" }),
    email: z.string({ required_error: "Email é obrigatório" }).email({ message: "Email inválido" }),
    senha: z.string({ required_error: "Senha é obrigatória" })
      .min(8, { message: "Senha deve ter no mínimo 8 caracteres" })
      .max(50, { message: "Senha deve ter no máximo 50 caracteres" })
  })),
}));

export const signUp = async (req: Request<{}, {}, Usuario>, res: Response) => {
  const result = await usuarioProviders.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).send(result);
};
