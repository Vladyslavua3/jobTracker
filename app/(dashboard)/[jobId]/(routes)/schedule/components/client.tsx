"use client"

import {FC} from "react";
import {useParams, useRouter} from "next/navigation";
import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Heading} from "@/components/ui/heading";
import {Separator} from "@/components/ui/separator";
import {DataTable} from "@/components/ui/data-table";
import {columns, ScheduleColumn} from "@/app/(dashboard)/[jobId]/(routes)/schedule/components/columns";
import {formatDate} from "@fullcalendar/core";

interface ScheduleClientProps{
    data:ScheduleColumn[]
}


const ScheduleClient:FC<ScheduleClientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()
    const handlerForButton = () => {
        router.push(`/${params.jobId}/schedule/new`)
    }

    const formattedDate = data.map(item => ({
        id:item.id,
        company:item.company,
        dataInterview: formatDate(item.dataInterview ,{
            year:'numeric',
            month:'short',
            day:'numeric',
            hour:'numeric'
        }),
    }))


    return(
        <>
            <div className={'flex items-center justify-between'}>
                <Heading title={`Upcoming interview (${data.length})`}
                         description={'Manage your schedule'}
                />
                <Button onClick={handlerForButton}>
                    <Plus className={'mr-2 h-4 w-4'}/>
                    Add New
                </Button>
            </div>
            <Separator/>
            <DataTable searchKey={'company'} columns={columns} data={formattedDate}/>
        </>
    )
}


export default ScheduleClient