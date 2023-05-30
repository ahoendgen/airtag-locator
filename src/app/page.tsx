import DeviceSelector from '@components/Atom/DeviceSelector';
import Map from '@components/Molecule/Map';
import { Device } from '@domain/Device';
import getDatabaseClient from '@framework/database/getDatabaseClient';
import Link from 'next/link';

interface Props {
  searchParams: {
    deviceid?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const data = await getData();

  const selectedDevice = data.find(
    (device: any) => device.id.toString() === searchParams.deviceid
  );

  let locations:
    | undefined
    | {
        latitude: number;
        longitude: number;
        description: string | JSX.Element;
      }[] = undefined;

  if (selectedDevice) {
    locations = [
      {
        latitude: selectedDevice.Location[0].latitude ?? 0,
        longitude: selectedDevice.Location[0].longitude ?? 0,
        description: (
          <>
            {selectedDevice.emoji} {selectedDevice.name}
            <br />
            <small className={'text-muted'}>
              {selectedDevice.lastSeenAt?.toLocaleString()}
            </small>
          </>
        ),
      },
    ];
  } else {
    locations = data.map((device: Device) => ({
      latitude: device.Location[0].latitude ?? 0,
      longitude: device.Location[0].longitude ?? 0,
      description: (
        <>
          {device.emoji} {device.name}
          <br />
          <small className={'text-muted'}>
            {device.lastSeenAt?.toLocaleString()}
          </small>
        </>
      ),
    }));
  }

  return (
    <div className={'container-fluid'}>
      <div className={'row'}>
        <div className={'col-sm-12 col-lg-4 mb-2'}>
          <Link href={'/'}>
            <h2>Devices</h2>
          </Link>

          {/* @ts-ignore */}
          <DeviceSelector devices={data} currentDevice={selectedDevice} />
        </div>
        <div className={'col-sm-12 col-lg-8'} style={{ height: '100vh' }}>
          {/* @ts-ignore */}
          <Map locations={locations} style={{ height: '100vh' }} />
        </div>
      </div>
    </div>
  );
}

async function getData() {
  const db = getDatabaseClient();

  return db.device.findMany({
    include: {
      Location: {
        orderBy: {
          lastSeenAt: 'desc',
        },
        take: 1,
      },
    },
  });
}
