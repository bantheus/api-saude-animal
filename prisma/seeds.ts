import { db } from "../src/server/lib/prisma";


async function main() {
  try {
    await db.especie.createMany({
      data: [
        {
          nome: "🐶 Cachorro",
        },
        {
          nome: "🐱 Gato",
        },
      ]
    });

  } catch (err) {
    console.error(err);
  } finally {
    await db.$disconnect();
  }
}

main().then(async () => {
  await db.$disconnect();
}).catch(async (e) => {
  console.error(e);
  await db.$disconnect();
  process.exit(1);
});
