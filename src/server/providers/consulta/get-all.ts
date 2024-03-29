import { Consulta } from "@prisma/client";
import { db } from "../../lib/prisma";

export const getAll = async (page: number, limit: number, filter: string, id = ""): Promise<Consulta[] | Error> => {
  try {
    const result = await db.consulta.findMany({
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
      const consulta = await db.consulta.findFirst({
        where: {
          id
        }
      });

      if (!consulta) {
        throw new Error("❌ Registro não encontrado.");
      }

      return [consulta];
    }

    return result.length ? result : [];
  } catch (err) {
    console.error(err);
    throw new Error("❌ Erro ao buscar registros.");
  }
};
