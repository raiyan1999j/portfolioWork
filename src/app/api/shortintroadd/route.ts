import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";
import cloudinary from "@/lib/cloudinaryconfig";
import { imageUpload, refactor } from "@/lib/helper";

export type RefactorType = {
    intro: string | null,
    skills: string[] | null,
    bio: string | null,
    profilepic: string | null
}

const prisma = new PrismaClient();

export async function POST(req:NextRequest){
    const formData = await req.formData();
    const retrieve = [...formData.entries()];
    const profilepic = formData.get("profilepic");

    // helper function helps to rearrange data into actual obj
    const refactorData= refactor(retrieve) as RefactorType;

    // helper function helps to  manage file 
    const imgPublicId= await imageUpload(profilepic,null);

    refactorData.profilepic = imgPublicId.toString();

    try{
        await prisma.shortintro.create({
            data: {
                intro : refactorData.intro,
                skills: refactorData.skills ?? undefined,
                bio : refactorData.bio,
                profilepic : refactorData.profilepic
            }
        });

        return NextResponse.json({message:"data added"},{status:200});
    }catch(error){
        return NextResponse.json({message:"something went wrong"})
    }
}