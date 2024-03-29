import { Consulta } from "@prisma/client";
import { slugfy } from "../../../shared/slugfy";
import { db } from "../../lib/prisma";

export const create = async (consulta: Omit<Consulta, "id" | "createddAt" | "updatedAt">): Promise<string | Error> => {
  const slug = slugfy(consulta.titulo);

  try {
    const animalExist = await db.animal.findFirst({
      where: {
        id: consulta.animalId
      }
    });

    if (!animalExist) {
      throw new Error("❌ Animal não encontrado.");
    }

    const result = await db.consulta.create({
      data: {
        ...consulta,
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
