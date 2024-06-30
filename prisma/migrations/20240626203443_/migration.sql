/*
  Warnings:

  - A unique constraint covering the columns `[videoId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "videoId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Project_videoId_key" ON "Project"("videoId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
