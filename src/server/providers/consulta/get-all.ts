import { Historico } from "@prisma/client";
import { db } from "../../lib/prisma";

export const getAll = async (page: number, limit: number, filter: string, id = ""): Promise<Historico[] | Error> => {
  try {
    const result = await db.historico.findMany({
      skip: (page - 1) * limit,
      take: parseInt(limit.toString()),
      where: {
        OR: [
          {
            titulo: {
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
      const historico = await db.historico.findFirst({
        where: {
          id
        }
      });

      if (!historico) {
        throw new Error("❌ Registro não encontrado.");
      }

      return [historico];
    }

    return result.length ? result : [];
  } catch (err) {
    console.error(err);
    throw new Error("❌ Erro ao buscar registros.");
  }
};
