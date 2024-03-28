import { Usuario } from "@prisma/client";
import { db } from "../../lib/prisma";

export const updateById = async (id: string, usuario: Omit<Usuario, "id" | "slug" | "createdAt" | "updatedAt">): Promise<void | Error> => {

  try {
    const result = await db.usuario.update({
      where: {
        id,
      },
      data: {
        ...usuario
      }
    });

    if (!result) {
      return new Error("❌ Usuário não encontrado.");
    }

    return;

  } catch (err) {
    console.error(err);
    return new Error("❌ Erro ao atualizar usuário.");
  }
};
