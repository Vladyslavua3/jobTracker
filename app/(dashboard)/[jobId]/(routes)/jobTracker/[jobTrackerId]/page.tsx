import prismadb from "@/lib/prismadb";
import {JobTrackerForm} from "@/app/(dashboard)/[jobId]/(routes)/jobTracker/[jobTrackerId]/components/jobTracker-form";

const JobTrackerPage = async ({
                                  params
                              } : {
    params:{jobTrackerId:string}
}) => {

    const job = await prismadb.jobsTable.findUnique({
        where:{
            id:params.jobTrackerId
        }
    })

    return(
        <div className={'flex-col'}>
            <div className={'flex-1 space-y-4 p-8 pt-6'}>
                <JobTrackerForm initialData={job}/>
            </div>
        </div>
    )
}

export default JobTrackerPage