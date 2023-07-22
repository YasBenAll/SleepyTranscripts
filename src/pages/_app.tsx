import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
    <div className="bg-sleepycabinwoods">
    <Head>
      <link rel="shortcut icon" href="/images/favicon.png" />
      <title>Sleepy Cabin Transcripts</title>
    </Head>
    <Component {...pageProps} />
    </div>
  </>
  );
}
