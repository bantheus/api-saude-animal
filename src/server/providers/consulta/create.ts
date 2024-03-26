import { Historico } from "@prisma/client";
import { slugfy } from "../../../shared/slugfy";
import { db } from "../../lib/prisma";

export const create = async (historico: Omit<Historico, "id" | "createddAt" | "updatedAt">): Promise<string | Error> => {
  const slug = slugfy(historico.titulo);

  try {
    const animalExist = await db.animal.findFirst({
      where: {
        id: historico.animalId
      }
    });

    if (!animalExist) {
      throw new Error("❌ Animal não encontrado.");
    }

    const result = await db.historico.create({
      data: {
        ...historico,
        slug
      }
    });

    if (typeof result.id !== "string") {
      throw new Error("❌ Erro ao criar histórico.");
    }

    return result.id;

  } catch (err) {
    console.error(err);
    return Error("❌ Erro ao criar histórico.");
  }
};
