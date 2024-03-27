import { Vacina } from "@prisma/client";
import { slugfy } from "../../../shared/slugfy";
import { db } from "../../lib/prisma";

export const create = async (vacina: Omit<Vacina, "id" | "createddAt" | "updatedAt">): Promise<string | Error> => {
  const slug = slugfy(vacina.nome);

  try {
    const animalExist = await db.animal.findFirst({
      where: {
        id: vacina.animalId
      }
    });

    if (!animalExist) {
      throw new Error("❌ Animal não encontrado.");
    }

    const result = await db.vacina.create({
      data: {
        ...vacina,
        slug
      }
    });

    if (typeof result.id !== "string") {
      throw new Error("❌ Erro ao criar vacina.");
    }

    return result.id;

  } catch (err) {
    console.error(err);
    return Error("❌ Erro ao criar vacina.");
  }
};
