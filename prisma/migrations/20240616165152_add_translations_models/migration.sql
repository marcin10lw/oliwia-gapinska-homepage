/*
  Warnings:

  - You are about to drop the column `name` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `projectCategoryId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the `ProjectCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Language" AS ENUM ('en', 'pl');

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_projectCategoryId_fkey";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "name",
DROP COLUMN "projectCategoryId",
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;

-- DropTable
DROP TABLE "ProjectCategory";

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectTranslation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "language" "Language" NOT NULL,
    "projectId" INTEGER,

    CONSTRAINT "ProjectTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryTranslation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "language" "Language" NOT NULL,
    "categoryId" INTEGER,

    CONSTRAINT "CategoryTranslation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTranslation" ADD CONSTRAINT "ProjectTranslation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryTranslation" ADD CONSTRAINT "CategoryTranslation_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
