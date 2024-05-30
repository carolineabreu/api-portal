import { Header } from "@/components/Header";
import styles from "./metrics.module.css";
import { Sidebar } from "@/components/Sidebar";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type AdminData = {
  _id: string;
  api_name: string;
  api_description: string;
  status: string;
  created_at: string;
}

export default function Metrics() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<AdminData[]>()

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

  const countActiveByMonth = () => {
    const months: { [key: string]: number } = {};
    data?.forEach((item) => {
      const month = format(new Date(item.created_at), 'MM/yyyy');
      if (item.status === 'ACTIVE') {
        months[month] = (months[month] || 0) + 1;
      }
    });
    return months;
  };

    const countInactiveByMonth = () => {
    const months: { [key: string]: number } = {};
    data?.forEach((item) => {
      const month = format(new Date(item.created_at), 'MM/yyyy');
      if (item.status === 'INACTIVE') {
        months[month] = (months[month] || 0) + 1;
      }
    });
    return months;
  };


  const chartActiveData = {
    labels: Object.keys(countActiveByMonth()).map(date => date),
    datasets: [
      {
        label: 'Total Ativas',
        data: Object.values(countActiveByMonth()).map(date => date),
        backgroundColor: [
          'rgba(0, 123, 255, 0.5)',
          'rgba(0, 133, 255, 0.5)',
          'rgba(0, 144, 255, 0.5)',
          'rgba(0, 155, 255, 0.5)',
          'rgba(0, 166, 255, 0.5)',
        ],
      },
    ],
  };

    const chartInactiveData = {
    labels: Object.keys(countInactiveByMonth()).map(date => date),
    datasets: [
      {
        label: 'Total Ativas',
        data: Object.values(countInactiveByMonth()).map(date => date),
        backgroundColor: [
          'rgba(255, 87, 87, 0.5)',
          'rgba(255, 114, 114, 0.5)',
          'rgba(255, 141, 141, 0.5)',
          'rgba(255, 168, 168, 0.5)',
          'rgba(255, 195, 195, 0.5)',
        ],
      },
    ],
  };

  return (
    <div className="containerMain">
      <Header />
      <div className={styles.content}>
        <Sidebar />
        <div className={styles.mainContent}>
          <h1>Relatórios</h1>
          <div className={styles.charts}>
           <div className={styles.chart}>
             <Bar
              data={chartActiveData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'APIs Ativas',
                  },
                },
              }}
            />
           </div>
            <div className={styles.chart}>
            <Bar
              data={chartInactiveData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'APIs Inativas',
                  },
                },
              }}
            /></div>
          </div>
        </div>
      </div>
    </div>
  )
}