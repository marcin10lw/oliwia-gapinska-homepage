/*
  Warnings:

  - Made the column `uid` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uid` on table `CategoryTranslation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uid` on table `Language` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uid` on table `Media` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uid` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `uid` on table `ProjectTranslation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "uid" SET NOT NULL;

-- AlterTable
ALTER TABLE "CategoryTranslation" ALTER COLUMN "uid" SET NOT NULL;

-- AlterTable
ALTER TABLE "Language" ALTER COLUMN "uid" SET NOT NULL;

-- AlterTable
ALTER TABLE "Media" ALTER COLUMN "uid" SET NOT NULL;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "uid" SET NOT NULL;

-- AlterTable
ALTER TABLE "ProjectTranslation" ALTER COLUMN "uid" SET NOT NULL;
