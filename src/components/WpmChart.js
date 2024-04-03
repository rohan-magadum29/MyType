import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import axios from "axios";
import { useEffect, useState } from "react";
import { useGameCount } from "../contexts/GameCountContext";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WpmChart = ({ userEmail }) => {
  const {gameCount} = useGameCount()
  const [chartData, setChartData] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const fetchWPM = async () => {
    try {
      const response = await axios.get("http://localhost:9002/games", {
        params: { email: userEmail },
      });
      const gamesData = response.data;
      const labels = gamesData.map((game, index) => `Game ${index + 1}`);
      const wpmData = gamesData.map((game) => game.speed);
      const WpmChartData = {
        labels: labels,
        datasets: [
          {
            label: "WPM",
            data: wpmData,
            borderColor: "green",
          },
        ],
      };
      console.log(WpmChartData);
      return WpmChartData;
    } catch (error) {
      console.error("Error Fetching Games", error);
    }
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchWPM();
        setChartData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch()
  },[gameCount]);
  const options = {
    plugins: {
      legend: {
        labels: {
          color: "white",
          font: {
            size: 20,
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          padding: 25,
          font: {
            size: 20,
          },
        },
      },
      y: {
        ticks: {
          padding: 25,
          font: {
            size: 15,
          },
        },
      },
    },
  };
  return chartData ? (
    <div>
        <h1>Progress Bar</h1>
      <Line options={options} data={chartData} />
    </div>
  ) : null;
};
export default WpmChart;
