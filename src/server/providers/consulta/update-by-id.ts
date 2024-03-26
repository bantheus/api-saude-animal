import { Historico } from "@prisma/client";
import { slugfy } from "../../../shared/slugfy";
import { db } from "../../lib/prisma";

export const updateById = async (id: string, historico: Omit<Historico, "id" | "slug" | "createdAt" | "updatedAt">): Promise<void | Error> => {
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

    const result = await db.historico.update({
      where: {
        id,
      },
      data: {
        ...historico,
        slug
      }
    });

    if (!result) {
      return new Error("❌ Registro não encontrado.");
    }

    return;

  } catch (err) {
    console.error(err);
    return new Error("❌ Erro ao atualizar registro.");
  }
};
