import { Especie } from "@prisma/client";
import { slugfy } from "../../../shared/slugfy";
import { db } from "../../lib/prisma";

export const create = async (especie: Omit<Especie, "id" | "createddAt" | "updatedAt">): Promise<string | Error> => {
  const slug = slugfy(especie.nome);

  try {
    const result = await db.especie.create({
      data: {
        ...especie,
        slug
      }
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
