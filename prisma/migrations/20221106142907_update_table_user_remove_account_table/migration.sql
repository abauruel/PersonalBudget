/*
  Warnings:

  - You are about to drop the column `accountId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[sub]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sub` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_accountId_fkey";

-- DropIndex
DROP INDEX "users_email_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "accountId",
ADD COLUMN     "sub" TEXT NOT NULL;

-- DropTable
DROP TABLE "Account";

-- CreateIndex
CREATE UNIQUE INDEX "users_sub_key" ON "users"("sub");
