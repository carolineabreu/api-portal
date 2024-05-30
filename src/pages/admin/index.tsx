import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { PencilSimple, Trash } from "@phosphor-icons/react/dist/ssr";
import styles from "./admin.module.css";
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import axios from "axios";
import { Oval } from "react-loader-spinner";
import { format } from "date-fns";
import { toast } from "react-toastify";

Modal.setAppElement('#__next');

const mockUserAPIs = [
  { id: 1, title: 'API 1', status: 'Ativo', date: '2024-05-30' },
  { id: 2, title: 'API 2', status: 'Inativo', date: '2024-05-29' },
  { id: 3, title: 'API 3', status: 'Ativo', date: '2024-05-28' },
];

type AdminData = {
  _id: string;
  api_name: string;
  api_description: string;
  status: string;
  created_at: string;
}

export default function Admin() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deletedApi, setDeletedApi] = useState<AdminData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<AdminData[]>()
  const [api, setApi] = useState<AdminData>()

  function handleOpenModal(api: AdminData) {
    setIsModalOpen(true)
    setApi(api)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
  }

  async function fetchData() {
    try {
      setLoading(true)
      const response = await axios.get("/api/apis/")
      
      const sortedDate = response.data.sort((a: AdminData, b: AdminData) => {
        const dateA = new Date(a.created_at).getTime()
        const dateB = new Date(b.created_at).getTime()

        return dateB - dateA;
      })

      setData(sortedDate)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  function handleStatusChange(status: string) {
    if (api) {
      setApi({
        ...api,
        status: status
      })
    }
  }

  async function handleEdit() {
    try {
      const response = await axios.put(`/api/apis/${api?._id}`, api);

      if (response) {
        toast.success("API editada com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })

        fetchData()
      }
      handleCloseModal();
    } catch (error: any) {
      toast.error(`Erro ao editar: ${error.response.data.error}`, {
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

  function handleOpenDeleteModal(api: AdminData) {
    setIsDeleteModalOpen(true);
    setDeletedApi(api)
  }

  async function handleDelete() {
    try {
      const response = await axios.delete(`/api/apis/${deletedApi?._id}`);

      if (response) {
        toast.success("API excluída com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })

        fetchData();
      }
      setIsDeleteModalOpen(false);
    } catch (error: any) {
      toast.error(`Erro ao excluir: ${error.response.data.error}`, {
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

  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro com transparência
    },
    content: {
      width: '300px', // Largura do modal
      height: '200px', // Altura do modal
      margin: 'auto', // Centraliza o modal horizontalmente
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: "8px"
    },
  };


  return (
    <div className="containerMain">
      <Header />
      <div className={styles.content}>
        <Sidebar />
        <div className={styles.mainContent}>
          <h1>Meu Conteúdo</h1>
          {loading ? (<Oval
            visible={true}
            height="80"
            width="80"
            color="#007BFF"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />) : (
            <div className={styles.apiList}>
              {data?.map((item) => {
                return (
                  <div key={item._id} className={styles.apiCard}>
                    <h2>{item.api_name}</h2>
                    <div className={styles.status}>
                      <p>Status: <strong>{item.status === "ACTIVE" ? "Ativo" : "Inativo"}</strong> </p>
                      <span className={item.status === "ACTIVE" ? styles.greenDot : styles.redDot}></span>
                    </div>
                    <p>Data: {format(item.created_at, "dd/MM/yyyy")}</p>
                    <div className={styles.apiButtons}>
                      <button
                        className={styles.editButton}
                        onClick={() => { handleOpenModal(item) }}>
                        Editar <PencilSimple />
                      </button>
                      <button onClick={() => { handleOpenDeleteModal(item) }} className={styles.deleteButton}>
                        Excluir <Trash />
                      </button>
                    </div>
                  </div>
                )
              })}
              <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                shouldCloseOnEsc={false}
                shouldCloseOnOverlayClick={false}
                style={modalStyles}
              >
                <div className={styles.modalContent}>
                  <h4>Editar Status</h4>
                  <div className={styles.input}>
                    <input
                      type="radio"
                      value="ativo"
                      checked={api?.status === 'ACTIVE'}
                      onChange={() => {
                        handleStatusChange("ACTIVE")
                      }}
                    />
                    <label>Ativo
                    </label>
                  </div>

                  <div className={styles.input}>
                    <input
                      type="radio"
                      value="inativo"
                      checked={api?.status === 'INACTIVE'}
                      onChange={() => {
                        handleStatusChange("INACTIVE")
                      }}
                    />
                    <label> Inativo
                    </label>
                  </div>


                  <div className={styles.modalButtons}>
                    <button className={styles.modalCloseButton} onClick={handleCloseModal}>Fechar</button>
                    <button className={styles.modalSaveButton} onClick={handleEdit}>Salvar</button>
                  </div>
                </div>
              </Modal>

              <Modal
                isOpen={isDeleteModalOpen}
                onRequestClose={() => setIsDeleteModalOpen(false)}
                shouldCloseOnEsc={false}
                shouldCloseOnOverlayClick={false}
                style={modalStyles}
              >
                <div className={styles.modalDeleteContent}>
                  <p>Deseja excluir API <strong>{deletedApi?.api_name}</strong>?</p>

                  <div className={styles.modalDeleteButtons}>
                    <button className={styles.modalCloseButton} onClick={() => setIsDeleteModalOpen(false)}>Fechar</button>
                    <button className={styles.deleteButton} onClick={handleDelete}>Excluir</button>
                  </div>
                </div>
              </Modal>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}