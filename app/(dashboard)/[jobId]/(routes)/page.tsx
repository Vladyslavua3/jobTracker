import React from "react";
import prismadb from "@/lib/prismadb";
import BarChart from "@/components/ui/barChart";

interface DashboardPropsType {
    params:{jobId:string}
}

export interface JobsType{
    id:string
    status:string
    dataApplied:Date
}

const DashBoardPage:React.FC<DashboardPropsType> = async ({params}) =>{

    const store = await prismadb.store.findFirst({
        where:{
            id:params.jobId
        }
    })

    const jobs =  await prismadb.jobsTable.findMany({
        where:{
            jobId:params.jobId
        },
        orderBy:{
            createdAt:'desc'
        }
    })

    const formattedJobs:JobsType[] = jobs.map((item)=>({
        id:item.id,
        status: item.status,
        dataApplied: item.dataApplied,
    }))


    return(
        <div className={'h-screen'}>
            Active Store : {store?.name}
            <div className={'flex items-center justify-around h-full'}>
                <BarChart jobs={formattedJobs} />
                <BarChart jobs={formattedJobs} />
            </div>

        </div>
    )
}

export default DashBoardPage