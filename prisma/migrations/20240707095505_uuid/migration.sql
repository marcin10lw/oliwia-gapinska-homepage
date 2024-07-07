/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uid]` on the table `CategoryTranslation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uid]` on the table `Language` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uid]` on the table `Media` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uid]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uid]` on the table `ProjectTranslation` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "uid" TEXT;

-- AlterTable
ALTER TABLE "CategoryTranslation" ADD COLUMN     "uid" TEXT;

-- AlterTable
ALTER TABLE "Language" ADD COLUMN     "uid" TEXT;

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "uid" TEXT;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "uid" TEXT;

-- AlterTable
ALTER TABLE "ProjectTranslation" ADD COLUMN     "uid" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Category_uid_key" ON "Category"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryTranslation_uid_key" ON "CategoryTranslation"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Language_uid_key" ON "Language"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Media_uid_key" ON "Media"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Project_uid_key" ON "Project"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectTranslation_uid_key" ON "ProjectTranslation"("uid");
