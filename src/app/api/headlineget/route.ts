import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();

export async function GET(){
    const getData = await prisma.headline.findMany();

    return NextResponse.json(getData);
}