'use client';

import { PropsWithClassName } from '@framework/ui';
import { icon, LatLng } from 'leaflet';
import React, { PropsWithChildren } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

interface Props extends PropsWithClassName {
  locations?: {
    latitude: number;
    longitude: number;
    description: string;
  }[];
}

const Map: React.FC<PropsWithChildren<Props>> = ({
  className,
  locations,
  style,
}: PropsWithChildren<Props>): React.ReactElement => {
  const position = [];
  if (locations) {
    position.push(locations[0].latitude);
    position.push(locations[0].longitude);
  } else {
    position.push(50.935173);
    position.push(6.953101);
  }
  const ICON = icon({
    iconUrl: '/marker.svg',
    iconSize: [40, 40],
  });

  return (
    <MapContainer
      center={new LatLng(position[0], position[1])}
      zoom={13}
      style={style}
      className={[className].join(' ')}
      data-testid={'map-root'}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations?.map((location, index) => (
        <Marker
          key={index}
          position={[location.latitude, location.longitude]}
          icon={ICON}
        >
          <Popup>{location.description}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export { Map };
