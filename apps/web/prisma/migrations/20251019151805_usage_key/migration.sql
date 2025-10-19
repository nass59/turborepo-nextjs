/*
  Warnings:

  - The primary key for the `Usage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Usage` table. All the data in the column will be lost.
  - Added the required column `key` to the `Usage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Usage" DROP CONSTRAINT "Usage_pkey",
DROP COLUMN "id",
ADD COLUMN     "key" TEXT NOT NULL,
ADD CONSTRAINT "Usage_pkey" PRIMARY KEY ("key");
