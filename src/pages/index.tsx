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
        <div className="bg-sleepycabin bg-opacity-10 p-30 px-6 py-6 rounded-md mx-auto  max-w-3/4 w-2/3 mt-8 ">
          <div className="text-5xl flex flex-col items-center py-6">Episodes:</div>
          {!loading ? (
            <ul className="list-inside mt-4 ">
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
