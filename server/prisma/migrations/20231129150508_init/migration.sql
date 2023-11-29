/*
  Warnings:

  - You are about to drop the column `lobbyTime` on the `Event` table. All the data in the column will be lost.
  - The `status` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `title` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `Round` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('UPCOMING', 'ONGOING', 'FINISHED');

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "lobbyTime",
ADD COLUMN     "title" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "EventStatus" NOT NULL DEFAULT 'UPCOMING';

-- AlterTable
ALTER TABLE "Round" ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "status" "EventStatus" NOT NULL DEFAULT 'UPCOMING';
