/*
  Warnings:

  - Made the column `senderAdress` on table `Delivery` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Delivery" ALTER COLUMN "senderAdress" SET NOT NULL,
ALTER COLUMN "receiverAddress" DROP NOT NULL;
