import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import NameBox from '../components/NameList';

export default function Home() {
  const [data, setMessage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkedNames, setCheckedNames] = useState([]);

  const handleToggleCheckbox = (name: any) => {
    setCheckedNames((prevCheckedNames) => {
      if (prevCheckedNames.includes(name)) {
        return prevCheckedNames.filter((checkedName) => checkedName !== name);
      } else {
        return [...prevCheckedNames, name];
      }
    });
  };

  useEffect(() => {
    fetch('http://localhost:8080/api/episode_name')
      .then((res) => res.json())
      .then((data) => {
        setMessage(data);
        setLoading(false);
      });
  }, []);

  const names = [
    'Stamper', 'JohnnyUtah', 'Psychicpebbles', 'Spazkid', 'Oney', 'Niall', 'Ricepirate'
  ];

  const filteredEpisodes = data.filter((item: any) =>
    checkedNames.every((name) => item.members.includes(name))
  );

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Head>
        <title>Sleepy Cabin Transcripts</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <div className="flex justify-center">
        <div className="bg-sleepycabin bg-opacity-10 p-30 px-6 py-6 rounded-md mx-auto max-w-3/4 w-2/3 mt-8">
          <div className="flex justify-center">
            <Image src="/SC-logo-transparent.png" alt="Sleepy Cabin" width={591} height={241} />
          </div>
          <div className="text-center text-5xl flex flex-col items-center py-6">
            All SleepyCast Transcripts
          </div>
          <div className='text-center'>Ever felt the need to find a particular quote from a particular episode from the SleepyCast? Fear not, for this website will solve your troubles.</div>
          <br/>
          <div>Sleepycabin Members</div>
          <div className="container mx-auto p-4">
            <div>
              {names.map((name: any, index: any) => (
                <NameBox
                  key={index}
                  name={name}
                  isChecked={checkedNames.includes(name)}
                  handleToggleCheckbox={() => handleToggleCheckbox(name)}
                />
              ))}
            </div>
          </div>
          <div>Episodes:</div>
          {!loading ? (
        <>
          <ul className="list-inside mt-4 ">
            {filteredEpisodes.map((item, i) => (
              <li key={i} data-members={item.members} className="my-2">
                <Link href={`/episode/${item.slug}`}>
                  <div className="text-blue-500 hover:underline">{item.name}</div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        "Loading Transcripts..."
      )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
