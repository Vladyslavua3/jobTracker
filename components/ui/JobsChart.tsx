import {BarList, Card} from "@tremor/react";
import {ChartTypeProps, JobsType} from "@/lib/types";


const JobsChart = ({jobs}:ChartTypeProps) => {


    const formattedJobs:JobsType[] = jobs.map((item)=>({
        id:item.id,
        status: item.status,
        dataApplied: item.dataApplied,
    }))

    const countByJobs = formattedJobs.reduce<{name : string , value:number}[]>((acc,city) => {

        let jobsEntry = acc.find(cityInAcc => cityInAcc.name === city.status)

        if(!jobsEntry){
            acc.push({name:city.status as string,value:1})
        }else {
            jobsEntry.value++
        }

        return acc

    },[] )


    return (
        <Card className="mx-auto max-w-lg">
            <h3 className="text-tremor-title text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">Cities by resume Analytics</h3>
            <p className="mt-4 text-tremor-default flex items-center justify-between text-tremor-content dark:text-dark-tremor-content">
                <span>City</span>
                <span>How many applied</span>
            </p>
            <BarList data={countByJobs} className="mt-2" />
        </Card>
    );
};

export default JobsChart;