import { Anton, Jost } from "next/font/google"
import { FaMoon } from "react-icons/fa"
import { IoIosArrowDown } from "react-icons/io"
import { IoMoon } from "react-icons/io5"

const jost = Jost({
    subsets:["latin"]
})

const anton = Anton({
    subsets:["latin"],
    weight:'400'
})

export default function Header(){
    return(
        <>
        <nav className="mx-auto h-[64px] grid grid-cols-3">
            <div className="px-10 flex items-center">
                <div className="h-10 w-full relative">
                    <div className="absolute h-full w-full">
                        <input type="text" className={`${jost.className} h-full w-full border border-gray-300 rounded-lg px-2.5 placeholder:text-black/20`} placeholder="Search anything you want"/>
                    </div>
                </div>
            </div>

            <div className="col-span-2 flex justify-end items-center px-10">
                <div className="flex flex-row items-center gap-x-5">
                    <div className="h-10 w-10 bg-slate-600 rounded-lg flex justify-center items-center">
                        <button className="text-white">
                            <IoMoon />
                        </button>
                    </div>

                    <div className="flex flex-row items-center gap-x-2.5">
                        <div className="h-10 w-10 rounded-full bg-slate-500">
                            
                        </div>
                        <div className="flex flex-row items-center gap-x-1.5">
                            <p className={`${anton.className} text-black/80 capitalize`}>
                                raiyan khan
                            </p>
                            
                            <span>
                                <IoIosArrowDown />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        </>
    )
}