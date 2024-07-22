import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function BarsChart({montos, tipos}) {
    var misoptions = {
    responsive: true,
    animation: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 0,
      },
      x: {
        ticks: { color: "rgba(0, 107, 179)" },
      },
    },
  };

  var midata = {
    labels: tipos,
    datasets: [
      {
        label: "Monto Salarial",
        data: montos,
        backgroundColor: "rgba(0, 107, 179, 0.5)",
      },
    ],
  };

  return <Bar data={midata} options={misoptions} />;
}
