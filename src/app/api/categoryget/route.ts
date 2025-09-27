import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();

export async function GET(){
    const userData = await prisma.category.findMany({
        orderBy:{
            created_at:"asc"
        }
    });

    return NextResponse.json({data:userData});
}