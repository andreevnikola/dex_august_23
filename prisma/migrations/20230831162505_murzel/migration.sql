/*
  Warnings:

  - You are about to drop the column `calnceled` on the `Delivery` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Delivery" DROP COLUMN "calnceled",
ADD COLUMN     "canceled" BOOLEAN NOT NULL DEFAULT false;
