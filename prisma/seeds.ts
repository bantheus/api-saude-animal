import { db } from "../src/server/lib/prisma";

async function main() {
  try {
    const especieCanina = await db.especie.create({
      data: {
        nome: "🐶 Cachorro",
        slug: "cachorro"
      },
    });

    const especieFelina = await db.especie.create({
      data: {
        nome: "🐱 Gato",
        slug: "gato"
      },
    });

    await db.animal.createMany({
      data: [
        {
          nome: "Docinho",
          slug: "docinho",
          sexo: "FEMEA",
          peso: 6.5,
          foto: "https://utfs.io/f/4e34807c-3eb1-4d8d-abae-5baed2255399-3q867a.jpg",
          especieId: especieFelina.id
        },
        {
          nome: "Pepeto",
          slug: "pepeto",
          sexo: "MACHO",
          peso: 8.7,
          foto: "https://utfs.io/f/b45b539b-ddbd-4b48-9614-a34127b1b379-a0dz39.jpg",
          especieId: especieFelina.id
        },
        {
          nome: "Pipa",
          slug: "pipa",
          sexo: "FEMEA",
          peso: 30.2,
          foto: "https://utfs.io/f/5c8174e8-b39e-496e-bd92-37dfd400cb98-9hpch5.jpg",
          especieId: especieCanina.id
        },
        {
          nome: "Balão",
          slug: "balao",
          sexo: "MACHO",
          peso: 40.5,
          foto: "https://utfs.io/f/fa49f7ba-bc5d-492d-9e54-c27843f6cb13-b8ihvn.jpg",
          especieId: especieCanina.id
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
