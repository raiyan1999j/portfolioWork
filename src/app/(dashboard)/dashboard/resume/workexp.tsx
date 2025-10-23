import { Anton, Jost } from "next/font/google"

const anton = Anton({
    subsets:["latin"],
    weight:["400"]
})

const jost = Jost({
    subsets:["latin"]
})

export default function WorkExp(){

    const inputui=(category:string,type:string,placeholder:string,name:string)=>{
        if(category == "input"){
            return <>
                <input type={type} name={name} className={`${jost.className} font-bold text-slate-800 h-full w-full placeholder:uppercase placeholder:font-normal placeholder:text-slate-500 ${placeholder=="position"?"border border-black/20 py-2.5 rounded-xl":"border-b border-b-black"} px-2.5 focus:outline-none`} placeholder={placeholder}/>
            </>
        }else{
            return <>
                <textarea name={name} className={`${jost.className} font-bold text-slate-800 h-full w-full placeholder:uppercase placeholder:font-normal placeholder:text-slate-500 border border-black/20 rounded-xl p-2.5 focus:outline-none`} placeholder={placeholder}></textarea>
            </>
        }
    }
    return(
        <>
        <div className="grid grid-cols-3 gap-x-10 w-full mt-5">
                    <div>
                        <div className="w-full">                            
                            {inputui("input","text","position","position")}
                        </div>
                    </div>

                    <div className="flex flex-row justify-end col-span-2">
                        <div className="flex flex-row w-[80%] gap-x-10">
                            <div className="w-[60%]">
                            {inputui("input","text","company name","company")}
                        </div>
                        <div className="w-[20%]">
                            {inputui("input","text","start","start")}
                        </div>
                        <div className="w-[20%]">
                            {inputui("input","text","end","end")}
                        </div>
                        </div>
                        
                    </div>
                </div>
            
            <div className="h-[180px] w-[80%] mt-5">
                {inputui("textarea","text","description","description")}
            </div>

            <div className="mt-5">
                <button className="px-5 py-2.5 rounded-xl bg-[#2ecc71] text-white">
                    add work
                </button>
            </div>
        </>
    )
}