import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();

export async function GET(){
    const userdata = await prisma.shortintro.findMany();

    return NextResponse.json({data:userdata})
}