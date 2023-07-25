import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Open_Sans } from '@next/font/google'
import { Analytics } from '@vercel/analytics/react';
 
const openSans = Open_Sans({ subsets: ['latin-ext'] })


export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
    <Head>
      <link rel="shortcut icon" href="/images/favicon.png" />
      <title>Sleepy Cabin Transcripts</title>
    </Head>
    <div style={openSans.style}>
    <Component {...pageProps} />
    <Analytics />
    </div>
  </>
  );
}
