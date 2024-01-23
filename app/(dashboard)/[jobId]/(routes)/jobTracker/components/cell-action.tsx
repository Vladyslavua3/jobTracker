"use client"

import React, {useState} from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Copy, Edit, MoreHorizontal, Trash} from "lucide-react";
import toast from "react-hot-toast";
import {useParams, useRouter} from "next/navigation";
import axios from "axios";
import {AlertModal} from "@/components/modals/alert-modal";
import {JobsColumn} from "@/app/(dashboard)/[jobId]/(routes)/jobTracker/components/columns";


interface CellActionProps {
    data:JobsColumn
}


export const CellAction:React.FC<CellActionProps> = ({
                                                         data
                                                     }) => {

    const [loading,setLoading] = useState(false)
    const [open,setOpen] = useState(false)


    const router = useRouter()
    const params = useParams()

    const seeResume = (resumeLink:string | null) => {
      if(resumeLink) return router.push(resumeLink)
      toast.error('You did not add resume for this job')
    }

    const seeCoverLetter = (coverLetter:string | null) => {
        if(coverLetter) return router.push(coverLetter)
        toast.error('You did not add cover letter for this job')
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.jobId}/jobTracker/${data.id}`)
            router.refresh()
            toast.success('Job deleted')
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
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => seeResume(data.resume)}>
                        See resume
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => seeCoverLetter(data.coverLetter)}>
                      See cover letter
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push(`/${params.jobId}/jobTracker/${data.id}`)}>
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