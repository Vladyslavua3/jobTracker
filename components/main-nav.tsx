'use client'
import React from 'react';
import {useParams, usePathname} from "next/navigation";
import Link from "next/link";
import {cn} from "@/lib/utils";

export function MainNav({
    className,
    ...props
                        }:React.HTMLAttributes<HTMLElement>){

    const pathname = usePathname()
    const params = useParams()

    const routes = [
            {
                href:`/${params.jobId}`,
                label:'Overview',
                active: pathname === `/${params.jobId}`
            },
            {
                href:`/${params.jobId}/jobTracker`,
                label:'Job Tracker',
                active: pathname === `/${params.jobId}/jobTracker`
            },
            {
                href:`/${params.jobId}/schedule`,
                label:'Schedule',
                active: pathname === `/${params.jobId}/schedule`
            },
        ]


    return(
       <nav  className={cn("flex items-center space-x-4 lg:space-x-6",className)}>
           {
               routes.map((route)=>(
                   <Link href={route.href} key={route.href} className={cn("text-sm font-medium transition-colors hover:text-primary",route.active ? "text-black dark:text-white" : "text-muted-foreground")}>
                       {route.label}
                   </Link>
               ))
           }
       </nav>
    )
}