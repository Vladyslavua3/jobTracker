import prismadb from "@/lib/prismadb";
import {ScheduleTrackerForm} from "@/app/(dashboard)/[jobId]/(routes)/schedule/[scheduleId]/components/jobTracker-form";

const ScheduleTrackerPage = async ({
                                  params
                              } : {
    params:{scheduleId:string}
}) => {

    const schedule = await prismadb.scheduleTable.findUnique({
        where:{
            id:params.scheduleId
        }
    })

    return(
        <div className={'flex-col'}>
            <div className={'flex-1 space-y-4 p-8 pt-6'}>
                <ScheduleTrackerForm initialData={schedule}/>
            </div>
        </div>
    )
}

export default ScheduleTrackerPage