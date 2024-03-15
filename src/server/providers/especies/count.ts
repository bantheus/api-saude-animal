import { db } from "../../lib/prisma";

export const count = async (filter = ""): Promise<number | Error> => {
  try {
    const result = db.especie.count({
      where: {
        nome: {
          contains: filter,
          mode: "insensitive"
        }
      }
    });

    return result;

  } catch (err) {
    console.error(err);
    return new Error("❌ Erro ao consultar a quantidade total de espécies.");
  }
};
