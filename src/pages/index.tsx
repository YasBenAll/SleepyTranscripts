import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';

export default function Home() {
  const [data, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/api/episode_name')
      .then(res => res.json())
      .then(data => {
        setMessage(data);
        setLoading(false);
      })
  }, [])

  return (
    <div className="min-h-screen flex flex-col justify-between">
            <Head>
        <title>Sleepy Cabin Transcripts</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <div>
        <div className="flex justify-center">
          <div className="bg-sleepycabin bg-opacity-10 p-30 px-6 py-6 rounded-md mx-auto max-w-3/4 w-2/3 mt-8">
            <div className="flex justify-center">
              <Image 
                src="/SC-logo-transparent.png"
                alt="Sleepy Cabin"
                width={591}
                height={241}
                alt="Sleepy Cabin"
              />
            </div>
            <div className="text-5xl flex flex-col items-center py-6">All Episode Transcripts</div>
            {!loading ? (
              <ul className="list-inside mt-4 ">
                {data.map((item, i) => (
                  <li key={i} className="my-2">
                    <Link href={`/episode/${item.slug}`}>
                      <div className="text-blue-500 hover:underline">{item.name}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              "Loading..."
            )}
          </div>
        </div>
      </div>

      {/* The footer will appear below the main content */}
      {/* <Footer /> */}
    </div>
  );
}