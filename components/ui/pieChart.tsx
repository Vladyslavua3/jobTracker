"use client"

import {Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import {CitiesType} from "@/app/(dashboard)/[jobId]/(routes)/page";

ChartJS.register(ArcElement, Tooltip, Legend);


export const options:ChartOptions<'polarArea'> = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
            labels: {
                font: {
                    family: 'inter',
                    size:17
                },
            },
        },
        title: {
            display: true,
            text: 'Job Statistic by Cities',
            font:{
                family:'Inter',
                size:20
            }
        },
    },
};

const PieChart = ({cities}:{cities:CitiesType[]}) => {

    const countByCities:Record<string, {count:number}> = cities.reduce((acc,city) => {

        if(!acc[city.location]){
            acc[city.location] = {count:0}
        }

        acc[city.location].count++;

        console.log(acc)
        return acc
    },{} as Record<string, {count:number}> )


    const data = {
        labels: Object.keys(countByCities),
        datasets: [
            {
                data: Object.values(countByCities).map((counts) => counts.count),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                ],
                borderWidth: 1,
                font:{
                    family: 'inter',
                    size:17
                },
            },
        ],
    };


    return <Pie data={data} options={options as ChartOptions}/>
}

export default PieChart