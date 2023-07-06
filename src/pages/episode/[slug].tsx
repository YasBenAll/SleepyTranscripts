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
  return (
    <div>
      <Link href="/">Back</Link>
      <div className="text-4xl">{episodeData.pop(-1)}</div>
        <div className="text-4xl">
          Episodes:
        </div>
        {episodeData.map((item: any, i: any) => (
          <div key={i}>
            {`${item.speaker} [${item.start_time}]: ${item.dialog}`}
          </div>
        ))}
    </div>
  );
}
