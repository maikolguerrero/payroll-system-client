import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CircleChart({ datos, compare }) {
  let options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  let data = {
    labels: compare,
    datasets: [
      {
        label: "Cantidad de Empleados",
        data: datos,

        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  };

  function rand(frm, to) {
    return ~~(Math.random() * (to - frm)) + frm;
  }

  for (let i = 0; i < compare.length; i++) {
    var color = `rgba(${rand(0, 255)}, ${rand(0, 255)}, ${rand(0, 255)}`;
    let colorClaro = color + ", .2)"
    let colorFuerte = color + ", 1)"
    data.datasets[0].backgroundColor.push(colorClaro);
    data.datasets[0].borderColor.push(colorFuerte);
  }
  return <Pie data={data} options={options} />;
}
