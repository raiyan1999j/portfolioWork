"use client";
import { Anton, Jost } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import { FaAngleDoubleRight, FaRegEnvelope, FaRegUser } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { IoCodeWorkingOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiReadCvLogoBold } from "react-icons/pi";
import { RiMenuUnfold2Fill } from "react-icons/ri";

type CollapseType = {
    mainCollapse: boolean,
    menuCollapse: boolean
}

const menus = [
    {
        title:"dashboard",
        link:"#",
        icon:<LuLayoutDashboard />
    },
    {
        title:"about me",
        link:"/dashboard/about",
        icon:<FaRegUser />
    },
    {
        title:"portfolio",
        link:"#",
        icon:<IoCodeWorkingOutline />
    },
    {
        title:"contact",
        link:"#",
        icon:<FaRegEnvelope />
    },
    {
        title:"resume",
        link:"#",
        icon:<PiReadCvLogoBold />
    },
]

const jost = Jost({
    subsets:['latin']
})

const anton = Anton({
    subsets:["latin"],
    weight:'400'
});
export default function Sidenav(){
    const [collapse,setCollapse] = useState<CollapseType>({
        mainCollapse: false,
        menuCollapse: false
    });

    const handleCollapse=()=>{
        if(!collapse.mainCollapse){
            setCollapse({mainCollapse:true,menuCollapse:false})
        }else{
            setCollapse({mainCollapse:false,menuCollapse:false})
        }
    }
    return(
        <>
        <div className={`fixed top-[20%] bg-[var(--darkDashBg,rgba(255,255,255,1))] z-40 ${collapse.mainCollapse?"left-[2%]":"left-[-4%]"} ${collapse.menuCollapse?"w-1/4":"w-[3.5%]"} h-[60vh] transition-all duration-200 ease-linear`}>

        <div className={`absolute -top-5 -right-5 z-10 transition-all ease-linear ${collapse.menuCollapse?"opacity-100 duration-1000":"opacity-0 duration-100 pointer-events-none"}`}>
                <button className="h-10 w-10 rounded-full text-white bg-slate-500 flex justify-center items-center transition-all duration-150 ease-linear hover:bg-[var(--combineColor)]" onClick={()=>{setCollapse(prev=>({...prev,menuCollapse:!prev.menuCollapse}))}}>
                    <ImCross />
                </button>
            </div>

        <div className={`absolute -top-5 transition-all duration-150 ease-linear ${collapse.menuCollapse ? "opacity-0 pointer-events-none duration-100" : "opacity-100 duration-1000"}`}>
            <button className="transition-all duration-150 ease-linear text-xl hover:text-[var(--combineColor)] hover:cursor-pointer text-[var(--darkDashTxt,0,0,0,0.8)]" onClick={()=>{setCollapse(prev=>({...prev,menuCollapse:!prev.menuCollapse}))}}>    
                <FaAngleDoubleRight />
            </button>
        </div>
        
        <div className={`h-full w-full shadow-sm shadow-black/80 rounded-lg relative overflow-y-auto overflow-x-hidden sidenavScrollbar transition-all duration-200 ease-linear`}>
            

            <div className="flex flex-col gap-y-5 px-2.5 py-5">
                {
                    menus.map((items,index)=>{
                        return <Link href={items.link} className="flex flex-row gap-x-2.5 items-center group/items" key={index}>
                            <div>
                                <span className="text-2xl text-[var(--darkDashTxt,0,0,0,0.8)] transition-all duration-150 ease-linear group-hover/items:text-[var(--combineColor)]">
                                    {items.icon}
                                </span>
                            </div>

                            <div className="border-b border-b-black/10 py-2.5 w-[80%] text-[var(--darkDashTxt,0,0,0,0.8)] transition-all duration-200 ease-linear group-hover/items:bg-[var(--combineColor)] group-hover/items:text-white group-hover/items:rounded-lg group-hover/items:px-5">
                                <span className={`${anton.className} text-2xl capitalize`}>
                                    {items.title}
                                </span>
                            </div>
                        </Link>
                    })
                }
            </div>

        </div>

        <div className={`absolute top-[45%] rounded-lg bg-[var(--darkDashBg,rgba(255,255,255,1))] z-40 ${collapse.menuCollapse?"right-[-15%]":"right-[-100%]"}`}>
            <button className="text-2xl py-4 px-2 rounded-lg shadow-lg shadow-black/20 transition-all duration-150 ease-linear hover:bg-[var(--combineColor)] hover:text-white text-[var(--darkDashTxt,0,0,0,0.8)]" onClick={handleCollapse}>
                <RiMenuUnfold2Fill />
            </button>
        </div>
        </div>
        </>
    )
}