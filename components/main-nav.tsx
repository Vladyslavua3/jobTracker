'use client'
import React from 'react';
import {useParams, usePathname} from "next/navigation";
import Link from "next/link";

export function MainNav({
    className,
    ...props
                        }:React.HTMLAttributes<HTMLElement>){

    const pathname = usePathname()
    const params = useParams()

    const routes = [
            {
                href:`/${params.storeId}`,
                label:'Overview',
                active: pathname === `/${params.storeId}`
            },
        ]


    return(
       <nav>
           {
               routes.map((route)=>(
                   <Link href={route.href} key={route.href}>
                       {route.label}
                   </Link>
               ))
           }
       </nav>
    )
}