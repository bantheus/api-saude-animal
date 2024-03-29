import { Consulta } from "@prisma/client";
import { slugfy } from "../../../shared/slugfy";
import { db } from "../../lib/prisma";

export const updateById = async (id: string, consulta: Omit<Consulta, "id" | "slug" | "createdAt" | "updatedAt">): Promise<void | Error> => {
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

    const result = await db.consulta.update({
      where: {
        id,
      },
      data: {
        ...consulta,
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
