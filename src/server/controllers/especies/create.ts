import { Request, Response } from "express";
import { IEspecie } from "../../../shared/definitions";

import { z } from "zod";

export const bodyValidation = z.object({
  nome: z.string({ required_error: "Nome é obrigatório" }).min(3, { message: "Nome deve ter no mínimo 3 caracteres" })
    .max(255, { message: "Nome deve ter no máximo 255 caracteres" })
});

export const create = async (req: Request<{}, {}, IEspecie>, res: Response) => {

  let validatedData: IEspecie | undefined;

  try {
    validatedData = await bodyValidation.parseAsync(req.body);
  } catch (error) {
    const zodError = error as z.ZodError;

    return res.json({
      errors: {
        default: zodError.issues.map((issue) => issue.message)
      }
    });
  }

  return res.send(validatedData);
};
