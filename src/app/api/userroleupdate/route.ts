import { imageUpload, refactor } from "@/lib/cloudinaryhelper";
import { NextRequest, NextResponse } from "next/server";
import { UserRoleType } from "../userroleadd/route";
import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();

export async function PUT(req:NextRequest){
    const formData = await req.formData();
    const retrieve = [...formData.entries()];
    const currentLogo = formData.get("logo");
    const previousLogo= formData.get("previousLogo");
    
    // helper function helps to rearrange data into actual obj
    const refactorData = refactor(retrieve) as UserRoleType;

    // helper function helps to manage file
    const imageData =await imageUpload(currentLogo,previousLogo);

    refactorData.logo = imageData;

    try{
        await prisma.userrole.update({
            where:{
                id: refactorData.id!
            },
            data:{
                logo:refactorData.logo,
                title:refactorData.title,
                description:refactorData.description
            },
        });

        return NextResponse.json({message:"user role updated"},{status:200})
    }catch(error){
        return NextResponse.json({message:"something went wrong"})
    }
}