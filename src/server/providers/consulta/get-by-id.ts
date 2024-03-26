import { Historico } from "@prisma/client";
import { db } from "../../lib/prisma";

export const getById = async (id: string): Promise<Historico | Error> => {
  try {
    const result = await db.historico.findUnique({
      where: {
        id
      }
    });

    if (!result) {
      throw new Error("❌ Registro não encontrado.");
    }

    return result;
  } catch (err) {
    console.error(err);
    return new Error("❌ Erro ao buscar histórico.");
  }
};
