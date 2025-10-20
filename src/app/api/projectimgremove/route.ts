import { refactor } from "@/lib/helper";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";
import cloudinary from "@/lib/cloudinaryconfig";

const prisma = new PrismaClient();

export async function PUT(req:NextRequest){
    const {searchParams} = new URL(req.url);
    const id = searchParams.get("indexNum");
    const tableId = searchParams.get("tableId");
    const formData = await req.formData();
    const retrieve = [...formData.entries()];
    const refactorData = refactor(retrieve,"imgcontainer");

    const checkRefactorData = Object.keys(refactorData).length === 0 ? [] : refactorData.imgcontainer;
    
    try{
        if(id){
            await cloudinary.uploader.destroy(id)
        }

        await prisma.project.update({
            where:{
                id: tableId?.toString()
            },
            data:{
                imgcontainer:checkRefactorData
            }
        });

        return NextResponse.json({message:"image removed"},{status:200});
    }catch(error){
        return NextResponse.json({message:error})
    }
}