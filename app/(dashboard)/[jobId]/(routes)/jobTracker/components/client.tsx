"use client"
import {columns, JobsColumn} from "@/app/(dashboard)/[jobId]/(routes)/jobTracker/components/columns";
import {FC} from "react";
import {useParams, useRouter} from "next/navigation";
import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Heading} from "@/components/ui/heading";
import {Separator} from "@/components/ui/separator";
import {DataTable} from "@/components/ui/data-table";

interface JobClientProps{
    data:JobsColumn[]
}


const JobClient:FC<JobClientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()
    const handlerForButton = () => {
        router.push(`/${params.jobId}/jobTracker/new`)
    }


    return(
        <>
            <div className={'flex items-center justify-between'}>
                <Heading title={`Jobs (${data.length})`}
                         description={'Manage your Jobs'}
                />
                <Button onClick={handlerForButton}>
                    <Plus className={'mr-2 h-4 w-4'}/>
                    Add New
                </Button>
            </div>
            <Separator/>
            <DataTable searchKey={'company'} columns={columns} data={data}/>
        </>
    )
}


export default JobClient