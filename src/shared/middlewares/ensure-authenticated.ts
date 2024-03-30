import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { jwtService } from "./jwt-service";

export const ensureAuthenticated: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      erros: { default: "Não autenticado" }
    });
  }

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      erros: { default: "Não autenticado" }
    });
  }

  const jwtData = jwtService.verify(token);

  if (jwtData === "JWT_SECRET not found in .env file.") {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      erros: { default: "Erro ao verificar token." }
    });
  }

  if (jwtData === "Token inválido.") {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      erros: { default: "Não autenticado." }
    });
  }

  req.headers.idUsuario = jwtData.uid;

  return next();
};
