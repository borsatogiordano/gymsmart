/*
  Warnings:

  - You are about to drop the column `validated_at` on the `check-ins` table. All the data in the column will be lost.
  - Added the required column `gymId` to the `check-ins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `check-ins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."check-ins" DROP COLUMN "validated_at",
ADD COLUMN     "gymId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "validatedAt" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "public"."check-ins" ADD CONSTRAINT "check-ins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."check-ins" ADD CONSTRAINT "check-ins_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "public"."gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
