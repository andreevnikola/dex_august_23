/*
  Warnings:

  - You are about to drop the column `recieverId` on the `Delivery` table. All the data in the column will be lost.
  - You are about to drop the column `recieverPhone` on the `Delivery` table. All the data in the column will be lost.
  - Added the required column `receiverId` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverPhone` to the `Delivery` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Delivery" DROP CONSTRAINT "Delivery_recieverId_fkey";

-- AlterTable
ALTER TABLE "Delivery" DROP COLUMN "recieverId",
DROP COLUMN "recieverPhone",
ADD COLUMN     "calnceled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "receiverId" TEXT NOT NULL,
ADD COLUMN     "receiverPhone" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
