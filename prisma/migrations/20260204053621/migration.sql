/*
  Warnings:

  - The primary key for the `Follow` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Follow` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Video` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Video` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `parentId` column on the `Video` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `VideoLike` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `VideoLike` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `VideoTip` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `VideoTip` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `followerId` on the `Follow` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `followingId` on the `Follow` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `authorId` on the `Video` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `VideoLike` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `videoId` on the `VideoLike` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `videoId` on the `VideoTip` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `tipperId` on the `VideoTip` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `receiverId` on the `VideoTip` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_followerId_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_followingId_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_parentId_fkey";

-- DropForeignKey
ALTER TABLE "VideoLike" DROP CONSTRAINT "VideoLike_userId_fkey";

-- DropForeignKey
ALTER TABLE "VideoLike" DROP CONSTRAINT "VideoLike_videoId_fkey";

-- DropForeignKey
ALTER TABLE "VideoTip" DROP CONSTRAINT "VideoTip_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "VideoTip" DROP CONSTRAINT "VideoTip_tipperId_fkey";

-- DropForeignKey
ALTER TABLE "VideoTip" DROP CONSTRAINT "VideoTip_videoId_fkey";

-- AlterTable
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "followerId",
ADD COLUMN     "followerId" INTEGER NOT NULL,
DROP COLUMN "followingId",
ADD COLUMN     "followingId" INTEGER NOT NULL,
ADD CONSTRAINT "Follow_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Video" DROP CONSTRAINT "Video_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "authorId",
ADD COLUMN     "authorId" INTEGER NOT NULL,
DROP COLUMN "parentId",
ADD COLUMN     "parentId" INTEGER,
ADD CONSTRAINT "Video_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "VideoLike" DROP CONSTRAINT "VideoLike_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
DROP COLUMN "videoId",
ADD COLUMN     "videoId" INTEGER NOT NULL,
ADD CONSTRAINT "VideoLike_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "VideoTip" DROP CONSTRAINT "VideoTip_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "videoId",
ADD COLUMN     "videoId" INTEGER NOT NULL,
DROP COLUMN "tipperId",
ADD COLUMN     "tipperId" INTEGER NOT NULL,
DROP COLUMN "receiverId",
ADD COLUMN     "receiverId" INTEGER NOT NULL,
ADD CONSTRAINT "VideoTip_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "Follow_followingId_idx" ON "Follow"("followingId");

-- CreateIndex
CREATE UNIQUE INDEX "Follow_followerId_followingId_key" ON "Follow"("followerId", "followingId");

-- CreateIndex
CREATE INDEX "Video_authorId_idx" ON "Video"("authorId");

-- CreateIndex
CREATE INDEX "Video_parentId_idx" ON "Video"("parentId");

-- CreateIndex
CREATE INDEX "VideoLike_videoId_idx" ON "VideoLike"("videoId");

-- CreateIndex
CREATE UNIQUE INDEX "VideoLike_userId_videoId_key" ON "VideoLike"("userId", "videoId");

-- CreateIndex
CREATE INDEX "VideoTip_videoId_idx" ON "VideoTip"("videoId");

-- CreateIndex
CREATE INDEX "VideoTip_receiverId_idx" ON "VideoTip"("receiverId");

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Video"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoLike" ADD CONSTRAINT "VideoLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoLike" ADD CONSTRAINT "VideoLike_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoTip" ADD CONSTRAINT "VideoTip_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoTip" ADD CONSTRAINT "VideoTip_tipperId_fkey" FOREIGN KEY ("tipperId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoTip" ADD CONSTRAINT "VideoTip_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
