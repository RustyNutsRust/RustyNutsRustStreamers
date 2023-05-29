import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="logo.png" alt={process.env.NEXT_PUBLIC_NAME} />
      </div>
      
      {process.env.NEXT_PUBLIC_DISCORD_URL && <div className={styles.discord}>
        <a href={process.env.NEXT_PUBLIC_DISCORD_URL} target="_blank">Join the Discord</a>
      </div>}
    </header>
  )
}
