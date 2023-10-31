import React from "react";

interface DashboardPropsType {
    params:{userId:string}
}


const DashBoardPage:React.FC<DashboardPropsType> = async ({params}) =>{


    return(
        <div>
            Hello
        </div>
    )
}

export default DashBoardPage