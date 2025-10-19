import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();

export async function GET(req:NextRequest){
    const {searchParams} = new URL(req.url);
    const tableId = searchParams.get("tableId");

    try{
        const data = await prisma.project.findUnique({
        where:{
            id: tableId?.toString()
        }
        });

        return NextResponse.json({data},{status:200});
    }catch(error){
        return NextResponse.json({message:"something went wrong"})
    }
    
}