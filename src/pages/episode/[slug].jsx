import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import MessageBox from '../../components/MessageBox';

function formatMemberNames(members) {
  // Convert members string to an array of names
  console.log(members);
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
    return <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
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
  </div>;
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
        <Link className ="" href={createYouTubeTimestampLink(item.start_time)} target="_blank">
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
        <div className="mt-4">Featuring {formatMemberNames(episodeData["members"])}</div>
        <Link
          className="text-4xl mt-4"
          href={episodeData["youtube_link"] || "#"}
          target="_blank"
        >
          {episodeData["episode_name"]}
        </Link>
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
