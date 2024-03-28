import { Usuario } from "@prisma/client";
import { db } from "../../lib/prisma";

export const getByEmail = async (email: string): Promise<Usuario | Error> => {
  try {
    const result = await db.usuario.findUnique({
      where: {
        email
      }
    });

    if (!result) {
      throw new Error("❌ Usuário não encontrado.");
    }

    return result;
  } catch (err) {
    console.error(err);
    return new Error("❌ Erro ao buscar usuário.");
  }
};
