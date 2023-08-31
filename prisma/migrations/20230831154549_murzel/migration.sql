/*
  Warnings:

  - You are about to drop the column `receiverAdress` on the `Delivery` table. All the data in the column will be lost.
  - You are about to drop the column `senderAdress` on the `Delivery` table. All the data in the column will be lost.
  - Added the required column `senderAddress` to the `Delivery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Delivery" DROP COLUMN "receiverAdress",
DROP COLUMN "senderAdress",
ADD COLUMN     "receiverAddress" TEXT,
ADD COLUMN     "senderAddress" TEXT NOT NULL;
