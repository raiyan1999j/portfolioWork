import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";
import { removeImageArray } from "@/lib/cloudinaryhelper";

const prisma = new PrismaClient();

export async function DELETE(req:NextRequest){
    const {searchParams} = new URL(req.url);
    const tableId = searchParams.get("tableId");

    const relatedImg = await prisma.project.findUnique({
        where:{
            id: tableId?.toString()
        },
        select:{
            imgcontainer:true
        }
    });

    try{
        if(relatedImg?.imgcontainer){
            await removeImageArray(relatedImg.imgcontainer)
        }

        await prisma.project.delete({
            where:{
                id:tableId?.toString()
            }
        });

        return NextResponse.json({message:"project removed"},{status:200})
    }catch(error){
        return NextResponse.json({message:"something went wrong"})
    }
}