import React from "react";
import prismadb from "@/lib/prismadb";

interface DashboardPropsType {
    params:{jobId:string}
}


const DashBoardPage:React.FC<DashboardPropsType> = async ({params}) =>{

    const store = await prismadb.store.findFirst({
        where:{
            id:params.jobId
        }
    })


    return(
        <div>
            Active Store : {store?.name}
        </div>
    )
}

export default DashBoardPage