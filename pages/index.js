import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Streamer from '@components/Streamer'
import Spinner from '@components/Spinner'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/.netlify/functions/streams')
      .then(response => response.json())
      .then(streamsData => {
        const streamers = streamsData.streams;

        fetch('/.netlify/functions/users')
          .then(response => response.json())
          .then(usersData => {
            const users = usersData.users;

            // Merge streamers with users based on user_login
            const mergedData = streamers.map(streamer => {
              const user = users.find(u => u.login === streamer.user_login);
              return {
                ...streamer,
                display_name: user.display_name,
                profile_image_url: user.profile_image_url,
              };
            });

            setData(mergedData);
            setIsLoading(false);
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="container">
      <Head>
        <title>{process.env.NEXT_PUBLIC_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {isLoading && <Spinner />}
        <Header />
        <div className="content">
          <div className='stream-grid'>
            {!isLoading && data.map(streamer => (
              <Streamer
                key={streamer.user_login}
                game={streamer.game_name}
                started_at={streamer.started_at}
                title={streamer.title}
                user_name={streamer.display_name}
                thumbnail_url={streamer.thumbnail_url}
                profile_image_url={streamer.profile_image_url}
              />
            ))}
          </div>
        </div>
        <Footer />
      </main>
    </div>
  )
}
