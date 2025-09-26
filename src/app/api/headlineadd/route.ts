import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";
import { refactor } from "@/lib/helper";

export type HeadlineType = {
    id: string | null,
    mainheadline: string | null,
    subheadline: string | null
}

const prisma = new PrismaClient();

export async function POST(req:NextRequest){
    const formData = await req.formData();
    const retrieve = [...formData.entries()];

    // helper function helps to rearrange data into actual obj
    const refactorData = refactor(retrieve) as HeadlineType;

    try{
        await prisma.headline.create({
            data: {
                mainheadline: refactorData.mainheadline,
                subheadline : refactorData.subheadline
            }
        });

        return NextResponse.json({message:"headline added"},{status:200});
    }catch(error){
        return NextResponse.json({message:"something went wrong"});
    }
}