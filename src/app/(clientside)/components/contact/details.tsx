import { Anton, Jost } from "next/font/google"

const contacDetails = [
    {
        title: "phone",
        content:"01866665158"
    },
    {
        title: "location",
        content:"Mirpur-2,Dhaka-1216,Bangladesh"
    },
    {
        title: "email",
        content:"raiyank317@gmail.com"
    }
]

const anton = Anton({
    subsets:["latin"],
    weight:["400"]
})

const jost = Jost({
    subsets:["latin"]
})
export default function Details(){

    const inputBox=(placeholder:string|null,name:string|null)=>{
        return <div className="h-[50px] w-full">
            <input type="text" className={`${jost.className} text-[var(--darkTxt,rgba(0,0,0,0.8))] px-4 placeholder:text-[#34495e]/50 placeholder:capitalize h-full w-full rounded-xl border border-black/20 focus:border-black/80 focus:outline-none`} name={name ?? ""} placeholder={placeholder??""}/>
        </div>
    }
    return(
        <>
        <section className="px-4 mt-20">
            <div className="px-2.5 border-l-[8px] border-[var(--combineColor)] mb-5">
                <h2 className={`${anton.className} text-4xl text-[var(--darkTxt,rgba(0,0,0,0.8))] capitalize`}>
                    Contact Details
                </h2>
            </div>

            <div className="w-[70%] mb-5">
                <p className={`${jost.className} text-[var(--darkTxt,rgba(0,0,0,0.8))]`}>
                    If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.
                </p>
            </div>

            <div className="grid grid-cols-3">
                {
                    contacDetails.map((items,index)=>{
                        return <div className="py-5 px-2.5 space-y-2.5 border-l border-[var(--combineColor)]" key={index}>
                            <h4 className={`${anton.className} capitalize text-xl text-[var(--darkTxt,rgba(0,0,0,0.8))]`}>
                                {items.title}
                            </h4>
                            <p className={`${jost.className} text-[var(--darkTxt,rgba(0,0,0,0.8))]`}>
                                {items.content}
                            </p>
                        </div>
                    })
                }
            </div>
        </section>

        <section className="px-4 mt-20 pb-20">
            <div className="px-2.5 border-l-[8px] border-[var(--combineColor)] mb-5">
                <h2 className={`${anton.className} text-4xl text-[var(--darkTxt,rgba(0,0,0,0.8))] capitalize`}>
                    get in touch
                </h2>
            </div>

            <div className="w-[70%] mb-5">
                <p className={`${jost.className} text-[var(--darkTxt,rgba(0,0,0,0.8))]`}>
                    If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.
                </p>
            </div>

            <div className="p-10 border border-black/10 rounded-[50px]">
                <form className="space-y-5">
                    <div className="flex flex-row gap-x-5">
                        {inputBox("your name","name")}

                        {inputBox("email address","email")}
                    </div>

                    <div className="flex flex-row gap-x-5">
                        {inputBox("phone","phone")}

                        {inputBox("subject","subject")}
                    </div>

                    <div>
                        <textarea name="message" id="message" placeholder="your message" className={`${jost.className} p-4 border border-black/20 w-full h-[150px] rounded-xl placeholder:text-[#34495e]/50 placeholder:capitalize text-[var(--darkTxt,rgba(0,0,0,0.8))] focus:border-black/80 focus:outline-none`}></textarea>
                    </div>

                    <div>
                        <button type="submit" className={`${jost.className} capitalize font-semibold gap-x-2 text-white px-5 py-3 rounded-full flex flex-row items-center relative overflow-hidden z-30 before:absolute before:bg-[var(--combineColor)] before:top-0 before:left-0 before:content-'' before:h-full before:w-full before:rounded-full before:-z-20 after:absolute after:content-'' after:top-[100%] after:left-0 after:bg-slate-600 after:h-full after:w-full after:rounded-full after:-z-10 after:transition-all after:duration-150 after:ease-linear hover:after:top-0`}>
                                            
                                                send message
                                            
                                        </button>
                    </div>
                </form>
            </div>
        </section>
        </>
    )
}