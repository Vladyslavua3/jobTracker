"use client"

import { ColumnDef } from "@tanstack/react-table"
import {CellAction} from "@/app/(dashboard)/[jobId]/(routes)/jobTracker/components/cell-action";


export type JobsColumn = {
    id: string
    position: string
    company: string
    status: string
    link : string
    salary: string
    location: string
    dataApplied: string
}

export const columns: ColumnDef<JobsColumn>[] = [
    {
        accessorKey: "company",
        header: "Company",
    },
    {
      accessorKey:"position",
      header:"Position"
    },
    {
        accessorKey: "link",
        header: "Link",
    },
    {
        accessorKey:"salary",
        header:"Salary"
    },
    {
        accessorKey:"location",
        header:"Location"
    },
    {
        accessorKey:"dataApplied",
        header:"Data Applied"
    },
    {
        accessorKey:"status",
        header:"Status"
    },
    {
        id:'actions',
        cell: ({row}) => <CellAction data={row.original}/>
    }
]