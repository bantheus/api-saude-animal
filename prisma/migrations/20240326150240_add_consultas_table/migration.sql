-- CreateTable
CREATE TABLE "Consultas" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "hora" TIMESTAMP(3) NOT NULL,
    "titulo" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "animalId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Consultas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Consultas_data_titulo_animalId_idx" ON "Consultas"("data", "titulo", "animalId");

-- AddForeignKey
ALTER TABLE "Consultas" ADD CONSTRAINT "Consultas_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
