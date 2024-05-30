import { ChartBar, Gear, PencilCircle } from "@phosphor-icons/react/dist/ssr";
import styles from "./Resources.module.css";

export function Resources() {
  return (
    <section className={styles.container} id="resources">
      <h2 className={styles.title}>Recursos</h2>
      <div className={styles.cards}>
        <div className={styles.cardItem}>
          <div className={styles.cardIcon}>
            <PencilCircle size={30} color="#007BFF" />
          </div>
          <div className={styles.cardText}>
            <p className={styles.cardTitle}>Gerenciamento de Conteúdo</p>
            <p className={styles.cardDescription}>Adicione, edite ou exclua facilmente o conteúdo do portal.</p>
          </div>
        </div>
        <div className={styles.cardItem}>
          <div className={styles.cardIcon}>
            <Gear size={30} color="#007BFF" />
          </div>
          <div className={styles.cardText}>
            <p className={styles.cardTitle}>Gestão de APIs</p>
            <p className={styles.cardDescription}>Mantenha suas APIs organizadas e atualizadas.</p>
          </div>
        </div>
        <div className={styles.cardItem}>
          <div className={styles.cardIcon}>
            <ChartBar size={30} color="#007BFF" />
          </div>
          <div className={styles.cardText}>
            <p className={styles.cardTitle}>Análise de Desempenho</p>
            <p className={styles.cardDescription}>Visualize métricas e relatórios detalhados para melhorar sua experiência no portal.</p>
          </div>
        </div>
      </div>
    </section>
  )
}