import { NextRequest, NextResponse } from "next/server";
import { HeadlineType } from "../headlineadd/route";
import { PrismaClient } from "../../../../generated/prisma";
import { refactor } from "@/lib/helper";

const prisma = new PrismaClient();

export async function PUT(req:NextRequest){
    const formData = await req.formData();
    const retrieve = [...formData.entries()];
    
    // helper function helps to rearrange data into actual obj
    const refactorData = refactor(retrieve,null) as HeadlineType;

    try{
        await prisma.headline.update({
            where:{
                id:refactorData.id!
            },
            data:{
                mainheadline: refactorData.mainheadline,
                subheadline: refactorData.subheadline
            }
        });

        return NextResponse.json({message:"update successfully"},{status:200})
    }catch(error){
        return NextResponse.json({message:"something went wrong"});
    }
}