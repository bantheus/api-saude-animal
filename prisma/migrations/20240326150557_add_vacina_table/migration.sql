-- CreateTable
CREATE TABLE "Vacina" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "animalId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vacina_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Vacina_nome_data_animalId_idx" ON "Vacina"("nome", "data", "animalId");

-- AddForeignKey
ALTER TABLE "Vacina" ADD CONSTRAINT "Vacina_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
