import {ReactNode} from "react";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";

export default async function SetupLayout({
                                              children
                                          }:{
    children:ReactNode
}){
    const {userId} = auth()


    if(!userId) return redirect('/sign-in')

    if(userId) return redirect(`/${userId}`)

    return (
        <>
            {children}
        </>
    )
}