import { imgUploadArray } from "@/lib/cloudinaryhelper";
import { refactor } from "@/lib/helper";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";

type DetailsType = {
    imgcontainer: File[] | null,
    description : string | null,
    title : string | null,
    github: string | null,
    live : string | null,
    parenttable: string
}

const prisma = new PrismaClient();

export async function POST(req:NextRequest){
    const formData = await req.formData();
    const retrieve = [...formData.entries()];

    const refactorData = refactor(retrieve,"imgcontainer") as DetailsType;

    const imgcontainer = await imgUploadArray(refactorData.imgcontainer);

    try{
        await prisma.project.create({
            data:{
                imgcontainer:imgcontainer,
                description:refactorData.description,
                title:refactorData.title,
                github:refactorData.github,
                live:refactorData.live,
                parenttable:refactorData.parenttable
            }
        });

        return NextResponse.json({message:"new project added"},{status:200})
    }catch(error){
        return NextResponse.json({message:"something went wrong"})
    }
}