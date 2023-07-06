import { useEffect, useState } from 'react'


export default function Home() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      fetch('http://localhost:8080/api/python')
          .then(res => res.json())
          .then(data => {
              console.log(data.message)
              setMessage(data.message);
              setLoading(false);
          })
  }, [])

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="items-center">
        <p> {!loading ? message : "Loading.."}</p>
      </div>
      <form className="flex flex-col justify-center items-center">
        <label className="text-2xl">Podcast link</label>
        <input
          className="border-2 border-gray-500 rounded-md p-2 m-2"
          type="text"
          placeholder="Enter link"
        />
        <button className="bg-blue-500 text-white p-2 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
}
