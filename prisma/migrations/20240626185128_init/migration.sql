/*
  Warnings:

  - You are about to drop the column `title` on the `Resource` table. All the data in the column will be lost.
  - Added the required column `description` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "title",
ADD COLUMN     "description" TEXT NOT NULL;
