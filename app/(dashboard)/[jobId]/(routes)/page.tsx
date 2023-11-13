import React from "react";
import prismadb from "@/lib/prismadb";
import BarChart from "@/components/ui/barChart";
import PieChart from "@/components/ui/pieChart";

interface DashboardPropsType {
    params:{jobId:string}
}

export interface JobsType{
    id:string
    status:string
    dataApplied:Date
}

export interface CitiesType{
    id:string
    status:string
    location:string
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


    const formattedCities:CitiesType[] = jobs.map((item) => ({
        id:item.id,
        status:item.status,
        location:item.location
    }))

    return(
        <div className={'h-screen'}>
            Active Store : {store?.name}
            <div className={'flex items-center justify-around h-full'}>
                <BarChart jobs={formattedJobs} />
                <PieChart cities={formattedCities} />
            </div>

        </div>
    )
}

export default DashBoardPage