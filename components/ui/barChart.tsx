"use client"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {format} from "date-fns";
import {JobsType} from "@/app/(dashboard)/[jobId]/(routes)/page";



ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

type StatusCounts = {
    applied: number;
    interview: number;
    rejected: number;
};

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
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
        if (job.status.toLowerCase() === 'applied') acc[month].applied += 1;
        if (job.status.toLowerCase() === 'interview') acc[month].interview += 1;
        if (job.status.toLowerCase() === 'rejected') acc[month].rejected += 1;
        return acc;
    }, {} as Record<string, StatusCounts>);


    const data = {
        labels : Object.keys(countsByMonth),
        datasets: [
            {
                label: 'Applied',
                data: Object.values(countsByMonth).map((counts) => counts.applied),
                backgroundColor: 'rgba(53, 162, 100, 0.5)',
            },
            {
                label: 'Interview',
                data: Object.values(countsByMonth).map((counts) => counts.interview),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Rejected',
                data: Object.values(countsByMonth).map((counts) => counts.rejected),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };


    return(
        <div>
            <Bar data={data} options={options} />
        </div>
    )
}

export default BarChart