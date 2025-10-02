import { NextRequest, NextResponse } from "next/server";
import { RefactorType } from "../shortintroadd/route";
import cloudinary from "@/lib/cloudinaryconfig";
import { PrismaClient } from "../../../../generated/prisma";
import { imageUpload } from "@/lib/cloudinaryhelper";
import { refactor } from "@/lib/helper";

type ExtendRefactor = RefactorType & {
    id: string,
    previouspic: string 
}

const prisma = new PrismaClient();

export async function PUT(req:NextRequest){
    const formData = await req.formData();
    const retrieve = [...formData.entries()];
    const profilepic= formData.get("profilepic");
    const previouspic= formData.get("previouspic") as string;

    // helper function helps to rearrang the data into actual object
    const refactorData= refactor(retrieve,"skills") as ExtendRefactor;
    
    // helper function helps to manage file
    const imgManage = await imageUpload(profilepic,previouspic);

    refactorData.profilepic = imgManage;
    
    try{
        await prisma.shortintro.update({
            where:{id:refactorData.id},
            data:{
                intro: refactorData.intro,
                skills: refactorData.skills ?? undefined,
                bio: refactorData.bio,
                profilepic:refactorData.profilepic
            }
        });

        return NextResponse.json({message:"data updated"},{status:200})
    }catch(error){
        return NextResponse.json({message:"something went wrong"})
    }
}