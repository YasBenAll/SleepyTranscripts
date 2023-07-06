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
  console.log(episodeData)
  return (
    <div>
              {episodeData.map((item: any, i: any) => (
                <li key={i}>
                  {item.dialog}
                </li>
              ))}
    </div>
  );
}
