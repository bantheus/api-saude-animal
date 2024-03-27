import { Vacina } from "@prisma/client";
import { slugfy } from "../../../shared/slugfy";
import { db } from "../../lib/prisma";

export const updateById = async (id: string, vacina: Omit<Vacina, "id" | "slug" | "createdAt" | "updatedAt">): Promise<void | Error> => {
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

    const result = await db.vacina.update({
      where: {
        id,
      },
      data: {
        ...vacina,
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
