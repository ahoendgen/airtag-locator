'use client';

import { PropsWithClassName } from '@framework/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { PropsWithChildren } from 'react';

import * as styles from './DeviceSelector.module.scss';

interface Props extends PropsWithClassName {
  devices?: Device[];
  currentDevice?: Device;
}

interface Device {
  name: string;
  emoji?: string;
  id: number;
  lastSeenAt?: Date;
}

const DeviceSelector: React.FC<PropsWithChildren<Props>> = ({
  currentDevice,
  className,
  devices,
}: PropsWithChildren<Props>): React.ReactElement => {
  const router = useRouter();

  return (
    <div className={[className].join(' ')} data-testid={'device-selector-root'}>
      <div className="form-floating d-block d-lg-none">
        <select
          className="form-select"
          id="floatingSelect"
          aria-label="Floating label select example"
          onChange={(e) => {
            router.push(`/?deviceid=${e.target.value}`);
          }}
          defaultValue={currentDevice?.id}
        >
          <option value={'all'}>All</option>
          {devices?.map((device: any) => (
            <option value={device.id} key={device.id}>
              {device.emoji} {device.name}
            </option>
          ))}
        </select>
        <label htmlFor="floatingSelect">Select a device</label>
      </div>

      <ul className={'list-group d-none d-lg-block'}>
        {devices?.map((device: Device) => (
          <li className={'list-group-item'} key={device.id}>
            <Link
              href={`/?deviceid=${device.id}`}
              style={{ textDecoration: 'none' }}
            >
              {device.emoji} {device.name} –{' '}
              <small className={'text-muted'}>
                {device.lastSeenAt?.toLocaleString()}
              </small>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { DeviceSelector };
