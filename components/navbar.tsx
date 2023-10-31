
import React from 'react';
import {auth, UserButton} from "@clerk/nextjs";
import {MainNav} from "@/components/main-nav";
import {redirect} from "next/navigation";

const Navbar = async () => {

    const {userId,user} = auth()

    if(!userId) return redirect("/sign-in")


    return (
        <div className={'border-b'}>
            <div className={'flex h-16 items-center px-4'}>
                Active User : {userId}
                <MainNav className={'mx-6'}/>
                <div className={'ml-auto flex items-center space-x-4'}>
                    <UserButton afterSignOutUrl={'/'}/>
                </div>
            </div>
        </div>
    );
};

export default Navbar;