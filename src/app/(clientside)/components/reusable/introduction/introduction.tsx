import { Caprasimo, Jost } from "next/font/google";

type PropsType = {
    mainHeader: string | null,
    subHeader: string | null
}

const caprasimo = Caprasimo({
    subsets:["latin"],
    weight:['400']
})

const jost = Jost({
    subsets:["latin"],
    weight:["400"]
})

export default function ResuableIntro({mainHeader,subHeader}:PropsType){
    return(
        <>
        <div className="relative h-[120px] w-[80%] mx-auto flex justify-center items-center">
                <div className="absolute">
                    <h1 className={`${caprasimo.className} text-[120px] capitalize text-transparent`} style={{WebkitTextStroke:"1px var(--darkTxt,rgba(0,0,0,0.5))"}}>
                        {mainHeader}
                    </h1>
                </div>
                <div>
                    <h2 className={`${jost.className} text-7xl font-bold text-[var(--darkTxt,rgba(0,0,0,0.8))] capitalize`}>
                        {subHeader}
                    </h2>
                </div>
            </div>
        </>
    )
}