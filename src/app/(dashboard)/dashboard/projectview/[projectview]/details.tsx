"use client";
import { Anton, Caprasimo, Jost } from "next/font/google";

const anton = Anton({
    subsets:["latin"],
    weight:["400"]
})

const jost = Jost({
    subsets:["latin"]
})

const caprasimo = Caprasimo({
    subsets:["latin"],
    weight:["400"]
})

export default function Details(){
    return(
        <>
        <div className="mt-5">
            <h2 className={`${caprasimo.className} text-6xl capitalize text-[var(--darkDashTxt,rgba(0,0,0,0.8))] relative after:absolute after:h-2 after:w-[25%] after:bg-rose-500 after:bottom-[-10px] after:left-0`}>
                Project details
            </h2>
        </div>

        <div className="grid grid-cols-5 gap-x-5 mt-5">
            <div className="col-span-3 shadow-[3px_5px_5px_#3498db]/40 px-2.5 py-5 rounded-xl">
                <div className="w-full rounded-xl ">
                    <div className="h-[200px] w-full border border-black/20 rounded-lg">

                    </div>

                    <div className="grid grid-cols-3 gap-x-5 mt-5">
                    {
                        [...Array(3)].map((_,index)=>{
                            return <div className="h-20 w-full border border-black/20 rounded-xl" key={index}></div>
                        })
                    }
                </div>
                </div>

                <div className="w-[60%] h-10  rounded-xl mt-5 relative border border-black/20">
                    <label htmlFor="projectImg" className="absolute h-full w-full flex items-center px-2.5">
                        <input type="file" name="projectImg" id="projectImg" className="absolute h-full w-full hidden" />

                        <span className={`${jost.className} text-black/40 capitalize`}>
                            browse your image
                        </span>
                        
                    </label>
                </div>

                <div className="w-full mt-5 rounded-xl  border border-black/20">
                    <textarea name="description" className="h-[300px] w-full rounded-xl"></textarea>
                </div>  
            </div>

            <div className="col-span-2 py-5 px-2.5">
                <div className="w-full h-10 shadow-[3px_5px_5px_#3498db]/20 rounded-lg">
                    <input type="text" className={`${jost.className} placeholder:text-black/20 placeholder:font-medium focus:outline-none focus:border-black/50 placeholder:capitalize px-2.5 h-full w-full border border-black/20 rounded-lg`} placeholder="title" autoComplete="off"/>
                </div>

                <div className="mt-10">
                    <div className="shadow-[5px_0px_3px_#3498db]/20 py-2.5 px-5 inline rounded-tl-lg rounded-tr-lg">
                        <label htmlFor="githublink" className={`${anton.className} tracking-widest text-black/70 capitalize`}>
                            github-link
                        </label>
                    </div>
                </div>
                <div className="w-full shadow-[5px_0px_5px_#3498db]/20 translate-y-[9px] py-2.5 rounded-xl px-2.5">
                    <div className="h-10 w-full">
                        <input type="text" name="githublink" id="githublink" className={`${jost.className} placeholder:text-black/20 placeholder:font-medium focus:outline-none focus:border-black/50 placeholder:capitalize px-2.5 h-full w-full border border-black/20 rounded-lg`}/>
                    </div>
                </div>

                 <div className="mt-10">
                    <div className="shadow-[5px_0px_3px_#3498db]/20 py-2.5 px-5 inline rounded-tl-lg rounded-tr-lg">
                        <label htmlFor="githublink" className={`${anton.className} tracking-widest text-black/70 capitalize`}>
                            live-link
                        </label>
                    </div>
                </div>
                <div className="w-full shadow-[5px_0px_5px_#3498db]/20 translate-y-[9px] py-2.5 rounded-xl px-2.5">
                    <div className="h-10 w-full">
                        <input type="text" name="githublink" id="githublink" className={`${jost.className} placeholder:text-black/20 placeholder:font-medium focus:outline-none focus:border-black/50 placeholder:capitalize px-2.5 h-full w-full border border-black/20 rounded-lg`}/>
                    </div>
                </div>

                <div className="flex flex-row justify-end w-full mt-10">
                    <button className={`${anton.className} px-5 py-2.5 bg-[#2ecc71] text-white rounded-xl uppercase transtion-all duration-150 ease-linear hover:bg-[#27ae60]`}>
                        Add project
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}