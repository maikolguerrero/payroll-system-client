import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);


export default function LinesChart({left, bottom, title_1, }) {
    let midata = {
        labels: bottom,
        datasets: [ // Cada una de las líneas del gráfico
            {
                label: title_1,
                data: left,
                tension: 0.5,
                fill : true,
                borderColor: 'rgba(0, 148, 246)',
                backgroundColor: 'rgba(0, 148, 246, .5)',
                pointRadius: 5,
                pointBorderColor: 'rgba(0, 148, 246)',
                pointBackgroundColor: 'rgba(0, 148, 246)',
            },
        ],
    };
    
    let misoptions = {
        scales : {
            y : {
                min : 0
            },
            x: {
                ticks: { color: '#000000'}
            }
        }
    };

    return <Line data={midata} options={misoptions}/>
}