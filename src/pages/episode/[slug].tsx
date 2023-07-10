import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function EpisodePage() {
  const router = useRouter();
  const { slug } = router.query;
  const [episodeData, setEpisodeData] = useState(null);

  useEffect(() => {
    if (slug) {
      fetch(`http://localhost:8080/api/episode_data/${slug}`)
        .then((res) => res.json())
        .then((data) => setEpisodeData(data));
    }
  }, [slug]);

  if (!episodeData) {
    return <div>Loading...</div>;
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
      <div key={i}>
        {/* {item.speaker} */}
        <text> [</text>
        <Link href={createYouTubeTimestampLink(item.start_time)} target="_blank">
          {item.start_time}
        </Link>
        <text>] </text>
        {item.dialog}
      </div>
    );
  };

  

  return (
<div className="bg-sleepycabin p-4 rounded-md mx-auto max-w-lg">
  <Link href="/">
    <div className="text-blue-500 hover:underline">Back</div>
  </Link>
  <div className="mt-4">With {episodeData["members"]}</div>
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
</div>

  );
}
