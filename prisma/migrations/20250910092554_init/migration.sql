-- CreateTable
CREATE TABLE "public"."Base" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Base_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Table" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "baseId" TEXT NOT NULL,

    CONSTRAINT "Table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Row" (
    "id" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,

    CONSTRAINT "Row_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Column" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,

    CONSTRAINT "Column_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cell" (
    "id" TEXT NOT NULL,
    "value" TEXT,
    "rowId" TEXT NOT NULL,
    "colId" TEXT NOT NULL,

    CONSTRAINT "Cell_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Base" ADD CONSTRAINT "Base_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Table" ADD CONSTRAINT "Table_baseId_fkey" FOREIGN KEY ("baseId") REFERENCES "public"."Base"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Row" ADD CONSTRAINT "Row_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "public"."Table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Column" ADD CONSTRAINT "Column_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "public"."Table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cell" ADD CONSTRAINT "Cell_rowId_fkey" FOREIGN KEY ("rowId") REFERENCES "public"."Row"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cell" ADD CONSTRAINT "Cell_colId_fkey" FOREIGN KEY ("colId") REFERENCES "public"."Column"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
