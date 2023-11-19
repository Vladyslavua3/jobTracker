"use client"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend, ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {format} from "date-fns";
import {JobsType} from "@/app/(dashboard)/[jobId]/(routes)/page";
import {Inter} from "next/font/google";






ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const inter = Inter({ subsets: ['latin'] })

ChartJS.defaults.font = {
    family:inter.className,
    style:'oblique',
    weight:'300',
    lineHeight:1.2
}

ChartJS.defaults.font.size = 18
// ChartJS.defaults.color = '#fff'



type StatusCounts = {
    applied: number;
    interview: number;
    rejected: number;
};

enum StatusCode {
    Applied = 'applied',
    Interview = 'interview',
    Rejected = 'rejected'
}

export const options:ChartOptions<'bar'> = {
    responsive: true,
    layout: {
        padding: {
            top: 5,
            left: 15,
            right: 15,
            bottom: 15
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            grid:{
                drawOnChartArea:false
            },
            ticks: {
                stepSize: 1,
                callback: function(value) {
                    if (value as number % 1 === 0) {
                        return value.toString();
                    }
                },
            },
        },
        x: {
            grid:{
              drawOnChartArea:false
            },
        },
    },
    plugins: {
        legend: {
            labels: {
                boxWidth:20,
                boxHeight:20,
                useBorderRadius:true
            },
        },
        title: {
            display: true,
            text: 'Job Statistic',
        },
    },
};



const BarChart = ({jobs} : {jobs:JobsType[]}) => {

    const countsByMonth:Record<string, StatusCounts> = jobs.reduce((acc, job) => {
        const month = format(+job.dataApplied, 'MMMM');
        if (!acc[month]) {
            acc[month] = { applied: 0, interview: 0, rejected: 0 };
        }
        if (job.status.toLowerCase() === StatusCode.Applied) acc[month].applied += 1;
        if (job.status.toLowerCase() === StatusCode.Interview) acc[month].interview += 1;
        if (job.status.toLowerCase() === StatusCode.Rejected) acc[month].rejected += 1;
        return acc;
    }, {} as Record<string, StatusCounts>);


    const data = {
        labels : Object.keys(countsByMonth),
        datasets: [
            {
                label: 'Applied',
                data: Object.values(countsByMonth).map((counts) => counts.applied),
                backgroundColor: '#adfa1d',
                borderColor: 'rgba(53, 162, 100, 0.8)',
                borderWidth: 2,
                borderRadius:5
            },
            {
                label: 'Interview',
                data: Object.values(countsByMonth).map((counts) => counts.interview),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                borderColor: 'rgba(53, 162, 235, 0.8)',
                borderWidth: 2,
                borderRadius:5,
            },
            {
                label: 'Rejected',
                data: Object.values(countsByMonth).map((counts) => counts.rejected),
                backgroundColor: 'rgba(232, 30, 30, 0.8)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                borderRadius:5
            },
        ],
    };


    return <Bar data={data} options={options} className={'max-h-96 max-w-2xl border-2 border-solid border-black-500 rounded-md'} />
}

export default BarChart