/*
  Warnings:

  - Made the column `passwd` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `message` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "passwd" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "id", "passwd") SELECT "email", "id", "passwd" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "message" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("createdAt", "id", "message", "updatedAt", "userId") SELECT "createdAt", "id", "message", "updatedAt", "userId" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE TABLE "new_Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "birthDay" DATETIME,
    "phone" TEXT,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Profile" ("birthDay", "id", "name", "phone", "userId") SELECT "birthDay", "id", "name", "phone", "userId" FROM "Profile";
DROP TABLE "Profile";
ALTER TABLE "new_Profile" RENAME TO "Profile";
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
