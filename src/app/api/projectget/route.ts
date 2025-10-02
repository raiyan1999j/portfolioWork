import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();

export async function GET(req:NextRequest) {
    const {searchParams} = new URL(req.url);
    const categoryId = searchParams.get("parenttable");

    const userData = await prisma.project.findMany({
        where:{
            parenttable: categoryId
        },
        
        orderBy:{
            created_at:"asc"
        }
    });

    return NextResponse.json(userData);
}