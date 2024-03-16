import { Historico } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { IParamProps } from "../../../shared/definitions";
import { validation } from "../../../shared/middlewares";
import { historicoProviders } from "../../providers/historico";

interface IBodyProps extends Omit<Historico, "id" | "slug" | "createdAt" | "updatedAt"> { }

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(z.object({
    titulo: z.string({ required_error: "Titulo é obrigatório" })
      .min(1, { message: "Nome deve ter no mínimo 1 caractere" })
      .max(255, { message: "Nome deve ter no máximo 255 caracteres" }),
    animalId: z.string({ required_error: "O id do animal é obrigatório" }),
    descricao: z.string({ required_error: "Descrição é obrigatório" })
      .min(1, { message: "Descrição deve ter no mínimo 1 caractere" })
      .max(255, { message: "Descrição deve ter no máximo 255 caracteres" }),
    data: z.coerce.date({ invalid_type_error: "Data inválida" })
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

  const result = await historicoProviders.updateById(req.params.id, req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      erros: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
};
