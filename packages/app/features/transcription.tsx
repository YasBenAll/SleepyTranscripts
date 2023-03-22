import { Text, useSx, View, H1, P, Row, A } from 'dripsy'
import { TextLink } from 'solito/link'
import { MotiLink } from 'solito/moti'
import styles from "./transcription.module.css";
import Head from "next/head";

const transcriptData = [
  {
    speaker: "David Sacks",
    timestampRange: "0:00:00.497 --> 0:00:02.185",
    timestamp: 0,
    text: "I got a little friend here.",
  },
  {
    speaker: "David Friedberg",
    timestampRange: "0:00:03.771 --> 0:00:04.277",
    timestamp: 3,
    text: "Aww..",
  },
  {
    speaker: "David Sacks",
    timestampRange: "0:00:04.142 --> 0:00:09.795",
    timestamp: 4,
    text: "  Yeah, I think I'm going to start a new podcast. Is that a bulldog? And I'm going to have a bulldog as my mascot.",
  },

  // ... Add the rest of the transcription data here
];

export default function Transcript() {
  const handleClick = (timestamp) => {
    const youtubeUrl = "https://www.youtube.com/watch?v=CEee7dAk25c&t=";
    const url = `${youtubeUrl}${timestamp}`;
    window.open(url, "_blank");
  };

  return (
    <View className={styles.container}>
      <Head>
        <title>Transcript Service</title>
        <meta name="description" content="Transcript Service Webpage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1>Transcript Service</h1>
      </header>

      <main className={styles.main}>
        {transcriptData.map((entry, index) => (
          <div
            key={index}
            className={styles.transcriptEntry}
            onClick={() => handleClick(entry.timestamp)}
          >
            <p>
              <strong>{entry.speaker}</strong> [{entry.timestampRange}]:
            </p>
            <p>{entry.text}</p>
          </div>
        ))}
      </main>
    </View>
  );
}