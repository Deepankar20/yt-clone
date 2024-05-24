/*
  Warnings:

  - You are about to drop the column `likes` on the `Video` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Channel" ALTER COLUMN "profilePictureUrl" SET DEFAULT '',
ALTER COLUMN "coverPhotoUrl" SET DEFAULT '';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "avatarUrl" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "likes",
ALTER COLUMN "thumbnailUrl" SET DEFAULT '';

-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "videoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
