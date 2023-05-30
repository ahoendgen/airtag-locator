import { Prisma } from '@prisma/client';

export type Device = Prisma.DeviceGetPayload<{
  include: {
    Location: true;
  };
}>;
