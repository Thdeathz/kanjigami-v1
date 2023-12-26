/*
  Warnings:

  - You are about to drop the `ResetPassword` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `startTime` to the `Round` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ResetPassword" DROP CONSTRAINT "ResetPassword_userId_fkey";

-- AlterTable
ALTER TABLE "Round" ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "ResetPassword";
