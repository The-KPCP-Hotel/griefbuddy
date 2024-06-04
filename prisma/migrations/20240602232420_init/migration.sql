-- DropForeignKey
ALTER TABLE "UserBlockedQuote" DROP CONSTRAINT "UserBlockedQuote_quoteId_fkey";

-- AddForeignKey
ALTER TABLE "UserBlockedQuote" ADD CONSTRAINT "UserBlockedQuote_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
