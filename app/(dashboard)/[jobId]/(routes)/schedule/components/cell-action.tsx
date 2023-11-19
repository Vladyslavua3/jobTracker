"use client"

import React, {useState} from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Copy, Edit, MoreHorizontal, Trash} from "lucide-react";
import toast from "react-hot-toast";
import {useParams, useRouter} from "next/navigation";
import axios from "axios";
import {AlertModal} from "@/components/modals/alert-modal";
import {ScheduleColumn} from "@/app/(dashboard)/[jobId]/(routes)/schedule/components/columns";

interface CellActionProps {
    data:ScheduleColumn
}


export const CellAction:React.FC<CellActionProps> = ({
                                                         data
                                                     }) => {

    const [loading,setLoading] = useState(false)
    const [open,setOpen] = useState(false)


    const router = useRouter()
    const params = useParams()

    const onCopy = (id:string) => {
        navigator.clipboard.writeText(id)
        toast.success('Schedule Id copied to the clipboard ')
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.jobId}/schedule/${data.id}`)
            router.refresh()
            toast.success('Schedule deleted')
        }catch (e) {
            toast.error('Something went wrong.')
        }finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <>
            <AlertModal isOpen={open} loading={loading} onClose={() => setOpen(false)} onConfirm={onDelete}/>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={'ghost'} className={'h-8 w-8 p-0'}>
                        <span className={'sr-only'}>Open menu</span>
                        <MoreHorizontal className={'h-4 w-4'}/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={'end'}>
                    <DropdownMenuLabel>
                        Action
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onCopy(data.id)}>
                        <Copy className={'mr-2 h-4 w-4'}/>
                        Copy Id
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/${params.jobId}/schedule/${data.id}`)}>
                        <Edit className={'mr-2 h-4 w-4'}/>
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className={'mr-2 h-4 w-4'}/>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}