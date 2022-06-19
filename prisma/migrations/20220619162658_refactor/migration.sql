/*
  Warnings:

  - You are about to drop the `catgories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `paymentType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subcategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "subcategory" DROP CONSTRAINT "subcategory_categoryId_fkey";

-- DropTable
DROP TABLE "catgories";

-- DropTable
DROP TABLE "paymentType";

-- DropTable
DROP TABLE "subcategory";

-- DropTable
DROP TABLE "type";

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "typeId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expenses" (
    "id" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "date" TIMESTAMP(6) NOT NULL,
    "idsubcategory" INTEGER NOT NULL,
    "idpaymentType" INTEGER NOT NULL,
    "idgroup" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "amount" DECIMAL NOT NULL,

    CONSTRAINT "PK_94c3ceb17e3140abc9282c20610" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incomes" (
    "id" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "idgroup" VARCHAR NOT NULL,
    "idsubcategory" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "PK_d737b3d0314c1f0da5461a55e5e" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "migrations" (
    "id" SERIAL NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paymentTypes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_0171f8b6d91e784ea6a4f9ca2cc" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subcategories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "idcategory" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_793ef34ad0a3f86f09d4837007c" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "typeorm_metadata" (
    "type" VARCHAR NOT NULL,
    "database" VARCHAR,
    "schema" VARCHAR,
    "table" VARCHAR,
    "name" VARCHAR,
    "value" TEXT
);

-- CreateTable
CREATE TABLE "users" (
    "id" VARCHAR NOT NULL,
    "idgroup" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "avatar" VARCHAR NOT NULL,

    CONSTRAINT "PK_3577a50ccaa5d9b7d93967f71a7" PRIMARY KEY ("id","idgroup")
);

-- CreateTable
CREATE TABLE "types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "paymentTypes_name_key" ON "paymentTypes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "types_name_key" ON "types"("name");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "FK_cfab5328d823fb691df3141932f" FOREIGN KEY ("idgroup") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "FK_52e3b87e43c1211fc98dd5c8b81" FOREIGN KEY ("idpaymentType") REFERENCES "paymentTypes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "FK_9d4d3dfa8a2af311461180810b6" FOREIGN KEY ("idsubcategory") REFERENCES "subcategories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "incomes" ADD CONSTRAINT "FK_c860f0694a53309938930fbd845" FOREIGN KEY ("idgroup") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "incomes" ADD CONSTRAINT "FK_138b02a72514a488cc2619c9a4c" FOREIGN KEY ("idsubcategory") REFERENCES "subcategories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subcategories" ADD CONSTRAINT "FK_33dae99d35af81934dd31982b98" FOREIGN KEY ("idcategory") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "FK_01f95813e804ad7fc054822fbef" FOREIGN KEY ("idgroup") REFERENCES "groups"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
