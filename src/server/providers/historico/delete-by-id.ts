import { db } from "../../lib/prisma";

export const deleteById = async (id: string): Promise<void | Error> => {
  try {
    const result = await db.historico.delete({
      where: {
        id,
      },
    });

    if (!result) {
      return new Error("❌ Registro não encontrado.");
    }

    return;
  } catch (err) {
    console.error(err);
    return new Error("❌ Erro ao deletar histórico.");
  }
};
