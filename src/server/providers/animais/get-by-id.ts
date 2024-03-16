import { Animal } from "@prisma/client";
import { db } from "../../lib/prisma";

export const getById = async (id: string): Promise<Animal | Error> => {
  try {
    const result = await db.animal.findUnique({
      where: {
        id
      }
    });

    if (!result) {
      throw new Error("❌ Animal não encontrado.");
    }

    return result;
  } catch (err) {
    console.error(err);
    return new Error("❌ Erro ao buscar animal.");
  }
};
