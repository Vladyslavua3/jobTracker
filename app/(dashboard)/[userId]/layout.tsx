import {auth} from "@clerk/nextjs";
import {redirect} from 'next/navigation'
import React, {ReactNode} from "react";
// import prismadb from "@/lib/prismadb";
import Navbar from "@/components/navbar";

export default async function DashboardLayout({
                                                  children,
                                                  params
                                              }:{
    children:ReactNode;
    params:{storeId:string}
}){
    const {userId} = auth()

    if(!userId){
        redirect('/sign-in')
    }


    return (
        <>
            <Navbar/>
            {children}
        </>
    )

}