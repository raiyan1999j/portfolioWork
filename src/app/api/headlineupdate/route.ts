import { NextRequest, NextResponse } from "next/server";
import { HeadlineType } from "../headlineadd/route";
import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();

export async function PUT(req:NextRequest){
    const formData = await req.formData();
    const retrieve = [...formData.entries()];
    const refactor = retrieve.reduce((acc,current)=>{
        const [key,value] = current;

        (acc as any)[key] = value;

        return acc;
    },{} as HeadlineType);

    try{
        await prisma.headline.update({
            where:{
                id:refactor.id!
            },
            data:{
                mainheadline: refactor.mainheadline,
                subheadline: refactor.subheadline
            }
        });

        return NextResponse.json({message:"update successfully"},{status:200})
    }catch(error){
        return NextResponse.json(error);
    }
}