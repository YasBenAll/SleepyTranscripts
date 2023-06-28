// Create a page that contains a form in which a person can give a link to a video. It also has a submit button. Style the page as you wish using Tailwind. Center the text and the button within the form
export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen">
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