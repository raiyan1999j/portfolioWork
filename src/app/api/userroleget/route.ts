import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma"

const prisma = new PrismaClient();

export async function GET(){
    const userData = await prisma.userrole.findMany();

    return NextResponse.json(userData);
}