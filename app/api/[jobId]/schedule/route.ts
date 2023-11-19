import {auth} from "@clerk/nextjs";
import {NextResponse} from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req:Request, {params}:{params:{jobId:string}}){
    try {
        const {userId} = auth();
        const body = await req.json()

        const {company,dataInterview} = body

        if(!userId){
            return new NextResponse('Unauthorized',{status:401});
        }

        if(!company){
            return new NextResponse('Company is required',{status:400});
        }

        if(!params.jobId){
            return new NextResponse('Job id is required',{status:400})
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

        const schedule = await prismadb.scheduleTable.create({
            data:{
                company,dataInterview,
                jobId: params.jobId
            }
        })

        return NextResponse.json(schedule)
    }catch (e) {
        console.log('[SCHEDULE_POST]',e)
        return new NextResponse("Internal error",{status:500})
    }
}


export async function GET(req:Request, {params}:{params:{jobId:string}}){
    try {

        if (!params.jobId) {
            return new NextResponse('Job id is required', {status: 400})
        }


        const schedule = await prismadb.scheduleTable.findMany({
            where:{
                jobId:params.jobId
            }
        })

        return NextResponse.json(schedule)
    }catch (e) {
        console.log('[SCHEDULE_GET]',e)
        return new NextResponse("Internal error",{status:500})
    }
}