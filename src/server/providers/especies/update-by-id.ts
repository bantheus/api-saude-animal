import { Especie } from "@prisma/client";
import { db } from "../../lib/prisma";

export const updateById = async (id: string, especie: Omit<Especie, "id" | "createdAt" | "updatedAt">): Promise<void | Error> => {
  try {
    const result = await db.especie.update({
      where: {
        id,
      },
      data: {
        ...especie
      }
    });

    if (!result) {
      return new Error("❌ Espécie não encontrada.");
    }

    console.log("✅ Espécie atualizada com sucesso.");

    return;

  } catch (err) {
    console.error(err);
    return new Error("❌ Erro ao atualizar espécie.");
  }
};
