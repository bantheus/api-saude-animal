-- CreateIndex
CREATE INDEX "Animal_nome_especieId_sexo_idx" ON "Animal"("nome", "especieId", "sexo");

-- CreateIndex
CREATE INDEX "Especie_nome_idx" ON "Especie"("nome");
