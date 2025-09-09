import { Caprasimo, Jost } from "next/font/google"
import { FaRegPaperPlane } from "react-icons/fa"

const caprasimo = Caprasimo({
    subsets:["latin"],
    weight:["400"]
})

const jost = Jost({
    subsets:["latin"]
})
export default function Introduction(){
    return(
        <>
        <section className="px-4">
            <div className="relative h-[120px] w-[80%] mx-auto flex justify-center items-center">
                <div className="absolute">
                    <h1 className={`${caprasimo.className} text-[120px] capitalize text-transparent`} style={{WebkitTextStroke:"1px var(--darkTxt,rgba(0,0,0,0.5))"}}>
                        my projects
                    </h1>
                </div>
                <div>
                    <h2 className={`${jost.className} text-7xl font-bold text-[var(--darkTxt,rgba(0,0,0,0.8))] capitalize`}>
                        portfolio
                    </h2>
                </div>
            </div>

            <div className="w-[80%] mx-auto flex justify-center mt-[60px]">
                            <button className={`${jost.className} capitalize font-semibold gap-x-2 text-white px-8 py-5 rounded-full flex flex-row items-center relative overflow-hidden z-30 before:absolute before:bg-[var(--combineColor)] before:top-0 before:left-0 before:content-'' before:h-full before:w-full before:rounded-full before:-z-20 after:absolute after:content-'' after:top-[100%] after:left-0 after:bg-slate-600 after:h-full after:w-full after:rounded-full after:-z-10 after:transition-all after:duration-300 after:ease-linear hover:after:top-0`}>
                                <span>
                                    <FaRegPaperPlane />
                                </span>
                                <span>
                                    hire me
                                </span>
                            </button>
                        </div>

            <span className="h-[1px] w-full bg-black/10 mt-[90px] block"></span>
        </section>
        </>
    )
}