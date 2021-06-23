/*
  Warnings:

  - Added the required column `heartrate` to the `bp_entry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bp_entry" ADD COLUMN     "heartrate" INTEGER NOT NULL;
