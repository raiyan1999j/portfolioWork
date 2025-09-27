import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";
import { refactor } from "@/lib/cloudinaryhelper";

type CategoryType = {
    title: string | null
}

const prisma = new PrismaClient();

export async function POST(req:NextRequest){
    const formData = await req.formData();
    const retrieve = [...formData.entries()];

    const refactorData = refactor(retrieve) as CategoryType;

    try{
        await prisma.category.create({
            data:{
                title: refactorData.title
            }
        });

        return NextResponse.json({message:"category added"},{status:200});
    }catch(error){
        return NextResponse.json({message:"something went worng"});
    }
}