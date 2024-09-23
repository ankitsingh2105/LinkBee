import React, { useEffect, useState } from 'react';
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "./Chart.css";
import axios from "axios";
import backendLink from '../backendLink';

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);


export default function Charts() {


  const [loading, setloading] = useState(true);
  const [clickArray, setclickArray] = useState([]);
  const [linkName, setlinkName] = useState([]);

  useEffect(() => {
    const currentUrl = window.location.pathname;
    const parts = currentUrl.split('/');
    const userIDAnalyse = parts[parts.length - 2];
    async function fetchStats() {
      try {
        let response = await axios.post(`${backendLink}/user/getLinkanalytics`, {
          "userID": userIDAnalyse
        })
        response.data.forEach(element => {
          setlinkName((prev) => [...prev, `${element.name} (${element.title}) `]);
          setclickArray((prev) => [...prev, element.count]);
        });
        setloading(false);
      }
      catch (error) {
      }
    }
    fetchStats();
  }, [])


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Click Analytics',
        font: {
          size: 28,
          weight: 'bold',
        },
        color: '#111',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Links',
          color: '#333',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        grid: {
          display: true,
        },
        ticks: {
          color: '#333',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Clicks',
          color: '#333',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        grid: {
          color: '#ddd',
        },
        ticks: {
          color: '#333',
        },
      },
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'easeInOutQuad',
        from: 0.3,
        to: 0,
        loop: true,
      },
    },
  };

  const data = {
    labels: linkName,
    datasets: [
      {
        label: "clicks",
        data: clickArray,
        backgroundColor: "lightgreen",
        borderColor: "black",
        borderWidth: .5
      },
    ]
  };

  return (
    <main className="chart_main">
      {
        loading ?
          <>
            <div className="loader"></div>
          </>
          :
          <>
            <section style={{ height: "500px" }}>
              <Bar  options={options} data={data} />
            </section>
          </>
      }
    </main>
  );
}
