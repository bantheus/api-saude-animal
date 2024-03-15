/*
  Warnings:

  - Added the required column `slug` to the `Especie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Especie" ADD COLUMN     "slug" TEXT NOT NULL;
