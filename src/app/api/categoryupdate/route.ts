import { refactor } from "@/lib/cloudinaryhelper";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";

type CategoryData = {
    id:string,
    title:string | null
}

const prisma = new PrismaClient();

export async function PUT(req:NextRequest){
    const formData = await req.formData();
    const retrieve = [...formData.entries()];

    const refactorData = refactor(retrieve) as CategoryData;

    try{
        await prisma.category.update({
            where:{
                id: refactorData.id
            },
            data:{
                title: refactorData.title
            }
        });

        return NextResponse.json({message:"title updated"},{status:200});
    }catch(error){
        return NextResponse.json({message:"something went wrong"});
    }
}