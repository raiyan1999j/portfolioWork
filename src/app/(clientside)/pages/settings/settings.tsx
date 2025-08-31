"use client";
import { InfoProvider } from "@/app/contextprovider/contextprovider";
import { useContext, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa"
import { IoSettings } from "react-icons/io5"

const colors = ["#2ecc71","#e74c3c","#3498db","#f9ca24","#130f40"]

export default function Settings(){
    const context = useContext(InfoProvider);

    if(!context) throw new Error("context not working");

    const {setCombine,setModeEnable,darkMode} = context;
    const [collapse,setCollapse] = useState<boolean>(false);
    const [modeSwap,setSwap] = useState(false);
    return(
        <>
        <section className={`fixed ${collapse?"right-0":"right-[-14%]"} top-[45%] transition-all duration-200 ease-linear`}>
            <div className="flex flex-row p-2.5 w-[200px] shadow-[0px_0px_2px_black]/20 rounded-xl relative">
                <div className="flex flex-row flex-wrap gap-x-2 gap-y-2 w-[80%] relative after:absolute after:h-[50%] after:w-[1px] after:bg-black/20 after:right-2 after:top-[25%]">
                    {
                        colors.map((items,index)=>{
                            return <button type="button" className="h-[32px] w-[32px] hover:cursor-pointer transition-all duration-150 ease-linear hover:shadow-[2px_1px_2px_#95a5a6] hover:rounded-sm" style={{background:`${items}`}} key={index} onClick={()=>{setCombine(items)}}></button>
                        })
                    }
                </div>

                <div className="w-[20%] flex justify-center items-center">
                    <span className="text-2xl text-gray-400 transition-all" onClick={()=>{setModeEnable(!darkMode)}}>
                        {
                            darkMode?
                            <FaSun/>:
                            <FaMoon/>
                        }
                    </span>
                </div>

                <div className="absolute -left-[20%] top-[25%] text-xl shadow-[0px_0px_2px_black]/20 p-2.5 rounded-tl-xl rounded-bl-xl bg-[var(--combineColor)] text-white" onClick={()=>{setCollapse(!collapse)}}>
                    <IoSettings className="animate-spin"/>
                </div>
            </div>
        </section>
        </>
    )
}