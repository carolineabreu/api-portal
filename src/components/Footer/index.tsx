import { FacebookLogo, InstagramLogo, LinkedinLogo, YoutubeLogo } from "@phosphor-icons/react/dist/ssr";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialLinks}>
        <a href="#" className={styles.link}>
          <FacebookLogo size={24} color="#828282" />
        </a>
        <a href="#" className={styles.link}>
          <LinkedinLogo size={24} color="#828282" />
        </a>
        <a href="#" className={styles.link}>
          <YoutubeLogo size={24} color="#828282" />
        </a>
        <a href="#" className={styles.link}>
          <InstagramLogo size={24} color="#828282" />
        </a>
      </div>
      <nav className={styles.footerNav}>
        <ul className={styles.footerNavList}>
          <li><p>Topic</p></li>
          <li><a href="#">Topic 1</a></li>
          <li><a href="#">Topic 2</a></li>
          <li><a href="#">Topic 3</a></li>
        </ul>
        <ul className={styles.footerNavList}>
          <li><p>Topic</p></li>
          <li><a href="#">Topic 1</a></li>
          <li><a href="#">Topic 2</a></li>
          <li><a href="#">Topic 3</a></li>
        </ul>
        <ul className={styles.footerNavList}>
          <li><p>Topic</p></li>
          <li><a href="#">Topic 1</a></li>
          <li><a href="#">Topic 2</a></li>
          <li><a href="#">Topic 3</a></li>
        </ul>
      </nav>
    </footer>
  )
}