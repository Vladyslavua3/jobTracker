import prismadb from "@/lib/prismadb";
import {format} from 'date-fns'
import {JobsColumn} from "@/app/(dashboard)/[jobId]/(routes)/jobTracker/components/columns";
import JobClient from "@/app/(dashboard)/[jobId]/(routes)/jobTracker/components/client";

const JobTracker = async ({
    params
                          }:{
    params:{jobId:string}
}) => {

    const jobs = await prismadb.jobsTable.findMany({
        where:{
            jobId:params.jobId
        },
        orderBy:{
            createdAt:'desc'
        }
    })

    const formattedJobs:JobsColumn[] = jobs.map((item)=>({
        id:item.id,
        position: item.position,
        company: item.company,
        status: item.status,
        salary: item.salary,
        location: item.location,
        dataApplied: format(item.dataApplied,"MMMM do, yyyy"),
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))


    return(
        <div className={'flex-col'}>
            <div className={'flex-1 space-y-4 p-8 pt-6'}>
                <JobClient data={formattedJobs}/>
            </div>
        </div>
    )
}


export default JobTracker