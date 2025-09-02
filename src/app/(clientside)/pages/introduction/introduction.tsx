"use client";
import { InfoProvider } from "@/app/contextprovider/contextprovider";
import { Jost } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { IoNewspaperSharp } from "react-icons/io5";

type ContainerType = {
    topics: string[],
    currentIndex: number,
    phase: string
}

const jost = Jost({
    subsets:["latin"]
})

export default function Introduction(){
    const [container,setContaienr] = useState<ContainerType>({
        topics:["reactjs","nextjs","typescript"],
        currentIndex:0,
        phase:"typing"
    })

    const handleAnimation=()=>{
        const currentIndex = (container.currentIndex + 1) % container.topics.length;
        
        if(container.phase == "typing"){
            setContaienr((prev)=>({...prev,phase:"reset"}))
        }else{
            setContaienr((prev)=>({...prev,currentIndex,phase:"typing"}));

        const len = container.topics[currentIndex].length;
        const setCharacter = len ;
        
        document.documentElement.style.setProperty('--wordCh',`${setCharacter}ch`);
        }
    }
    return(
        <>
        <section className="px-4 mt-[120px] bg-[var(--darkBg)]">
            <div className="grid grid-cols-3 items-center">
                <div className="col-span-2">
                    <div className="mb-5">
                        <h4 className={`${jost.className} text-[var(--darkTxt,rgba(0,0,0,0.8))] text-2xl font-medium uppercase tracking-wider`}>
                            hi, I'm a frontend developer
                        </h4>
                    </div>

                    <div className="mb-5">
                        <div className="relative h-[100px] w-full">
                            <div key={container.currentIndex} className={`${jost.className} text-[80px] text-[var(--combineColor)] font-bold capitalize absolute h-full top-0 border-r-8 borde-r-[var(--combineColor)] overflow-hidden ${container.phase == "typing"?"animate-[textAnimation_2s_steps(8,end)_forwards,blinkCursor_0.5s_steps(1)_infinite]":"animate-[slideBack_2s_steps(8,end)_forwards,blinkCursor_0.5s_steps(1)_infinite]"} tracking-wider leading-none`} onAnimationEnd={handleAnimation}>
                                {container.topics[container.currentIndex]}
                            </div>
                        </div>
                    </div>

                    <div className="w-[70%] mb-10">
                        <p className={`${jost.className} text-lg text-[var(--dartTxt,rgba(0,0,0,0.8))] font-normal`}>
                            I'm a software engineer specializing in scalable web apps. Explore my <span className="text-[var(--combineColor)]">blog</span>, <span className="text-[var(--combineColor)]"> project portfolio</span>  and <span className="text-[var(--combineColor)]">online resume .</span> 
                        </p>
                    </div>

                    <div className="flex flex-row gap-x-5">
                        <Link href={"#"} className={`${jost.className} text-lg font-semibold capitalize flex flex-row items-center py-4 px-6 rounded-full bg-[var(--combineColor)] text-white relative overflow-hidden z-30 before:absolute before:bg-[var(--combineColor)] before:top-0 before:left-0 before:content-'' before:h-full before:w-full before:rounded-full before:-z-20 after:absolute after:content-'' after:top-[100%] after:left-0 after:bg-slate-600 after:h-full after:w-full after:rounded-full after:-z-10 after:transition-all after:duration-300 after:ease-linear hover:after:top-0`}>
                        <GoArrowRight />
                        view portfolio
                        </Link>

                        <Link href={"#"} className={`${jost.className} text-lg text-gray-300 font-semibold capitalize flex flex-row items-center py-4 px-6 rounded-full bg-[#292929]`}>
                        <IoNewspaperSharp />
                        view resume
                        </Link>
                    </div>
                </div>

                <div>
                    <div className="h-[407px] w-[325px] relative">
                        <div className="absolute bg-white z-20 h-full w-full top-0 left-0">

                        </div>

                        <div className="absolute bg-[var(--combineColor)] h-full w-full top-0 left-0 -rotate-6 animate-[swing6to0_2s_ease-in-out_infinite]">

                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}