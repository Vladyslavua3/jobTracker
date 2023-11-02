import {auth} from "@clerk/nextjs";
import {redirect} from 'next/navigation'
import {ReactNode} from "react";
import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";

export default async function DashboardLayout({
                                                  children,
                                                  params
                                              }:{
    children:ReactNode;
    params:{jobId:string}
}){
    const {userId} = auth()

    if(!userId){
        redirect('/sign-in')
    }


    const store = await prismadb.store.findFirst({
        where:{
            id: params.jobId,
            userId
        }
    })

    if(!store){
        redirect('/')
    }

    return (
        <>
            <Navbar/>
            {children}
        </>
    )

}