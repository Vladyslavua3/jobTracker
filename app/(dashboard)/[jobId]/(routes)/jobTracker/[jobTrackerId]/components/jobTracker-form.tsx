'use client'
import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import * as z from 'zod'
import {JobsTable} from '@prisma/client'
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
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar";
import {MultiFileDropzoneUsage} from "@/components/ui/fileDropUsage";
import {useFileLink} from "@/hooks/useFileLink";
import Link from "next/link";



interface BillboardFormProps{
    initialData:JobsTable | null
}


const formSchema = z.object({
    position: z.string().min(1).optional(),
    company: z.string().min(1),
    status: z.string().min(1),
    link:z.string().min(1).optional(),
    resume:z.string().min(1).optional(),
    coverLetter:z.string().min(1).optional(),
    salary: z.string().min(1).optional(),
    location: z.string().min(1).optional(),
    dataApplied: z.date()
})

type JobFormValues = z.infer<typeof formSchema>


export const JobTrackerForm:React.FC<BillboardFormProps> = ({
                                                               initialData
                                                           }) => {

    const router = useRouter()
    const params = useParams()
    const {linkToResume,linkToCoverLetter} = useFileLink()

    const title = initialData ? 'Edit billboard' : 'Create billboard'
    const description = initialData ? 'Edit a billboard' : 'Add a new billboard'
    const toastMessage = initialData ? 'Billboard updated' : 'Billboard created'
    const action = initialData ? 'Save changes' : 'Create'

    const [open,setOpen] = useState(false)
    const [loading,setLoading] = useState(false)
    const [date, setDate] = React.useState<Date>()
    const [resumeLink,setResumeLink] = useState<string>()
    const [coverLink,setCoverLink] = useState<string>()

    const form = useForm<JobFormValues>({
        // resolver:zodResolver(formSchema),
        defaultValues:initialData || {
            company: "" ,
            status: "" ,
            position: '',
            link: '',
            resume: '',
            coverLetter: '',
            salary: '',
            location: '',
            dataApplied:date,
        } as any
    })
    useEffect(() => {
        setResumeLink(linkToResume)
        setCoverLink(linkToCoverLetter)
    }, [linkToResume,linkToCoverLetter]);

    const onSubmit = async (data:JobFormValues) =>{
        try {
            setLoading(true)
            const formattedData = {
                company: data.company ,
                status: data.status ,
                position: data.position,
                link: data.link,
                resume: resumeLink,
                coverLetter: coverLink,
                salary: data.salary,
                location: data.location,
                dataApplied:data.dataApplied
            }
            if(initialData){
                await axios.patch(`/api/${params.jobId}/jobTracker/${params.jobTrackerId}`,formattedData)
            }else {
                await axios.post(`/api/${params.jobId}/jobTracker`,formattedData)
            }
            router.refresh()
            router.push(`/${params.jobId}/jobTracker`)
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
            await axios.delete(`/api/${params.jobId}/jobTracker/${params.jobTrackerId}`)
            router.refresh()
            router.push(`/${params.jobId}/jobTracker`)
            toast.success('Billboard deleted')
        }catch (e) {
            toast.error('Make sure you removed all categories using this billboard first.')
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
                            name='resume'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Resume</FormLabel>
                                    {
                                        field.value &&
                                        <FormControl>
                                            <div>
                                                <Link href={field.value as string} target={'_blank'}>Link to your resume</Link>
                                            </div>
                                        </FormControl>
                                    }
                                    <MultiFileDropzoneUsage name={'resume'} />
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className={'grid grid-cols-3 gap-8'}>
                        <FormField
                            control={form.control}
                            name='coverLetter'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Cover Letter</FormLabel>
                                    {
                                        field.value &&
                                        <FormControl>
                                            <div>
                                                <Link href={field.value as string} target={'_blank'}>Link to your cover letter</Link>
                                            </div>
                                        </FormControl>
                                    }
                                    <MultiFileDropzoneUsage name={'coverLetter'} />
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
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
                            name='position'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Position</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder={'Position'} {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className={'grid grid-cols-3 gap-8'}>
                        <FormField
                            control={form.control}
                            name='salary'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Salary</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder={'Salary'} {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className={'grid grid-cols-3 gap-8'}>
                        <FormField
                            control={form.control}
                            name='status'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Applied">Applied</SelectItem>
                                                <SelectItem value="Interview">Interview</SelectItem>
                                                <SelectItem value="Offer">Offer</SelectItem>
                                                <SelectItem value="Rejected">Rejected</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className={'grid grid-cols-3 gap-8'}>
                        <FormField
                            control={form.control}
                            name='link'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Link</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder={'Link'} {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className={'grid grid-cols-3 gap-8'}>
                        <FormField
                            control={form.control}
                            name='location'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder={'Location'} {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className={'grid grid-cols-3 gap-8'}>
                        <FormField
                            control={form.control}
                            name="dataApplied"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date of applied</FormLabel>
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
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
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