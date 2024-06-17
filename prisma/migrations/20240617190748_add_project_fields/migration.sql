/*
  Warnings:

  - You are about to drop the column `name` on the `ProjectTranslation` table. All the data in the column will be lost.
  - Added the required column `title` to the `ProjectTranslation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `ProjectTranslation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjectTranslation" DROP COLUMN "name",
ADD COLUMN     "dimensions" TEXT,
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "medium" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "year" TEXT NOT NULL;
