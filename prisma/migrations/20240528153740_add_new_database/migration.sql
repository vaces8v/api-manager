/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "photos" TEXT[],
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "isSold" BOOLEAN NOT NULL,
    "soldDate" TIMESTAMP(3),

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Manager" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "number_telephone" INTEGER NOT NULL,

    CONSTRAINT "Manager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ManagerCar" (
    "id" SERIAL NOT NULL,
    "managerId" INTEGER NOT NULL,
    "carId" INTEGER NOT NULL,

    CONSTRAINT "ManagerCar_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ManagerCar" ADD CONSTRAINT "ManagerCar_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManagerCar" ADD CONSTRAINT "ManagerCar_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
