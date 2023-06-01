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
        console.log('Stream data:', streamsData); // Logging stream data
        const streamers = streamsData.streams;
  
        fetch('/.netlify/functions/users')
          .then(response => response.json())
          .then(usersData => {
            console.log('User data:', usersData); // Logging user data
            const users = usersData.users;
  
            // Merge streamers with users based on user_login
            const mergedData = streamers.map(streamer => {
              const user = users.find(u => u.login === streamer.user_login);
              if (!user) {
                console.log(`User not found for streamer: ${streamer.user_login}`);
                return null;
              }
              return {
                ...streamer,
                display_name: user.display_name,
                profile_image_url: user.profile_image_url,
              };
            });
  
            console.log('Merged data:', mergedData); // Logging merged data
  
            const filteredData = mergedData.filter(item => item !== null);
            setData(filteredData);
            setIsLoading(false);
          })
          .catch(error => {
            console.log('Error fetching users:', error);
            setIsLoading(false);
          });
      })
      .catch(error => {
        console.log('Error fetching streams:', error);
        setIsLoading(false);
      });
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
                key={streamer.user_name}
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
