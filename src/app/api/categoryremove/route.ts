import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";
import { removeImageArray } from "@/lib/cloudinaryhelper";

const prisma = new PrismaClient();

export async function DELETE(req:NextRequest){
    const {searchParams} = new URL(req.url);
    const tableId = searchParams.get("tableId");

    const collectAllImg = await prisma.category.findUnique({
        where:{
            id: tableId?.toString()
        },
        include:{
            project:{
                select:{
                    imgcontainer:true
                }
            }
        }
    });

    const container = collectAllImg?.project?.flatMap(items=>items.imgcontainer);

    try{
        if(container){
            await removeImageArray(container)
        }

        await prisma.category.delete({
            where:{
                id:tableId?.toString()
            }
        })

        return NextResponse.json({message:"category removed"},{status:200});
    }catch(error){
        return NextResponse.json({message:"something went wrog"})
    }
}