import { Animal } from "@prisma/client";
import { slugfy } from "../../../shared/slugfy";
import { db } from "../../lib/prisma";

export const create = async (animal: Omit<Animal, "id" | "createddAt" | "updatedAt">): Promise<string | Error> => {
  const slug = slugfy(animal.nome);

  try {
    const especieExist = await db.especie.findFirst({
      where: {
        id: animal.especieId
      }
    });

    if (!especieExist) {
      throw new Error("❌ Espécie não encontrada.");
    }

    const result = await db.animal.create({
      data: {
        ...animal,
        slug
      }
    });

    if (typeof result.id !== "string") {
      throw new Error("❌ Erro ao criar animal.");
    }

    return result.id;

  } catch (err) {
    console.error(err);
    return Error("❌ Erro ao criar animal.");
  }
};
