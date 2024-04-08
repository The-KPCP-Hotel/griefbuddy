/*
  Warnings:

  - Added the required column `expired` to the `Buddy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Buddy" ADD COLUMN     "expired" BOOLEAN NOT NULL;
