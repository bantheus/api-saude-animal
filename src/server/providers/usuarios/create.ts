import { Usuario } from "@prisma/client";
import { db } from "../../lib/prisma";

export const create = async (usuario: Omit<Usuario, "id" | "createddAt" | "updatedAt">): Promise<string | Error> => {
  try {
    const result = await db.usuario.create({
      data: {
        ...usuario,
      }
    });

    if (typeof result.id !== "string") {
      throw new Error("❌ Erro ao criar usuário.");
    }

    return result.id;

  } catch (err) {
    console.error(err);
    return Error("❌ Erro ao criar usuário.");
  }
};
