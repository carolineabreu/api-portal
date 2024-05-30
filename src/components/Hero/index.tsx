import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>Bem vindo ao Portal de APIs</h1>
        <p>Descubra e Conecte-se às Melhores APIs para seus Projetos</p>
        <button className={styles.exploreButton}>Explorar</button>
      </div>
    </section>
  )
}