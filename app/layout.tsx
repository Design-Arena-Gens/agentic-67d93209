import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Zero Lag MACD Enhanced',
  description: 'Interactive Zero Lag MACD Enhanced indicator playground for web charts.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
