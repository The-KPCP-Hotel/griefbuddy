/*
  Warnings:

  - Added the required column `msg` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "msg" TEXT NOT NULL;
