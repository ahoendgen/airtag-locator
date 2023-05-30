import './globals.scss';
import 'leaflet/dist/leaflet.css';

export const metadata = {
  title: 'Airtag Locator',
  description: 'Simple airtag locator',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
