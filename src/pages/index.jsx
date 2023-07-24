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
 
  const handleToggleCheckbox = (name) => {
    setCheckedNames((prevCheckedNames) => {
      if (prevCheckedNames.includes(name)) {
        return prevCheckedNames.filter((checkedName) => checkedName !== name);
      } else {
        return [...prevCheckedNames, name];
      }
    });
  };

  useEffect(() => {
    console.log(window.location.hostname)
    const webdomain = "http://localhost:3000"
    // const webdomain = "https://sleepytranscripts.com"
    fetch(`${webdomain}/api/episode_name`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setMessage(data);
        setLoading(false);
      })
      .catch((error) => {
        // Handle the error here
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);
  

  const names = [
    'Stamper', 'JohnnyUtah', 'Psychicpebbles', 'Spazkid', 'Oney', 'Niall', 'Ricepirate'
  ];

  const filteredEpisodes = data.filter((item) =>
    checkedNames.every((name) => item.members.includes(name))
  );

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Head>
        <title>Sleepy Cabin Transcripts</title>
        <meta property="og:title" content="SleepyCast Transcripts" key="title" />
      </Head>
      <div className="flex justify-center">
        <div className="bg-sleepycabin bg-opacity-10 p-30 px-6 py-6 rounded-md mx-auto max-w-3/4 w-2/3 mt-8">
          <div className="flex justify-center">
            <Image src="/SC-logo-transparent.png" alt="Sleepy Cabin" width={591} height={241} />
          </div>
          <div className="text-center text-5xl flex flex-col items-center py-6">
            All SleepyCast Transcripts
          </div>
          <div className='text-center'>Ever found yourself seeking a particular quote from a particular SleepyCast episode? Worry not, for this website might help you on your quest, or not :D</div>
          <br/>
          <div>Sleepycabin Members</div>
          <div className="container mx-auto p-4">
            <div>
              {names.map((name, index) => (
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
          <div className="bg-violet-800 border rounded-lg p-4 shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 flex items-center justify-center">
            <div className="text-blue-200 hover:underline text-center">{item.name}</div>
            {/* Add additional content inside the box if needed */}
            {/* For example: */}
            {/* <div className="text-gray-500">{item.description}</div> */}
          </div>
        </Link>
      </li>
    ))}
  </ul>
</>
      ) : (
<div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
  <div class="animate-pulse flex space-x-4">
    <div class="rounded-full bg-slate-200 h-10 w-10"></div>
    <div class="flex-1 space-y-6 py-1">
      <div class="h-2 bg-slate-200 rounded"></div>
      <div class="space-y-3">
        <div class="grid grid-cols-3 gap-4">
          <div class="h-2 bg-slate-200 rounded col-span-2"></div>
          <div class="h-2 bg-slate-200 rounded col-span-1"></div>
        </div>
        <div class="h-2 bg-slate-200 rounded"></div>
      </div>
    </div>
  </div>
</div>
      )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
