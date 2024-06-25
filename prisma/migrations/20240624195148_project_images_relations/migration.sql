/*
  Warnings:

  - A unique constraint covering the columns `[previewImageId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "projectId" INTEGER;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "previewImageId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Project_previewImageId_key" ON "Project"("previewImageId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_previewImageId_fkey" FOREIGN KEY ("previewImageId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
