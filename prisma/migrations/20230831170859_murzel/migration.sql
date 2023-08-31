/*
  Warnings:

  - The `receivingTime` column on the `Delivery` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `sendingTime` column on the `Delivery` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Delivery" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "receivingTime",
ADD COLUMN     "receivingTime" TIMESTAMP(3),
DROP COLUMN "sendingTime",
ADD COLUMN     "sendingTime" TIMESTAMP(3);
