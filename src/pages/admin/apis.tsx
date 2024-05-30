import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import axios from "axios";
import { useState, useEffect } from "react"
import styles from "./apis.module.css"
import Image from "next/image";
import { ArrowRight, PlusCircle } from "@phosphor-icons/react/dist/ssr";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";

type API = {
  api_name: string;
  api_description: string;
}

type APIFormSchema = {
  api_name: string;
  api_description: string;
  status: string;
}

export default function Apis() {
  const [apis, setApis] = useState<API[]>();
  const [loading, setLoading] = useState<boolean>(true)
  const [visibleApis, setVisibleApis] = useState<API[]>([]);
  const [showMoreButton, setShowMoreButton] = useState<boolean>(true);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/external-api/")

        setApis(response.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, []);

  useEffect(() => {
    if (apis) {
      setVisibleApis(apis.slice(0, 12));

      if (apis.length <= 12) {
        setShowMoreButton(false);
      }
    }
  }, [apis]);

  const handleShowMore = () => {
    if (apis) {
      const nextVisibleApis = apis.slice(visibleApis.length, visibleApis.length + 12);
      setVisibleApis([...visibleApis, ...nextVisibleApis]);

      if (visibleApis.length + nextVisibleApis.length >= apis.length) {
        setShowMoreButton(false);
      }
    }
  };

  async function handleSubmit(api: APIFormSchema) {
    try {
      const response = await axios.post('/api/apis', api);

      if(response) {
        toast.success(`API: ${api.api_name} adicionada com sucesso!`,{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    } catch (error: any) {
      toast.error(`Erro ao adicionar: ${error.response.data.error}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  return (
    <div className="containerMain">
      <Header />
      <div className={styles.content}>
        <Sidebar />
        <div className={styles.mainContent}>
          <h1>APIs Disponíveis</h1>
          {loading ? (<Oval
            visible={true}
            height="80"
            width="80"
            color="#007BFF"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />) : (
            <>
                <div className={styles.cardList}>
                  {visibleApis?.map((api, i) => {
                    return (
                      <div key={`${api.api_name}+${i}`} className={styles.cardItem}>
                        <div className={styles.cardBody}>
                          <p className={styles.cardTitle}>{api.api_name}</p>
                          <p className={styles.cardDescription}>{api.api_description}</p>
                        </div>
                        <button
                          onClick={() => handleSubmit({ api_name: api.api_name, api_description: api.api_description, status: "ACTIVE" })} className={styles.button}
                        >
                          Adicionar
                          <PlusCircle color="#007BFF" />
                        </button>
                      </div>
                    )
                  })}
                </div>
                {showMoreButton && (
                  <div className={styles.showMoreButtonContainer}>
                    <button className={styles.showMoreButton} onClick={handleShowMore}>
                      Mostrar Mais
                    </button>
                  </div>
                )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}