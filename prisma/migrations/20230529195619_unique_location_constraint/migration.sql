/*
  Warnings:

  - A unique constraint covering the columns `[deviceId,longitude,latitude,altitude,lastSeenAt]` on the table `Location` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Location_deviceId_longitude_latitude_altitude_lastSeenAt_key" ON "Location"("deviceId", "longitude", "latitude", "altitude", "lastSeenAt");
