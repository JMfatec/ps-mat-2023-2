/*
  Warnings:

  - The `year_manufacture` column on the `Car` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "year_manufacture",
ADD COLUMN     "year_manufacture" TIMESTAMP(3);
