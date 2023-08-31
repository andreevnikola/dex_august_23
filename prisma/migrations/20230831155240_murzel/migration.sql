/*
  Warnings:

  - You are about to drop the column `receiverId` on the `Delivery` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "DeliveryStages" AS ENUM ('requested', 'inProgress', 'done');

-- DropForeignKey
ALTER TABLE "Delivery" DROP CONSTRAINT "Delivery_receiverId_fkey";

-- AlterTable
ALTER TABLE "Delivery" DROP COLUMN "receiverId",
ADD COLUMN     "stage" "DeliveryStages" NOT NULL DEFAULT 'requested';

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_receiverPhone_fkey" FOREIGN KEY ("receiverPhone") REFERENCES "User"("phone") ON DELETE SET NULL ON UPDATE CASCADE;
