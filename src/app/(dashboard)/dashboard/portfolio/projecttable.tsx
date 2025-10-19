"use client";
import { InfoProvider } from "@/app/contextprovider/contextprovider";
import { Anton, Jost } from "next/font/google";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { IoIosEye } from "react-icons/io";

type ProjectInfoType = {
    id:string,
    imgcontainer: string[],
    description: string | null,
    title: string | null,
    github: string | null,
    live: string | null,
    parenttable: string
}

type ProjectDataType = {
    projectInfo:ProjectInfoType[];
}   

const anton = Anton({
    subsets:["latin"],
    weight:['400']
})

const jost = Jost({
    subsets:["latin"]
})

export default function ProjectTable({projectInfo}:ProjectDataType){
    const context = useContext(InfoProvider);

    if(!context) throw new Error("context error");

    const {setPageLoader} = context;

    const router = useRouter();

    const navigatePage=(idNum:string)=>{
        const projectData = {
            type:"childtable",
            id:idNum
        }

        const searchParams = new URLSearchParams({
            data : JSON.stringify(projectData)
        });

        router.push(`/dashboard/projectview/details?${searchParams}`);

        setPageLoader(prev=>({...prev,dashboard:true}));
    }
    return(
        <>
        <div>
            <table className="w-full border border-[#2ecc71]">
                <thead className={`${anton.className} uppercase text-white bg-[#2ecc71]`}>
                    <tr className="[&>th]:py-2.5">
                        <th className="w-[20%]">
                            serial
                        </th>
                        <th className="w-[40%]">
                            project name
                        </th>
                        <th className="w-[40%]">

                        </th>
                    </tr>
                </thead>

                <tbody>
                    {
                        projectInfo.map((items,index)=>{
                            return <tr key={index} className={`${jost.className} text-[#2ecc71]/80 font-medium even:bg-[#2ecc71]/20 transition-all duration-150 ease-linear hover:text-[#27ae60] hover:font-bold [&>td]:py-2.5`}>
                                <td className="text-center">
                                    {index+1}
                                </td>

                                <td className="text-center">
                                    {items.title}
                                </td>

                                <td className="flex flex-row justify-center items-center w-full gap-x-10 text-2xl text-gray-500">
                                    <button className="transition-all duration-150 ease-linear hover:text-[#3498db] hover:scale-125" onClick={()=>{navigatePage(items.id)}}>
                                        <IoIosEye />
                                    </button>

                                    <button className="transition-all duration-150 ease-linear hover:text-[#e74c3c] hover:scale-125">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
        </>
    )
}