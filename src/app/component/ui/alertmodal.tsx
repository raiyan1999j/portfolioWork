"use client";
import { InfoProvider } from "@/app/contextprovider/contextprovider"
import { useContext, useEffect, useState } from "react"

const messageType = [
    {
        type:"success",
        color:"#28a745"
    },
    {
        type:"info",
        color:"#17a2b8"
    },
    {
        type:"warning",
        color:"#ffc107"
    },
    {
        type:"danger",
        color:"#dc3545"
    },
    {
        type:"neutral",
        color:"#6c757d"
    }
]

export default function AlertModal(){
    const context = useContext(InfoProvider);

    if(!context) throw new Error("context error");

    const {modalInfo} = context;

    return(
        <>
        <div className="fixed bottom-0 right-[30%] w-[30%]  z-40 flex flex-col gap-y-5">
            {modalInfo.map((items,index)=>{
                return <div className={`transition-all duration-150 ease-linear py-2.5 px-5 text-white rounded-xl`} style={{backgroundColor:`${messageType.filter(subItems=>subItems.type == items.messageType)[0].color}`}} key={index}>
                        {items.message}
                </div>
            })}
        </div>
        </>
    )
}