import { ChartBar, Gear, PencilCircle } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import styles from "./Sidebar.module.css";

export function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h2>Admin</h2>
      <ul>
        <li>
          <Link href="/admin">
            <div className={styles.link}>
              <PencilCircle size={24} />
              <p>Home</p>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/admin/apis">
            <div className={styles.link}>
              <Gear size={24} />
              <p>APIs</p>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/admin/metrics">
            <div className={styles.link}>
              <ChartBar size={24} />
              <p>Métricas</p>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  )
}