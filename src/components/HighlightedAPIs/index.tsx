import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./HighlightedAPIs.module.css";

type APIs = {
  api_name: string;
  api_description: string;
  image?: string;
}

export function HighlightedAPIs() {
  const [apis, setApis] = useState<APIs[]>();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/external-api/")

        setApis(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, []);

  return (
    <section id="highlighted-apis" className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.headerTitle}>Explore nossas principais APIs</h3>
        <a href="#">Ver todas</a>
      </div>
      <div className={styles.cards}>
        {apis?.slice(0, 4).map((api, i) => {
          return (
            <div key={`${api.api_name}+${i}`} className={styles.cardItem}>
              <div className={styles.cardBody}>
                <Image src={"/icon.png"} alt="api icon" height={32} width={32} />
                <p className={styles.cardTitle}>{api.api_name}</p>
                <p className={styles.cardDescription}>{api.api_description}</p>
              </div>
              <button className={styles.button}>
                Conhecer
                <ArrowRight color="#007BFF" />
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}