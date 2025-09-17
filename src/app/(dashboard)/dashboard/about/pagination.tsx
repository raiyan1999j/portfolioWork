"use client";
import { Anton, Caprasimo } from "next/font/google";
import { useEffect, useState } from "react";

type PropsType = {
    totalPage : number | null,
    currentPage: number,
    currentPageSelection:(value:number)=>void
}

const pageNumber = [1,2,3,4,5,6,7,8];

const caprasimo = Caprasimo({
    subsets:["latin"],
    weight:['400']
})

const anton = Anton({
    subsets:["latin"],
    weight:["400"]
});

export default function Pagination({totalPage,currentPage,currentPageSelection}:PropsType){
    const [pageArray,setPageArray] = useState<number[]>([]);

    return(
        <>
        <div className="flex flex-row gap-x-5 justify-end w-full mt-10">
            {
                [...Array(totalPage)].map((_,index)=>{
                    return <button type="button" className={`${caprasimo.className} py-1.5 px-2.5 border border-[var(--darkDashTxt,rgba(0,0,0,0.2))] rounded-lg text-[var(--darkDashTxt,rgba(0,0,0,0.8))] transition-all duration-150 ease-linear hover:bg-black/20 ${currentPage === (index + 1)?"bg-black/20 text-white":"bg-transparent text-[var(--darkDashTxt,rgba(0,0,0,0.8))]"}`} onClick={()=>{currentPageSelection(index + 1)}} key={index}>{index+1}</button>
                })
            }
        </div>
        </>
    )
}