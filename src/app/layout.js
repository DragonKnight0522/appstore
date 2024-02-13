// ** Utils Imports

import { Public_Sans } from 'next/font/google'
import AppLayout from './AppLayout';
import { PreloadResources } from './preload-resources';

export const metadata = {
  title: 'UNIC App Store',
  description: 'University of Nicosia App Store',
  keywords: ['UNIC', 'App Store', 'Nicosia'],

  icons: {
    shortcut: '/images/favicon.png',
    other: {
      rel: 'apple-touch-icon',
      url: '/images/apple-touch-icon.png',
    },
  },
  other: {
    custom: ['meta1', 'meta2'],
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

const public_sans = Public_Sans({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={public_sans.className}>
      <head>
        <PreloadResources />
      </head>
      <body>
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
