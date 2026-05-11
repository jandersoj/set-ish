import './globals.css';

export const metadata = {
  title: 'SET Game',
  description: 'Find SETs! A card game built with Next.js',
  viewport: 'width=device-width, initial-scale=1.0',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
