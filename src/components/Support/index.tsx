import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr"
import styles from "./Support.module.css"

export function Support() {
  return (
    <section id="support" className={styles.container}>
      <div className={styles.info}>
        <div className={styles.title}>
          <h4>Suporte</h4>
          <p>Entre em contato ou envie uma mensagem pelo formulário.</p>
        </div>
        <div className={styles.infoBody}>
          <div className={styles.infoItem}>
            <EnvelopeSimple size={32} />
            <p>suporte@gmail.com</p>
          </div>
          <div className={styles.infoItem}>
            <Phone size={32} />
            <p>(99) 99999-9999</p>
          </div>
          <div className={styles.infoItem}>
            <MapPin size={32} />
            <p>7785 Muller Stream <br /> São Paulo, Brasil</p>
          </div>
        </div>
      </div>
      <form className={styles.form}>
        <div className={styles.formName}>
          <div className={styles.formInput}>
            <label>
              Nome
            </label>
            <input type="text" placeholder="Jane" name="firstName" />
          </div>
          <div className={styles.formInput}>
            <label>
              Sobrenome
            </label>
            <input type="text" placeholder="Doe" name="lastName" />
          </div>
        </div>
        <div className={styles.formInput}>
          <label>
            Email
          </label>
          <input type="email" placeholder="janedoe@email.com" name="email" />
        </div>
        <div className={styles.formInput}>
          <label>
            Sua Mensagem
          </label>
          <textarea name="message" placeholder="Digite sua mensagem"></textarea>
        </div>
        <button type="submit" className={styles.button}>Enviar</button>
      </form>
    </section>
  )
}