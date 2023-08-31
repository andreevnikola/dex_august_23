-- CreateEnum
CREATE TYPE "DeliveryTypes" AS ENUM ('delivery', 'timedDelivery', 'shopForMe');

-- CreateTable
CREATE TABLE "Delivery" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "recieverPhone" TEXT NOT NULL,
    "type" "DeliveryTypes" NOT NULL,
    "senderAdress" TEXT NOT NULL,
    "receiverAddress" TEXT NOT NULL,
    "shoppingList" TEXT,
    "store" TEXT,
    "receivingTime" TEXT,
    "sendingTime" TEXT,
    "packageTitle" TEXT,
    "packageDescription" TEXT,

    CONSTRAINT "Delivery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_recieverPhone_fkey" FOREIGN KEY ("recieverPhone") REFERENCES "User"("phone") ON DELETE RESTRICT ON UPDATE CASCADE;
