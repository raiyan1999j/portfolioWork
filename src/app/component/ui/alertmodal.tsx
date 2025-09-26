"use client";
import { InfoProvider } from "@/app/contextprovider/contextprovider"
import { Caprasimo } from "next/font/google";
import { useContext, useEffect, useState } from "react"

const messageType = [
    {
        type:"success",
        color:"#2ecc71"
    },
    {
        type:"info",
        color:"#3498db"
    },
    {
        type:"warning",
        color:"#f9ca24"
    },
    {
        type:"danger",
        color:"#eb4d4b"
    },
    {
        type:"neutral",
        color:"#535c68"
    }
]

const caprasimo = Caprasimo({
    subsets:["latin"],
    weight:["400"]
})

export default function AlertModal(){
    const context = useContext(InfoProvider);

    if(!context) throw new Error("context error");

    const {modalInfo} = context;

    return(
        <>
        <div className="fixed bottom-10 right-[30%] w-[30%]  z-40 flex flex-col gap-y-5">
            {modalInfo.map((items,index)=>{
                return <div className={`${caprasimo.className} capitalize transition-all duration-150 ease-linear py-2.5 px-5 text-white rounded-xl`} style={{backgroundColor:`${messageType.filter(subItems=>subItems.type == items.messageType)[0].color}`}} key={index}>
                        {items.message}
                </div>
            })}
        </div>
        </>
    )
}