import './globals.css';

export const metadata = {
  title: 'SET Game',
  description: 'Find SETs! A card game built with Next.js',
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
