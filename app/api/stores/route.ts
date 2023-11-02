import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function POST(req:Request){
    try {
        const {userId} = auth();
        const body = await req.json()

        const {name} = body

        if(!userId){
            return new NextResponse('Unauthorized',{status:401});
        }

        if(!name){
            return new NextResponse('Name is required',{status:400});
        }

        const store = await prismadb.store.create({
            data:{
                name,
                userId
            }
        })

        return NextResponse.json(store)
    }catch (e) {
        console.log('[STORES_POST]',e)
        return new NextResponse("Internal error",{status:500})
    }
}


export async function GET(req:Request, {params}:{params:{jobId:string}}){
    try {

        if (!params.jobId) {
            return new NextResponse('Job id is required', {status: 400})
        }


        const userJobInfo = await prismadb.store.findMany({
            where:{
                userId:params.jobId
            }
        })

        return NextResponse.json(userJobInfo)
    }catch (e) {
        console.log('[USERINFO_GET]',e)
        return new NextResponse("Internal error",{status:500})
    }
}