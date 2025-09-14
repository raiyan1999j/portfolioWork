import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";
import cloudinary from "@/lib/cloudinaryconfig";

const prisma = new PrismaClient();

export async function DELETE(req:NextRequest){
    const body = await req.json();
    const {tableId,imgId} = body;

    await cloudinary.uploader.destroy(imgId);

    try{
        await prisma.userrole.delete({
            where:{
                id: tableId
            }
        });

        return NextResponse.json({message:"items removed"},{status:200});
    }catch(error){
        return NextResponse.json(error);
    }
}