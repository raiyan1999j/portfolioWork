import { Jost } from "next/font/google";
import { FaFilePdf, FaRegPaperPlane } from "react-icons/fa";
import ResuableIntro from "../reusable/introduction/introduction";

const jost = Jost({
    subsets:["latin"]
})

export default function Introduction(){
    return(
        <>
        <section className="px-4">
            <ResuableIntro mainHeader={"documents"} subHeader={"resume"}/>

            <div className="w-[80%] mx-auto flex justify-center mt-20">
                            <button className={`${jost.className} capitalize font-semibold gap-x-2 text-white px-4 py-2 rounded-full flex flex-row items-center relative overflow-hidden z-30 before:absolute before:bg-[var(--combineColor)] before:top-0 before:left-0 before:content-'' before:h-full before:w-full before:rounded-full before:-z-20 after:absolute after:content-'' after:top-[100%] after:left-0 after:bg-slate-600 after:h-full after:w-full after:rounded-full after:-z-10 after:transition-all after:duration-300 after:ease-linear hover:after:top-0`}>
                                <span>
                                    <FaFilePdf />
                                </span>
                                <span>
                                    Download pdf
                                </span>
                            </button>
                        </div>

            <span className="block h-[1px] w-full bg-black/10 mt-[80px]"></span>
        </section>
        </>
    )
}