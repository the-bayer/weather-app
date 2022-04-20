/*
  Warnings:

  - Made the column `userId` on table `Area` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Area" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "zipcode" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Area_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Area" ("createdAt", "id", "location", "updatedAt", "userId", "zipcode") SELECT "createdAt", "id", "location", "updatedAt", "userId", "zipcode" FROM "Area";
DROP TABLE "Area";
ALTER TABLE "new_Area" RENAME TO "Area";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
