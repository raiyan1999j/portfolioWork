import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";
import cloudinary from "@/lib/cloudinaryconfig";

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

    // reformate the data in typical object
    const refactor = retrieve.reduce((acc,current)=>{
        const [key,value] = current;

        if((/\d/).test(key)){
            if(!acc.skills) acc.skills = [];

            if(typeof value == "string"){
                acc.skills.push(value.toString())
            }
        }else{
            (acc as any)[key] = value.toString();
        }

        return acc;
    },{} as RefactorType);

    if(profilepic instanceof File){
        const bytes = await profilepic.arrayBuffer();
        const buffer= Buffer.from(bytes);

        const upload: any = await new Promise((resolve,reject)=>{
            const stream = cloudinary.uploader.upload_stream(
                {folder:"portfolio"},
                (error,result)=>{
                    if(error) reject(error);
                    
                    else resolve(result)
                }
            );

            stream.end(buffer)
        });

        refactor.profilepic = (upload.public_id).toString()
    }else{
        refactor.profilepic = null;
    }

    try{
        await prisma.shortintro.create({
            data: {
                intro : refactor.intro,
                skills: refactor.skills ?? undefined,
                bio : refactor.bio,
                profilepic : refactor.profilepic
            }
        });

        return NextResponse.json({message:"data added"},{status:200});
    }catch(error){
        return NextResponse.json(error)
    }
}