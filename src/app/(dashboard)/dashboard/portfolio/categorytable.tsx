"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Anton, Caprasimo, Jost } from "next/font/google";
import DashLoading from "../../loading";
import { useContext, useEffect } from "react";
import { InfoProvider } from "@/app/contextprovider/contextprovider";
import { AiFillEdit } from "react-icons/ai";
import { MdOutlineAssignment, MdOutlineDelete } from "react-icons/md";

type CategoryData = {
    id:string,
    title: string | null
}

const caprasimo = Caprasimo({
    subsets:["latin"],
    weight:['400']
})

const anton = Anton({
    subsets:["latin"],
    weight:["400"]
});

const jost = Jost({
    subsets:["latin"]
})

export default function CategroyTable(){
    const context = useContext(InfoProvider);

    if(!context) throw new Error("context error");

    const {setContentLoader} = context;

    const {isLoading,isError,data} = useQuery<CategoryData[]>({
        queryKey:["categoryData"],
        queryFn:async()=>{
            const getData = await axios("/api/categoryget");
            const response= getData.data.data;

            setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,partialLoad:false}}));

            return response;
        }
    });
    
    useEffect(()=>{
        setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,partialLoad:true}}));
    },[])
    return(
        <>
        <div className="mt-20">
            <h2 className={`${caprasimo.className} text-6xl capitalize text-[var(--darkDashTxt,rgba(0,0,0,0.8))] relative after:absolute after:h-2 after:w-[20%] after:bg-rose-500 after:bottom-[-10px] after:left-0`}>
                category table
            </h2>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-x-10">
            <div className="w-full rounded-xl">
                {
                    isLoading?
                    <div className="relative h-[300px] w-full">
                        <DashLoading/>
                    </div>:
                    isError?
                    <div>
                        <h2>
                            error message will update soon
                        </h2>
                    </div>:
                    data?
                    <table className="w-full border border-[#2ecc71]">
                    <thead className={`${anton.className} uppercase text-white bg-[#2ecc71]`}>
                        <tr>
                            <th className="py-2.5 w-[20%]">
                                serial
                            </th>
                            <th className="py-2.5 w-[40%]">
                                title
                            </th>
                            <th className="py-2 w-[40%]">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((items,index)=>{
                            return <tr key={index} className={`${jost.className} text-[#2ecc71]/80 font-medium even:bg-[#2ecc71]/20 transition-all duration-150 ease-linear hover:text-[#27ae60] hover:font-bold`}>
                                <td className="py-2.5 text-center">
                                    {index + 1}
                                </td>
                                <td className="py-2.5 text-center">
                                    {items.title}
                                </td>
                                <td className="flex flex-row justify-center items-center w-full py-2.5 gap-x-10 text-2xl text-gray-500">
                                    <button className="transition-all duration-150 ease-linear hover:text-[#27ae60] hover:scale-125">
                                        <AiFillEdit />
                                    </button>

                                    <button className="transition-all duration-150 ease-linear hover:text-[#27ae60] hover:scale-125">
                                        <MdOutlineAssignment />
                                    </button>

                                    <button className="transition-all duration-150 ease-linear hover:text-[#e74c3c] hover:scale-125">
                                        <MdOutlineDelete />
                                    </button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>:
                null
                }
                
            </div>

            <div>
        
            </div>
        </div>
        </>
    )
}