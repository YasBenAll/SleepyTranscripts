import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="text-center p-4 mt-8">
      Made with <span className="text-red-500">&hearts;</span> for The <Link className="text-blue-500" href="https://www.reddit.com/r/Sleepycabin/" target="_blank"><u>SleepyCabin Subreddit.</u></Link>
    </footer>
  );
};

export default Footer;
