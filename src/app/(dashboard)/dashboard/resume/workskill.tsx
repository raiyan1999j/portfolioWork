import { Anton, Jost } from "next/font/google"
import WorkExp from "./workexp"

const anton = Anton({
    subsets:["latin"],
    weight:["400"]
})

const jost = Jost({
    subsets:["latin"]
})

export default function WorkSkill(){
    return(
        <>
        <div className="grid grid-cols-6 gap-x-5 mt-5 px-5">
            <div className="col-span-4">
                <h2 className={`${anton.className} text-3xl text-[#95a5a6]/40 tracking-wide`}>
                    Work Experience
                </h2>

                <WorkExp/>
            </div>

            <div className="col-span-2">
                <h2 className={`${anton.className} text-3xl text-[#95a5a6]/40 tracking-wide`}>
                    Skills
                </h2>
            </div>
        </div>
        </>
    )
}