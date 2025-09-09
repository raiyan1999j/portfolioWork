import { Anton, Jost } from "next/font/google"

const categories = ["all","web app","mobile app","frontend","backend"];

const projects = [
    {
        img:"",
        tools:["reactjs","tailwindcss"],
        title:"bus ticket"
    },
    {
        img:"",
        tools:["reactjs","tailwindcss"],
        title:"Simple E-commerce"
    },
    {
        img:"",
        tools:["reactjs","tailwindcss"],
        title:"bus ticket"
    },
    {
        img:"",
        tools:["reactjs","tailwindcss"],
        title:"bus ticket"
    },
    {
        img:"",
        tools:["reactjs","tailwindcss"],
        title:"bus ticket"
    },
    ,{
        img:"",
        tools:["reactjs","tailwindcss"],
        title:"bus ticket"
    }
    ,{
        img:"",
        tools:["reactjs","tailwindcss"],
        title:"bus ticket"
    },
    {
        img:"",
        tools:["reactjs","tailwindcss"],
        title:"bus ticket"
    }
];

const jost = Jost({
    subsets:["latin"]
});

const anton = Anton({
    subsets:["latin"],
    weight:["400"]
})
export default function Projects(){
    return(
        <>
        <section className="px-4 mt-[120px] space-y-10">
            <div className="px-20 flex flex-row justify-center gap-x-5">
                {
                    categories.map((items,index)=>{
                        return <button className={`${jost.className} text-black/80 capitalize relative after:absolute after:content-'' after:h-[2px] after:w-0 after:bg-[var(--combineColor)] after:left-0 after:bottom-0 after:transition-all after:duration-150 after:ease-linear hover:after:w-full hover:cursor-pointer`} key={index}>
                            {items}
                        </button>
                    })
                }
            </div>  

            <div className="grid grid-cols-2 gap-x-5 gap-y-10">
                {
                    projects.map((items,index)=>{
                        return <div className="px-5 py-5 rounded-xl hover:shadow-[1px_2px_5px_rgba(0,0,0,0.2),inset_-1px_0px_2px_rgba(0,0,0,0.1)] space-y-5 transition-all duration-150 ease-linear" key={index}>
                            <div className="h-[300px] w-full border border-black/20 rounded-lg">

                            </div>

                            <div className="flex flex-row gap-x-5">
                                {
                                    items?.tools.map((subItems,subIndex)=>{
                                        return <span className={`${jost.className} text-[var(--darkTxt,rgba(0,0,0,0.8))] font-semibold border border-[var(--dartTxt,rgba(0,0,0,0.2))] px-4 rounded-full`} key={subIndex}>{subItems}</span>
                                    })
                                }
                            </div>

                            <div>
                                <h4 className={`${anton.className} text-[var(--darkTxt,rgba(0,0,0,0.8))] capitalize text-xl truncate`}>
                                    {items?.title}
                                </h4>
                            </div>
                        </div>
                    })
                }
            </div>
        </section>
        </>
    )
}