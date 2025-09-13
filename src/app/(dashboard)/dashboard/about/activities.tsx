import { Anton, Caprasimo, Jost } from "next/font/google";
import { IoMdAdd } from "react-icons/io";

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
export default function Activities(){
    return(
        <>
        <div className="mt-5">
            <h2 className={`${caprasimo.className} text-6xl capitalize text-[var(--darkDashTxt,rgba(0,0,0,0.8))] relative after:absolute after:h-2 after:w-[25%] after:bg-rose-500 after:bottom-[-10px] after:left-0`}>
                Brief your role.
            </h2>
        </div>

        <div className="mt-5">
            <div className="flex flex-row items-center w-full gap-x-5">
                <div className="w-[30%]">
                    <label htmlFor="mainHeadline" className={`${anton.className} text-[var(--darkDashTxt,rgba(0,0,0,0.8))] text-xl font-semibold`}>main headline</label>

                    <div className="w-full h-[50px] mt-4">
                        <input type="text" name="mainHeadline" id="mainHeadline" className={`${jost.className} text-[var(--darkDashTxt,rgba(0,0,0,0.8))] font-medium px-4 placeholder:text-[var(--darkDashTxt,rgba(0,0,0,0.5))] placeholder:px-4 focus:outline-none focus:border-black/40 h-full w-full border border-black/20 rounded-xl`} placeholder="main headline"/>
                    </div>
                </div>

                <div className="w-[30%]">
                    <label htmlFor="subHeadline" className={`${anton.className} text-[var(--darkDashTxt,rgba(0,0,0,0.8))] text-xl font-semibold`}>sub headline</label>

                    <div className="w-full h-[50px] mt-4">
                        <input type="text" name="subHeadline" id="subHeadline" className={`${jost.className} text-[var(--darkDashTxt,rgba(0,0,0,0.8))] font-medium px-4 placeholder:text-[var(--darkDashTxt,rgba(0,0,0,0.5))] placeholder:px-4 focus:outline-none focus:border-black/40 h-full w-full border border-black/20 rounded-xl`} placeholder="sub headline"/>
                    </div>
                </div>

                <div className="mt-10">
                    <button className={`${jost.className} text-white font-medium px-2 py-3 rounded-xl bg-[#2ecc71] transition-all duration-200 ease-linear hover:bg-[#27ae60] hover:cursor-pointer`}>
                        add headline
                    </button>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-3 gap-x-5 mt-5">
            <div>
            <div className="px-5 py-5 rounded-xl shadow-[1px_2px_5px_rgba(0,0,0,0.2),inset_-1px_0px_2px_rgba(0,0,0,0.1)] space-y-5">
                            <div>
                                <div className="h-12 w-12 border border-black/20 rounded-lg relative">
                                    <label htmlFor="logoupload" className="h-full w-full absolute flex justify-center items-center">
                                        <input type="file" accept="image/*" name="logo" id="logoupload" className="h-full w-full absolute top-0 left-0 hidden" />

                                        <span className="text-xl hover:scale-90">
                                            <IoMdAdd />
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <div className="h-5 w-[80%]">
                                    <input type="text" className={`${anton.className} font-semibold capitalize text-xl text-[var(--darkTxt,rgba(0,0,0,0.8))] border-b border-b-black/20 focus:outline-none focus:border-b-black/40`} placeholder="title"/>
                                </div>
                            </div>
                            <div>
                                <textarea className={`${jost.className} text-base text-[var(--darkTxt,rgba(0,0,0,0.8))] h-[150px] w-full border border-black/20 rounded-xl focus:outline-none focus:border-black/40 px-2 py-4`} placeholder="write short description"></textarea>
                            </div>
            </div>

            <div className="w-full flex justify-end mt-5">
                <button className={`${jost.className} text-white font-medium px-2 py-1 rounded-xl bg-[#2ecc71] transition-all duration-200 ease-linear hover:bg-[#27ae60] hover:cursor-pointer`}>
                    add role
                </button>
            </div>
            </div>
        </div>
        </>
    )
}