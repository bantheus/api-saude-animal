import { Animal } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { validation } from "../../../shared/middlewares";
import { animaisProviders } from "../../providers/animais";

interface IBodyProps extends Omit<Animal, "id" | "slug" | "createdAt" | "updatedAt"> { }

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(z.object({
    nome: z.string({ required_error: "Nome é obrigatório" })
      .min(1, { message: "Nome deve ter no mínimo 1 caractere" })
      .max(255, { message: "Nome deve ter no máximo 255 caracteres" }),
    especieId: z.string({ required_error: "O id da espécie é obrigatório" }),
    sexo: z.enum(["MACHO", "FEMEA"], { required_error: "Sexo é obrigatório" }),
    peso: z.number({ required_error: "Peso é obrigatório" })
      .min(0, { message: "Peso deve ser maior ou igual a 0" }),
    foto: z.string({ required_error: "Foto é obrigatório" })
      .url({ message: "Foto deve ser uma URL válida" }),
  })),
}));

export const create = async (req: Request<{}, {}, Animal>, res: Response) => {
  const result = await animaisProviders.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).send(result);
};
