import cloudinary from "@/lib/cloudinaryconfig";
import { imageUpload } from "@/lib/cloudinaryhelper";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";
import { refactor } from "@/lib/helper";

export type UserRoleType = {
    id: string | null,
    logo: string | null,
    previousLogo:string|null,
    title: string | null,
    description: string | null
}
const prisma = new PrismaClient();

export async function POST(req:NextRequest){
    const formData = await req.formData();
    const retrieve = [...formData.entries()];
    const logoFile = formData.get("logo");

    // helper function helps to rearrange data into actual obj
    const refactorData = refactor(retrieve,null) as UserRoleType;

    // helper function helps to manage file
    if(logoFile){
        const imgPublicId = await imageUpload(logoFile,null);

        refactorData.logo = imgPublicId.toString();
    }
    
    try{
        await prisma.userrole.create({
            data:{
                logo: refactorData.logo,
                title: refactorData.title,
                description: refactorData.description
            }
        });

        return NextResponse.json({message:"new role added"},{status:200})
    }catch(error){
        return NextResponse.json({message:"something went wrong"})
    }
}