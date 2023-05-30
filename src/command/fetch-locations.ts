import getDatabaseClient from '@framework/database/getDatabaseClient';
import dotenv from 'dotenv';
import * as fs from 'fs';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

const prisma = getDatabaseClient();

async function run() {
  const location = process.env.FIND_MY_CACHE_LOCATION;

  if (!location) {
    throw new Error('Location not defined');
  }

  if (!fs.existsSync(location)) {
    throw new Error('Location path not found');
  }

  const rawData = fs.readFileSync(`${location}/Items.data`, 'utf-8');
  const data: any = JSON.parse(rawData);

  await prisma.$connect();

  data.map(async (item: any) => {
    const lastSeenAt = new Date(item['location']['timeStamp']);

    const location: any = {
      latitude: item.location.latitude,
      longitude: item.location.longitude,
      altitude: item.location.altitude,
      lastSeenAt,
    };

    const deviceData = {
      serialNumber: item.serialNumber,
      name: item.name,
      emoji: item.role.emoji,
      lastSeenAt,
    };

    const device = await prisma.device.upsert({
      where: {
        serialNumber: item.serialNumber,
      },
      update: deviceData,
      create: deviceData,
    });

    location.deviceId = device.id;

    try {
      await prisma.location.create({
        data: location,
      });
    } catch (e) {
      console.log(
        `Skipped "${item.name} - ${item.serialNumber}" location did not change`
      );
    }
  });
}

run();
