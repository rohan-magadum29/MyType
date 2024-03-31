import { Line } from "react-chartjs-2"

import {Chart as ChartJS ,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend} from 'chart.js'
import { WpmChartData } from "../data/WpmChartData"
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend)

export const WpmChart = () => {
    const options = {
        plugins: {
            legend: {
                labels: {
                    color: 'white',
                    font:{
                        size:20,
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    padding:25,
                    font:{
                        size:20
                    }

                }
            },
            y: {
                ticks: {
                    padding:25,
                    font:{
                        size:15
                    }
                }
            }
        },
    }
    return <Line options={options} data={WpmChartData}/>
}