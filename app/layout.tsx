import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Locazar SDUI Server',
  description: 'Server-Driven UI engine — provides pre-defined bottom sheet templates for Locazar ecommerce.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
