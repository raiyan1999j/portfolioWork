import { Anton, Caprasimo, Jost } from "next/font/google";

const caprasimo = Caprasimo({
    subsets:["latin"],
    weight:["400"]
});

const anton = Anton({
    subsets:["latin"],
    weight:["400"]
});

const jost = Jost({
    subsets:["latin"]
})

export default function Introduce(){

    const inputui=(category:string,type:string,placeholder:string,name:string)=>{
        if(category == "input"){
            return <>
                <input type={type} name={name} className={`${jost.className} font-bold text-slate-800 h-full w-full placeholder:uppercase placeholder:font-normal placeholder:text-slate-500 border-b border-b-black px-2.5 focus:outline-none`} placeholder={placeholder}/>
            </>
        }else{
            return <>
                <textarea name={name} className={`${jost.className} font-bold text-slate-800 h-full w-full placeholder:uppercase placeholder:font-normal placeholder:text-slate-500 border border-black/20 rounded-xl p-2.5 focus:outline-none`} placeholder={placeholder}></textarea>
            </>
        }
    }
    return(
        <>
        <div className="flex flex-row w-full gap-x-40 mt-5 px-5">
            <div className="w-full">
                <h2 className={`${anton.className} text-3xl text-[#95a5a6]/40 tracking-wide`}>
                    Your name & Profession
                </h2>

                <div className="mt-5 space-y-2.5">
                    <div className="w-[60%] h-10">
                        {inputui("input","text","your name","your name")}
                    </div>

                    <div className="w-[60%] h-10">
                        {inputui("input","text","profession","profession")}
                    </div>
                </div>
            </div>

            <div className="w-full">
                <h2 className={`${anton.className} text-3xl text-[#95a5a6]/40 tracking-wide`}>
                    Address & Contact Info
                </h2>

                <div className="flex flex-row items-center gap-x-10 mt-5">
                    <div className="flex flex-col gap-y-2.5 items-center">
                        <div className="h-[100px] w-[100px] border border-black/20 rounded-full">

                        </div>

                        <div>
                            <button type="button" className="px-5 py-0.5 rounded-full border border-black/20">
                                upload
                            </button>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="w-[70%] h-10">
                            {inputui("input","text","mobile number","mobile number")}
                        </div>

                        <div className="w-[70%] h-10">
                            {inputui("input","email","email","email")}
                        </div>

                        <div className="w-[70%] h-10">
                            {inputui("input","text","address","address")}
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <h2 className={`${anton.className} text-3xl text-[#95a5a6]/40 tracking-wide`}>
                        Short Bio
                    </h2>

                    <div className="w-full h-[180px] mt-5">
                        {inputui("textarea","text","short bio","short bio")}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}