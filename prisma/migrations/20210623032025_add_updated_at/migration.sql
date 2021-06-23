/*
  Warnings:

  - You are about to drop the column `created_at` on the `bp_entry` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `water_entry` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `bp_entry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `water_entry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bp_entry" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ NOT NULL;

-- AlterTable
ALTER TABLE "water_entry" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ NOT NULL;
