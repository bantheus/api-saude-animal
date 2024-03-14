import { Especie } from "@prisma/client";
import { db } from "../../lib/prisma";

export const getById = async (id: string): Promise<Especie | Error> => {
  try {
    const result = await db.especie.findUnique({
      where: {
        id
      }
    });

    if (!result) {
      return new Error("❌ Espécie não encontrada.");
    }

    console.log("✅ Espécie encontrada com sucesso.");

    return result;

  } catch (err) {
    console.error(err);
    return new Error("❌ Erro ao buscar espécie.");
  }
};
