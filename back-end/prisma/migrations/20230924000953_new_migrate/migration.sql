/*
  Warnings:

  - Added the required column `year_manufacture` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "year_manufacture",
ADD COLUMN     "year_manufacture" INTEGER NOT NULL;
