"use client"

import FullCalendar  from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import {DateSelectArg, EventApi, EventClickArg, formatDate} from "@fullcalendar/core";
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Typography,
    useTheme
} from "@mui/material";
import {FC, SetStateAction, useCallback, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {useParams, useRouter} from "next/navigation";
import * as z from "zod";
import {ScheduleColumn} from "@/app/(dashboard)/[jobId]/(routes)/schedule/components/columns";

const formSchema = z.object({
    company: z.string().min(1),
    dataInterview: z.string()
})

type ScheduleFormValues = z.infer<typeof formSchema>

interface CalendarClientProps{
    data:ScheduleColumn[]
}

const CustomCalendar:FC<CalendarClientProps> = ({data}) => {

    const [currentEvents,setCurrentEvents]  = useState<EventApi[]>()
    const router = useRouter()
    const params = useParams()

    const onEvent = async (data:ScheduleFormValues) =>{
        try {
            await axios.post(`/api/${params.jobId}/schedule`,data)
            router.refresh()
            router.push(`/${params.jobId}/schedule`)
            toast.success('yeeehu')
        }catch (e) {
            toast.error('Something went wrong')
        }
    }

    const initValues = data.map(event => ({
        id:event.id,title:event.company,date:event.dataInterview
    }))


    const handleDateClick = async (selected:DateSelectArg) => {
        const title = prompt('Please enter a new title')
        const calendarApi = selected.view.calendar
        calendarApi.unselect()
        console.log(selected.startStr)
        if(title) {
            await onEvent({
                company:title,
                dataInterview:selected.startStr
            })
            calendarApi.addEvent({
                id:`${selected.startStr} - ${title}`,
                title,
                start:selected.startStr,
                end:selected.endStr,
                allDay:selected.allDay
            })
        }
    }

    const handleEventClick = (selected:EventClickArg) => {
       if( window.confirm(`Are you sure want to delete the event '${selected.event.title}'`)){
           selected.event.remove()
       }
    }

    const handleEvents = useCallback(
        (events: SetStateAction<EventApi[] | undefined>) => setCurrentEvents(events),
        []
    );


    return (
        <Box m={'20px'}>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Box flex={'1 1 20%'}  p={'15px'} borderRadius={'4px'}>
                    <Typography variant={'h5'}>Interview</Typography>
                    <List>
                        {currentEvents?.map((event:EventApi) => (
                            <ListItem
                                key={event.id}
                                sx={{backgroundColor:'slategray',margin:'10px 0'}}
                            >
                                <ListItemText
                                primary={event.title}
                                secondary={
                                    <Typography>
                                        {formatDate(event.start as Date,{
                                            year:'numeric',
                                            month:'short',
                                            day:'numeric'
                                        })}
                                    </Typography>
                                }
                               />
                            </ListItem>
                        ))}
                    </List>
            </Box>
                <Box flex={'1 1 100%'} ml={'15px'}>
                    <FullCalendar
                        height={'75vh'}
                        plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin,listPlugin]}
                        headerToolbar={{
                            left:'prev,next,today',
                            center:'title',
                            right:'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
                        }}
                        initialView={'dayGridMonth'}
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        select={handleDateClick}
                        eventClick={handleEventClick}
                        eventsSet={handleEvents}
                        initialEvents={initValues}
                    />
                </Box>
        </Box>
        </Box>
    )

}

export default CustomCalendar