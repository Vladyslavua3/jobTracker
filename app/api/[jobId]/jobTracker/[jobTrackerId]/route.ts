import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";



export async function GET(
    _req:Request,
    {params} : {params:{jobTrackerId:string}}
) {
    try{

        if(!params.jobTrackerId){
            return new NextResponse('jobTracker id is required',{status:400})
        }


        const job = await prismadb.jobsTable.findUnique({
            where:{
                id:params.jobTrackerId,
            },
        })

        return NextResponse.json(job)

    }catch (e){
        console.log('[JOB_GET]',e)
        return new NextResponse('Internal error',{status:500})
    }
}


export async function PATCH(
    req:Request,
    {params} : {params:{jobId:string,jobTrackerId:string}}
) {
    try{
        const {userId} = auth()
        const body = await req.json()

        const {position,company,status,salary,location,dataApplied,link,resume,coverLetter} = body

        if(!userId) {
            return new NextResponse('Unauthenticated',{status:401})
        }

        if(!company) {
            return new NextResponse('Company is required' , {status:400})
        }


        if(!params.jobTrackerId){
            return new NextResponse('Job Tracker id is required',{status:400})
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


        const job = await prismadb.jobsTable.updateMany({
            where:{
                id:params.jobTrackerId,
            },
            data:{
                position,company,status,salary,location,dataApplied,link,resume,coverLetter
            }
        })

        return NextResponse.json(job)

    }catch (e){
        console.log('[JOB_PATCH]',e)
        return new NextResponse('Internal error',{status:500})
    }
}


export async function DELETE(
    _req:Request,
    {params} : {params:{jobId:string,jobTrackerId:string}}
) {
    try{
        const {userId} = auth()

        if(!userId) {
            return new NextResponse('Unauthenticated',{status:401})
        }

        if(!params.jobTrackerId){
            return new NextResponse('Job Tracker id is required',{status:400})
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

        const job = await prismadb.jobsTable.deleteMany({
            where:{
                id:params.jobTrackerId,
            },
        })

        return NextResponse.json(job)

    }catch (e){
        console.log('[JOB_DELETE]',e)
        return new NextResponse('Internal error',{status:500})
    }
}

