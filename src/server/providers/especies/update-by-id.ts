import { Especie } from "@prisma/client";
import { slugfy } from "../../../shared/slugfy";
import { db } from "../../lib/prisma";

export const updateById = async (id: string, especie: Omit<Especie, "id" | "slug" | "createdAt" | "updatedAt">): Promise<void | Error> => {
  const slug = slugfy(especie.nome);

  try {
    const result = await db.especie.update({
      where: {
        id,
      },
      data: {
        ...especie,
        slug
      }
    });

    if (!result) {
      return new Error("❌ Espécie não encontrada.");
    }

    return;

  } catch (err) {
    console.error(err);
    return new Error("❌ Erro ao atualizar espécie.");
  }
};
