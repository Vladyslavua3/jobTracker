'use client'
import React from "react";
import {useForm} from "react-hook-form";
import * as z from 'zod'
import { ScheduleTable} from '@prisma/client'
import {Heading} from "@/components/ui/heading";
import {Button} from "@/components/ui/button";
import {CalendarIcon, Trash} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {Input} from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import {useParams, useRouter} from "next/navigation";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {AlertModal} from "@/components/modals/alert-modal";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar";



interface ScheduleFormProps{
    initialData:ScheduleTable | null
}


const formSchema = z.object({
    company: z.string().min(1),
    dataInterview: z.date()
})

type ScheduleFormValues = z.infer<typeof formSchema>


export const ScheduleTrackerForm:React.FC<ScheduleFormProps> = ({
                                                               initialData
                                                           }) => {

    const params = useParams()
    const router = useRouter()


    const title = initialData ? 'Edit billboard' : 'Create billboard'
    const description = initialData ? 'Edit a billboard' : 'Add a new billboard'
    const toastMessage = initialData ? 'Billboard updated' : 'Billboard created'
    const action = initialData ? 'Save changes' : 'Create'

    const [open,setOpen] = useState(false)
    const [loading,setLoading] = useState(false)
    const [date, setDate] = React.useState<Date>()

    const form = useForm<ScheduleFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues:initialData || {
            company: "",
            dataInterview:date
        }
    })

    const onSubmit = async (data:ScheduleFormValues) =>{
        try {
            setLoading(true)
            if(initialData){
                await axios.patch(`/api/${params.jobId}/schedule/${params.scheduleId}`,data)
            }else {
                await axios.post(`/api/${params.jobId}/schedule`,data)
            }
            router.refresh()
            router.push(`/${params.jobId}/schedule`)
            toast.success(toastMessage)
        }catch (e) {
            toast.error('Something went wrong')
        }finally {
            setLoading(false)
        }
    }


    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.jobId}/schedule/${params.scheduleId}`)
            router.refresh()
            router.push(`/${params.jobId}/schedule`)
            toast.success('Schedule deleted')
        }catch (e) {
            toast.error('Something went wrong.')
        }finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return(
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}/>
            <div className={'flex items-center justify-between'}>
                <Heading
                    title={title}
                    description={description}
                />
                {initialData &&
                    <Button
                        variant={'destructive'}
                        size={'icon'}
                        disabled={loading}
                        onClick={()=>setOpen(true)}
                    >
                        <Trash className={'h-4 w-4'}/>
                    </Button>
                }
            </div>
            <Separator/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                      className={'space-y-8 w-full'}
                >
                    <div className={'grid grid-cols-3 gap-8'}>
                    <FormField
                        control={form.control}
                        name='company'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Company name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder={'Company name'} {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    </div>
                    <div className={'grid grid-cols-3 gap-8'}>
                        <FormField
                            control={form.control}
                            name="dataInterview"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date of interview</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(+field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <Button disabled={loading} className={'ml-auto'} type={'submit'}>
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    )
}