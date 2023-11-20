import prismadb from "@/lib/prismadb";
import {format} from 'date-fns'
import ScheduleClient from "@/app/(dashboard)/[jobId]/(routes)/schedule/components/client";
import {ScheduleColumn} from "@/app/(dashboard)/[jobId]/(routes)/schedule/components/columns";
import CustomCalendar from "@/components/ui/custom-calendar";

const ScheduleTracker = async ({
    params
                          }:{
    params:{jobId:string}
}) => {

    const schedule = await prismadb.scheduleTable.findMany({
        where:{
            jobId:params.jobId
        },
        orderBy:{
            createdAt:'desc'
        }
    })


    const formattedSchedule:ScheduleColumn[] = schedule.map(item => ({
        id:item.id,
        company:item.company,
        dataInterview:item.dataInterview,
        createdAt:format(item.createdAt,"MMMM do, yyyy")
    }))



    return(
        <div className={'flex-col'}>
            <div className={'flex-1 space-y-4 p-8 pt-6'}>
                <CustomCalendar data={formattedSchedule}/>
                <ScheduleClient data={formattedSchedule}/>
            </div>
        </div>
    )
}


export default ScheduleTracker