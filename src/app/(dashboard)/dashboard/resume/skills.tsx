import { Anton, Jost } from "next/font/google"

const anton = Anton({
    subsets:["latin"],
    weight:["400"]
})

const jost = Jost({
    subsets:["latin"]
})

export default function Skills(){
    return(
        <>
        <div className="flex flex-row gap-x-2.5 mt-5">
            <div className="w-[80%]">
                <input type="text" className={`${jost.className} font-bold text-slate-800 h-full w-full placeholder:uppercase placeholder:font-normal placeholder:text-slate-500 border border-black/20 py-2.5 rounded-xl px-2.5 focus:outline-none`} name="title" placeholder="Add Titlte..." />
            </div>

            <div className="w-[20%]">
                <button className="h-full w-full bg-[#2ecc71] text-white rounded-xl">
                    Add
                </button>
            </div>
        </div>
        </>
    )
}