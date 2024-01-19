import React from 'react';
import {auth, UserButton} from "@clerk/nextjs";
import {MainNav} from "@/components/main-nav";
import {redirect} from "next/navigation";
import prismadb from "@/lib/prismadb";
import JobSwitcher from "@/components/job-switcher";
import ThemeSwitcher from "@/components/ui/themeSwitcher";

const Navbar = async () => {

    const {userId,user} = auth()

    if(!userId) return redirect("/sign-in")

    const stores = await prismadb.store.findMany({
        where:{
            userId
        }
    })

    return (
        <div className={'border-b'}>
            <div className={'flex h-16 items-center px-4'}>
                <JobSwitcher items={stores}/>
                <MainNav className={'mx-6'}/>
                <div className={'ml-auto flex items-center space-x-4 gap-5'}>
                    <ThemeSwitcher/>
                    <UserButton afterSignOutUrl={'/'}/>
                </div>
            </div>
        </div>
    );
};

export default Navbar;