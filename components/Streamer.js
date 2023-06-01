import styles from './Streamer.module.css'

export default function Streamer({ game, started_at, title, user_name, thumbnail_url, profile_image_url }) {
  // Check if thumbnail_url and profile_image_url are defined before accessing the replace method
  const backgroundImage = thumbnail_url ? thumbnail_url.replace('{width}', '640').replace('{height}', '360') : '';
  const avatarImage = profile_image_url || '';

  return (
    <a className={styles.Streamer} href={`https://twitch.tv/${user_name}`} target="_blank">
      <div className={styles.StreamerThumbnail} style={{ backgroundImage }} />
      <div className={styles.StreamerInfo}>
        <span className={styles.StreamerAvatar} style={{ backgroundImage: `url(${avatarImage})` }} />
        <div>
          <h1 className={styles.StreamerUser}>{user_name}</h1>
          <h2 className={styles.StreamerTitle}>{title}</h2>
          <h3 className={styles.StreamerCategory}>{game}</h3>
        </div>
      </div>
    </a>
  );
}
