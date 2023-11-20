"use client"

import { ColumnDef } from "@tanstack/react-table"
import {CellAction} from "@/app/(dashboard)/[jobId]/(routes)/schedule/components/cell-action";



export type ScheduleColumn = {
    id: string
    company: string
    dataInterview: string
}

export const columns: ColumnDef<ScheduleColumn>[] = [
    {
        accessorKey: "company",
        header: "Company",
    },
    {
        accessorKey:"dataInterview",
        header:"Data Interview"
    },
    {
        id:'actions',
        cell: ({row}) => <CellAction data={row.original}/>
    }
]