import { Animal } from "@prisma/client";
import { db } from "../../lib/prisma";

export const getAll = async (page: number, limit: number, filter: string, id = ""): Promise<Animal[] | Error> => {
  try {
    const result = await db.animal.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        OR: [
          {
            nome: {
              contains: filter
            },
          },
          {
            especieId: filter
          }
        ]
      }
    });

    if (id !== "") {
      const animal = await db.animal.findFirst({
        where: {
          id
        }
      });

      if (!animal) {
        throw new Error("❌ Animal não encontrado.");
      }

      return [animal];
    }

    return result.length ? result : [];
  } catch (err) {
    console.error(err);
    throw new Error("❌ Erro ao buscar animais.");
  }
};
