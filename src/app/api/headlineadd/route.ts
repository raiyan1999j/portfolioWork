import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";

type HeadlineTyps = {
    mainHeadline: string | null,
    subHeadline: string | null
}

const prisma = new PrismaClient();

export async function POST(req:NextRequest){
    const formData = await req.formData();
    const retrieve = [...formData.entries()];
    const refactor = retrieve.reduce((acc,current)=>{
        const [key,value] = current;
        
        (acc as any)[key] = value;

        return acc;
    },{} as HeadlineTyps);


    try{
        await prisma.headline.create({
            data: {
                mainheadline: refactor.mainHeadline,
                subheadline : refactor.subHeadline
            }
        });

        return NextResponse.json({message:"headline added"},{status:200});
    }catch(error){
        return NextResponse.json(error);
    }
}