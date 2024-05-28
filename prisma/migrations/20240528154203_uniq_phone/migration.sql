/*
  Warnings:

  - A unique constraint covering the columns `[number_telephone]` on the table `Manager` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Manager_number_telephone_key" ON "Manager"("number_telephone");
