-- DropForeignKey
ALTER TABLE "OnlineHistory" DROP CONSTRAINT "OnlineHistory_roundId_fkey";

-- DropForeignKey
ALTER TABLE "Round" DROP CONSTRAINT "Round_eventId_fkey";

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnlineHistory" ADD CONSTRAINT "OnlineHistory_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE CASCADE ON UPDATE CASCADE;
