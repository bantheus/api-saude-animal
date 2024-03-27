import { Vacina } from "@prisma/client";
import { db } from "../../lib/prisma";

export const getAll = async (page: number, limit: number, filter: string, id = ""): Promise<Vacina[] | Error> => {
  try {
    const result = await db.vacina.findMany({
      skip: (page - 1) * limit,
      take: parseInt(limit.toString()),
      where: {
        OR: [
          {
            nome: {
              contains: filter,
              mode: "insensitive"
            },
          },
          {
            animalId: filter

          }
        ]
      },
      include: {
        animal: {
          select: {
            nome: true
          }
        }
      }
    });

    if (id !== "") {
      const vacina = await db.vacina.findFirst({
        where: {
          id
        }
      });

      if (!vacina) {
        throw new Error("❌ Registro não encontrado.");
      }

      return [vacina];
    }

    return result.length ? result : [];
  } catch (err) {
    console.error(err);
    throw new Error("❌ Erro ao buscar registros.");
  }
};
