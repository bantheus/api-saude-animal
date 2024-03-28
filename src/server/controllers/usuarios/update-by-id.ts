import { Usuario } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { IParamProps } from "../../../shared/definitions";
import { validation } from "../../../shared/middlewares";
import { usuarioProviders } from "../../providers/usuarios";

interface IBodyProps extends Omit<Usuario, "id" | "createdAt" | "updatedAt"> { }

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(z.object({
    nome: z.string({ required_error: "Nome é obrigatório" })
      .min(1, { message: "Nome deve ter no mínimo 1 caractere" })
      .max(255, { message: "Nome deve ter no máximo 255 caracteres" }),
    email: z.string({ required_error: "Email é obrigatório" }).email({ message: "Email inválido" }),
    senha: z.string({ required_error: "Senha é obrigatória" })
      .min(8, { message: "Senha deve ter no mínimo 8 caracteres" })
      .max(50, { message: "Senha deve ter no máximo 50 caracteres" })
  })),
  params: getSchema<IParamProps>(z.object({
    id: z.string().uuid({ message: "ID inválido" })
  }))
}));

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      erros: {
        default: "ID inválido"
      }
    });
  }

  const result = await usuarioProviders.updateById(req.params.id, req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      erros: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
};
