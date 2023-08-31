/*
  Warnings:

  - You are about to drop the column `receiverAddress` on the `Delivery` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Delivery" DROP COLUMN "receiverAddress",
ADD COLUMN     "receiverAdress" TEXT;
