import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import MessageBox from '../../components/MessageBox';
import localFont from '@next/font/local'

const amatic = localFont({
  src: '../../../public/fonts/AmaticSC-Regular.ttf',
  variable: '--font-amatic',
})

const iceland = localFont({
  src: '../../../public/fonts/Iceland-Regular.ttf',
  variable: '--font-amatic',
})

function formatMemberNames(members) {
  // Convert members string to an array of names
  const names = members
  // Format the names array
  const formattedNames = names.map((name, index) => {
    // Remove leading/trailing spaces
    const trimmedName = name.trim();

    // Add a comma for all names except the last one
    if (index !== names.length - 1) {
      return trimmedName + ',';
    }

    // Return the last name with "and" before it
    return 'and ' + trimmedName + '.';
  });

  // Join the formatted names array with spaces
  return formattedNames.join(' ');
}


export default function EpisodePage() {
  const router = useRouter();
  const { slug } = router.query;
  const [episodeData, setEpisodeData] = useState(null);

  useEffect(() => {
    if (slug) {
      const webdomain = "http://localhost:3000"
      // const webdomain = "https://sleepytranscripts.com"
      fetch(`${webdomain}/api/episode_data/${slug}`)
        .then((res) => res.json())
        .then((data) => setEpisodeData(data));
    }
  }, [slug]);

  if (!episodeData) {
    return     <div className="flex h-screen justify-center">
    <button type="button" className="" disabled>
        <div className="flex justify-center">
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        </div>
    </button>
  </div>
  }

  // Function to create YouTube timestamp link
  const createYouTubeTimestampLink = (time) => {
    const youtubeLink = episodeData["youtube_link"];
    console.log(youtubeLink);
    const timestamp = time.replace(/:/g, 'm') + 's';
    if (youtubeLink === null  || youtubeLink === undefined) {
      return `#`;
    }
    else{
      return `${youtubeLink}&t=${timestamp}`;
    }
  };

  // Function to render dialog line with clickable timestamp
  const renderDialogLine = (item, i) => {
    return (
      <MessageBox type="info">
      <div key={i}>
        {/* {item.speaker} */}
        <text> [</text>
        <Link className ="hover:underline" href={createYouTubeTimestampLink(item.start_time)} target="_blank">
          {item.start_time}
        </Link>
        <text>] </text>
        <text className='text-white'>
         -  {item.dialog}
        </text>

      </div>
      </MessageBox>
    );
  };

  

  return (
    <>
      <Head>
        <title>{episodeData["episode_name"]}</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <div className="bg-sleepycabin p-30 px-6 py-6 rounded-md mx-auto  max-w-3/4 w-2/3 mt-8">
        <Link href="/">
          <div className="text-blue-500 hover:underline">Back</div>
        </Link>
        <div style={iceland.style} className="text-sm text-orange-400 pb-2 mt-2">Featuring {formatMemberNames(episodeData["members"])}</div>
        <div style={amatic.style}>
          <Link
            className="text-4xl mt-4"
            href={episodeData["youtube_link"] || "#"}
            target="_blank"
          >
            {episodeData["episode_name"]}
          </Link>
        </div>
        <div className="mt-4">
          {episodeData["dialog"].map(renderDialogLine)}
        </div>
        <Link href="/">
          <div className="text-blue-500 hover:underline py-3">Back</div>
        </Link>
      </div>
    </>

  );
}
