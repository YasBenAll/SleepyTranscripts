import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import NameBox from '../components/NameList';
import localFont from '@next/font/local';
import { Open_Sans } from '@next/font/google';

const amatic = localFont({
  src: '../../public/fonts/AmaticSC-Regular.ttf',
  variable: '--font-amatic',
})

const openSans = Open_Sans({ subsets: ['latin-ext'] })

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
    // const webdomain = "http://localhost:3000"
    // const webdomain = "https://sleepytranscripts-git-dev-yasbenall.vercel.app/"
    const webdomain = "https://sleepytranscripts.com"

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

  const name_images = {"Stamper":"images/av-stamper.png", "JohnnyUtah":"images/av-jeff.png", "Psychicpebbles":"images/av-zach.png", "Spazkid":"images/av-cory.png", "Oney":"images/av-chris.png", "Niall":"images/av-niall.png", "Ricepirate":"images/av-mick.png"}

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
          <div className="--font-amatic text-center text-5xl flex flex-col items-center py-6">
            <div style={amatic.style}>
              All SleepyCast Transcripts
            </div>

          </div>
          <div style={openSans.style} className='text-center'>Ever found yourself seeking a particular quote from a particular SleepyCast episode? Worry not, for this website might aid you in your quest... or not :D</div>
          <br/>
          <div style={amatic.style} className="text-3xl">Sleepycabin Members</div>
          <div className="container mx-auto p-4">
            <div className=''>
              {names.map((name, index) => (
                <NameBox
                  key={index}
                  name={name}
                  isChecked={checkedNames.includes(name)}
                  handleToggleCheckbox={() => handleToggleCheckbox(name)}
                  image = {name_images[name]}
                />
              ))}
            </div>
          </div>
          <div style={amatic.style} className="text-3xl">Episodes:</div>
          {!loading ? (
  <>
  <ul className="list-inside mt-4 ">
    {filteredEpisodes.map((item, i) => (
      <li key={i} data-members={item.members} className="my-2">
        <Link href={`/episode/${item.slug}`}>
          <div className="transition-transform duration-200 flex items-center">
            <div className="text-blue-200 hover:underline ">{item.name}</div>
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
    <div className="flex justify-center">
      <button type="button" className="" disabled>
          <div className="flex justify-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          </div>
      </button>
    </div>
      )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
