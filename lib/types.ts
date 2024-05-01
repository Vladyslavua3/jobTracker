import {JobsColumn} from "@/app/(dashboard)/[jobId]/(routes)/jobTracker/components/columns";

export interface ChartTypeProps {
    jobs:JobsColumn[]
}

export interface JobsType{
    id:string
    status:string | null
    dataApplied:Date
}


export interface CitiesType{
    id:string
    status:string | null
    location:string | null
}
