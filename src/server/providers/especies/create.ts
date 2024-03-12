import { Especie } from "@prisma/client";
import { db } from "../../lib/prisma";

export const create = async (especie: Omit<Especie, "id" | "createddAt" | "updatedAt">): Promise<string | Error> => {
  try {
    const result = await db.especie.create({
      data: especie,
    });

    if (typeof result.id !== "string") {
      throw new Error("❌ Erro ao criar espécie.");
    }

    console.log("✅ Espécie criada com sucesso.");

    return result.id;

  } catch (err) {
    console.error(err);
    return Error("❌ Erro ao criar espécie.");
  }
};
