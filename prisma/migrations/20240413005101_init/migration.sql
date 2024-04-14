/*
  Warnings:

  - A unique constraint covering the columns `[OgId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `OgId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "OgId" TEXT NOT NULL,
ADD COLUMN     "media_raw" JSONB,
ADD COLUMN     "url" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Event_OgId_key" ON "Event"("OgId");
