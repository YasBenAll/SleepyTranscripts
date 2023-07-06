import Link from 'next/link'
import { useEffect, useState } from 'react'


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
    <>
      <div>
        <div className="text-5xl">Episodes:</div>
        <div>
          {!loading ? (
            <ul>
              {data.map((item: any, i: any) => (
                <li key={i}>
                  <Link href={`/episode/${item.slug}`}>{item.name}</Link>
                </li>
              ))}
            </ul>
          ) : (
            "Loading.."
          )}
        </div>
      </div>
    </>
  );
  
}
