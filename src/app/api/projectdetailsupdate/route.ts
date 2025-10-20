import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";
import { imgUploadArray } from "@/lib/cloudinaryhelper";

type ImgContainerType = {
    current: File | null,
    previous: string | null
}

type DetailsType = {
    id:string,
    imgcontainer: ImgContainerType[],
    description : string | null,
    title : string | null,
    github: string | null,
    live : string | null,
    parenttable: string
}

const prisma = new PrismaClient();

export async function PUT(req:NextRequest){
    const formData = await req.formData();
    const retrieve = Object.fromEntries(formData);
    const wrap: Partial<DetailsType> = {};
    
    const container = Object.entries(retrieve).reduce((acc,[key,value])=>{
        const match = key.match(/[a-zA-Z]+|\d+/g);
            
        if(match && match[1]){
            const [prop,indexStr] = match;
            const index = Number(indexStr)
    
            acc[index] = {...acc[index],[prop]:value == "" ? null: value}
        }else{
            (wrap as any)[key] = value;
        }
    
        return acc;
        },[] as ImgContainerType[]);
    
        wrap.imgcontainer = container;

        const imgcontainer = await imgUploadArray(wrap.imgcontainer);
    
        try{
            await prisma.project.update({
                where:{
                    id: wrap.id
                },
                data:{
                    imgcontainer: imgcontainer,
                    description:wrap.description,
                    title:wrap.title,
                    github:wrap.github,
                    live:wrap.live,
                    parenttable:wrap.parenttable
                }
            });

        return NextResponse.json({message:"project udpated"},{status:200});
        }catch(error){
            return NextResponse.json({message:"something went wrong"})
        } 
}