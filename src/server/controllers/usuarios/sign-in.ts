import { Usuario } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { validation } from "../../../shared/middlewares";
import { jwtService } from "../../../shared/middlewares/jwt-service";
import { PasswordCrypto } from "../../../shared/password-crypto";
import { usuarioProviders } from "../../providers/usuarios";

interface IBodyProps extends Omit<Usuario, "id" | "nome" | "createdAt" | "updatedAt"> { }

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(z.object({
    email: z.string({ required_error: "Email é obrigatório" }).email({ message: "Email inválido" }),
    senha: z.string({ required_error: "Senha é obrigatória" })
      .min(8, { message: "Senha deve ter no mínimo 8 caracteres" })
      .max(50, { message: "Senha deve ter no máximo 50 caracteres" })
  })),
}));

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const { email, senha } = req.body;

  const result = await usuarioProviders.getByEmail(email);

  if (result instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha inválidos"
      }
    });
  }

  const passwordMatch = await PasswordCrypto.verifyPassword(senha, result.senha);

  if (!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha inválidos"
      }
    });
  }

  const accessToken = jwtService.sign({ uid: result.id });

  if (accessToken === "JWT_SECRET not found in .env file.") {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "Erro ao gerar token de autenticação"
      }
    });
  }

  return res.status(StatusCodes.OK).json({ accessToken });
};
