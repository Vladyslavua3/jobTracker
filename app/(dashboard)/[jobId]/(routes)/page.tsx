import React from "react";
import prismadb from "@/lib/prismadb";
import CitiesChart from "@/components/ui/CitiesChart";
import JobsChart from "@/components/ui/JobsChart";

interface DashboardPropsType {
    params:{jobId:string}
}

const DashBoardPage:React.FC<DashboardPropsType> = async ({params}) =>{


    const jobs =  await prismadb.jobsTable.findMany({
        where:{
            jobId:params.jobId
        },
        orderBy:{
            createdAt:'desc'
        }
    })

    return(
        <div className={'h-screen flex items-start justify-center p-20'}>
          <JobsChart jobs={jobs} />
          <CitiesChart jobs={jobs}/>
        </div>
    )
}

export default DashBoardPage

