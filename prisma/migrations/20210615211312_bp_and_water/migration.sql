/*
  Warnings:

  - You are about to drop the `BPEntry` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "BPEntry";

-- CreateTable
CREATE TABLE "bp_entry" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diastolic" INTEGER NOT NULL,
    "systolic" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "water_entry" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ml" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);
