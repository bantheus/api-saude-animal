import { Especie } from "@prisma/client";
import { db } from "../../lib/prisma";

export const getAll = async (page: number, limit: number, filter: string, id = ""): Promise<Especie[] | Error> => {
  try {
    const result = await db.especie.findMany({
      skip: (page - 1) * limit,
      take: parseInt(limit.toString()),
      where: {
        nome: {
          contains: filter,
          mode: "insensitive"
        }
      }
    });

    if (id !== "") {
      const especie = await db.especie.findFirst({
        where: {
          id
        }
      });

      if (!especie) {
        throw new Error("❌ Espécie não encontrada.");
      }

      return [especie];
    }

    return result.length ? result : [];
  } catch (err) {
    console.error(err);
    throw new Error("❌ Erro ao buscar espécies.");
  }
};
