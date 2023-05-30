import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>🤍 Built with glub by <a href="https://github.com/dirty-fisherman/Broadway" target="_blank">Dirty Fisherman</a></p>
      <p>Adapted for Rusty Nuts Rust by <a href="https://www.linkedin.com/in/glenn-logan/">Glenn Logan</a></p>
    </footer>
  )
}
