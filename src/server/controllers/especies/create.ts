import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { IEspecie } from "../../../shared/definitions";

export const bodyValidation = z.object({
  nome: z.string({ required_error: "Nome é obrigatório" })
    .min(1, { message: "Nome deve ter no mínimo 1 caracteres" })
    .max(255, { message: "Nome deve ter no máximo 255 caracteres" }),
});

export const createBodyValidator: RequestHandler = async (req, res, next) => {
  try {
    await bodyValidation.parse(req.body);
    next();
  } catch (err) {
    const zodError = err as z.ZodError;
    const errors: Record<string, string> = {};

    zodError.issues.forEach(issue => {
      if (!issue.path) return;

      const path = issue.path.join(".");
      errors[path] = issue.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({ errors });
  }
};

export const create = async (req: Request<{}, {}, IEspecie>, res: Response) => {
  let validatedData: IEspecie | undefined;

  return res.send(validatedData);
};
