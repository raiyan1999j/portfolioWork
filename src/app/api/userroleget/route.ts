import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma"

const prisma = new PrismaClient();

export async function GET(req:NextRequest){
    const {searchParams} = new URL(req.url);
    const skip = parseInt(searchParams.get("skip")!);
    const limit= 5;

    const userData = await prisma.userrole.findMany({
        skip,
        take:limit,
        orderBy:{
            create_at:"desc"
        }
    });

    const totalData = await prisma.userrole.count();
    const totalPage = Math.ceil(totalData/5);

    return NextResponse.json({userData,totalPage});
}