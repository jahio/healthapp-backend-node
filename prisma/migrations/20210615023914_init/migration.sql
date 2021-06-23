-- CreateTable
CREATE TABLE "BPEntry" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diastolic" INTEGER NOT NULL,
    "systolic" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);
