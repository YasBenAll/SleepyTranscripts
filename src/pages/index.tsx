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
      <div className="flex justify-center">
        <div className="bg-sleepycabin p-4 rounded-md">
          <div className="text-5xl">Episodes:</div>
          {!loading ? (
            <ul className="list-inside mt-4">
              {data.map((item: any, i: any) => (
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
    </>
  );
}
