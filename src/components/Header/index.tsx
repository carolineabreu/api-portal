import Link from "next/link";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.menu}>
          <li><Link href="/">HOME</Link></li> 
          <li><Link href="/#resources">RECURSOS</Link></li>
          <li><Link href="/#highlighted-apis">APIs</Link></li>
          <li><Link href="/#support">SUPORTE</Link></li>
          <li><Link href="/admin">ADMIN</Link></li>
        </ul>
      </nav>
    </header>
  )
}