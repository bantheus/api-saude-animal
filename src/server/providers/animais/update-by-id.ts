import { Animal } from "@prisma/client";
import { slugfy } from "../../../shared/slugfy";
import { db } from "../../lib/prisma";

export const updateById = async (id: string, animal: Omit<Animal, "id" | "slug" | "createdAt" | "updatedAt">): Promise<void | Error> => {
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

    const result = await db.animal.update({
      where: {
        id,
      },
      data: {
        ...animal,
        slug
      }
    });

    if (!result) {
      return new Error("❌ Animal não encontrado.");
    }

    return;

  } catch (err) {
    console.error(err);
    return new Error("❌ Erro ao atualizar Animal.");
  }
};
