import { NextRequest, NextResponse } from "next/server";
import { RefactorType } from "../shortintroadd/route";
import cloudinary from "@/lib/cloudinaryconfig";
import { PrismaClient } from "../../../../generated/prisma";

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
    },{} as ExtendRefactor);

    // check whether profilepic is null or notz

    // if it null then there is no new file or update image

    // if it's not null then remove the old image by public_id and add add the new one and get the public_id and update the profilepic column data

    if(profilepic instanceof File){
        const bytes = await profilepic.arrayBuffer();
        const buffer= Buffer.from(bytes);
        // remove the old file 
        if(previouspic){
            await cloudinary.uploader.destroy(previouspic)
        }
        // upload the new file
        const upload:any = await new Promise((resolve,reject)=>{
            const stream = cloudinary.uploader.upload_stream(
                {folder:"portfolio"},
                (error,result)=>{
                    if(error) reject(error);

                    else resolve(result)
                }
            );

            stream.end(buffer)
        });

        refactor.profilepic = (upload.public_id).toString();
    }else{
        refactor.profilepic = previouspic
    }

    try{
        await prisma.shortintro.update({
            where:{id:refactor.id},
            data:{
                intro: refactor.intro,
                skills: refactor.skills ?? undefined,
                bio: refactor.bio,
                profilepic:refactor.profilepic
            }
        })
    }catch(error){
        return NextResponse.json({error})
    }
}