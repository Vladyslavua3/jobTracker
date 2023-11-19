import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";



export async function GET(
    _req:Request,
    {params} : {params:{scheduleId:string}}
) {
    try{

        if(!params.scheduleId){
            return new NextResponse('Schedule id is required',{status:400})
        }


        const schedule = await prismadb.scheduleTable.findUnique({
            where:{
                id:params.scheduleId,
            },
        })

        return NextResponse.json(schedule)

    }catch (e){
        console.log('[SCHEDULE_GET]',e)
        return new NextResponse('Internal error',{status:500})
    }
}


export async function PATCH(
    req:Request,
    {params} : {params:{jobId:string,scheduleId:string}}
) {
    try{
        const {userId} = auth()
        const body = await req.json()

        const {company,dataInterview} = body

        if(!userId) {
            return new NextResponse('Unauthenticated',{status:401})
        }

        if(!company) {
            return new NextResponse('Company is required' , {status:400})
        }


        if(!params.scheduleId){
            return new NextResponse('Schedule id is required',{status:400})
        }

        const storeByUserId = await prismadb.store.findFirst({
            where:{
                id:params.jobId,
                userId
            }
        })

        if(!storeByUserId){
            return new NextResponse('Unauthorized',{status:403})
        }


        const schedule = await prismadb.scheduleTable.updateMany({
            where:{
                id:params.scheduleId,
            },
            data:{
                company,dataInterview
            }
        })

        return NextResponse.json(schedule)

    }catch (e){
        console.log('[SCHEDULE_PATCH]',e)
        return new NextResponse('Internal error',{status:500})
    }
}


export async function DELETE(
    _req:Request,
    {params} : {params:{jobId:string,scheduleId:string}}
) {
    try{
        const {userId} = auth()

        if(!userId) {
            return new NextResponse('Unauthenticated',{status:401})
        }

        if(!params.scheduleId){
            return new NextResponse('Schedule id is required',{status:400})
        }

        const storeByUserId = await prismadb.store.findFirst({
            where:{
                id:params.jobId,
                userId
            }
        })

        if(!storeByUserId){
            return new NextResponse('Unauthorized',{status:403})
        }

        const schedule = await prismadb.scheduleTable.deleteMany({
            where:{
                id:params.scheduleId,
            },
        })

        return NextResponse.json(schedule)

    }catch (e){
        console.log('[SCHEDULE_DELETE]',e)
        return new NextResponse('Internal error',{status:500})
    }
}

