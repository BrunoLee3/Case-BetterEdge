/*
  Warnings:

  - Added the required column `quantidade` to the `Alocacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `alocacao` ADD COLUMN `quantidade` INTEGER NOT NULL;
