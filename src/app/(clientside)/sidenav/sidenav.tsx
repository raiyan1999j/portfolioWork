"use client";
import { InfoProvider } from "@/app/contextprovider/contextprovider";
import {Jost} from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { AiFillGithub, AiOutlineUser } from "react-icons/ai";
import { BsEnvelopeAtFill } from "react-icons/bs";
import { FaFacebookSquare, FaInstagram, FaLinkedinIn, FaRegPaperPlane, FaRegUser } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";
import { VscCode } from "react-icons/vsc";

const jost = Jost({
    subsets:["latin"]
})

const socialLink = [
    {
        icon: <FaFacebookSquare />
    },
    {
        icon: <FaInstagram />
    },
    {
        icon: <AiFillGithub />
    },
    {
        icon: <FaLinkedinIn />
    }
]

const pages = [
    {
        title:"about us",
        icon:<AiOutlineUser />,
        link:"/"
    },
    {
        title:"portfolio",
        icon:<VscCode />,
        link:"/components/portfolio"
    },
    {
        title:"resume",
        icon:<IoNewspaperOutline />,
        link:"/components/resume"
    },
    {
        title:"contact",
        icon:<BsEnvelopeAtFill />,
        link:"/components/contact"
    },
]

export default function SideNav(){
    const context = useContext(InfoProvider);

    if(!context) throw new Error("context error");

    const pathname = usePathname();
    const {setPageLoader} = context;
    return(
        <>
        <section className={`custom-scrollbar px-5 py-5 overflow-y-scroll fixed top-0 left-0 w-1/4 h-screen bg-[var(--darkBg,white)]`}>
            <div>
                <div className="flex justify-center mb-2.5">
                    <div className="h-20 w-20 rounded-full flex justify-center items-center bg-[var(--combineColor)]">

                    </div>
                </div>
                
                <div className="text-center space-y-1 mb-5">
                    <h2 className={`${jost.className} text-2xl capitalize text-[var(--darkTxt,rgba(0,0,0,0.8))] font-bold`}>
                        raiyan khan
                    </h2>
                    <h4 className={`${jost.className} text-sm capitalize text-[var(--darkTxt,rgba(0,0,0,0.8))] font-normal`}>
                        Front end developer
                    </h4>
                </div>

                <div className="flex flex-row justify-center gap-x-2.5 mb-10">
                   {
                    socialLink.map((items,index)=>{
                        return <span className="h-[32px] w-[32px] rounded-full border border-black/20 flex justify-center items-center transition-all duration-150 ease-linear text-[var(--combineColor)] hover:bg-[var(--combineColor)] hover:text-white hover:border-none" key={index}>
                            {items.icon}
                        </span>
                    })
                   }
                </div>
            </div>

            <span className="h-[1px] w-[80%] mx-auto bg-black/20 block mb-10"></span>

            <div className="flex flex-col gap-y-5 w-[80%] mx-auto mb-10">
                {
                    pages.map((items,index)=>{
                        return <Link className={`${jost.className}  py-2 rounded-lg px-4 flex flex-row gap-x-2.5 items-center w-full text-base font-medium capitalize hover:bg-[var(--combineColor)] hover:text-white transition-all duration-300 ease-linear ${items.link == pathname?"bg-[var(--combineColor)] text-white":"bg-transparent text-[var(--darkTxt,rgba(0,0,0,0.8))]"}`} href={items.link} onClick={()=>{setPageLoader(prev=>({...prev,clientSide:true}))}} key={index}>
                                <span>
                                {items.icon}
                            </span>
                            <span>
                                {items.title}
                            </span>
                        </Link>
                    })
                }
            </div>

            <div className="w-[80%] mx-auto flex justify-center">
                <button type="button" className={`${jost.className} capitalize font-semibold gap-x-2 text-white px-2 py-1 rounded-full flex flex-row items-center relative overflow-hidden z-30 before:absolute before:bg-[var(--combineColor)] before:top-0 before:left-0 before:content-'' before:h-full before:w-full before:rounded-full before:-z-20 after:absolute after:content-'' after:top-[100%] after:left-0 after:bg-slate-600 after:h-full after:w-full after:rounded-full after:-z-10 after:transition-all after:duration-300 after:ease-linear hover:after:top-0`}>
                    <span>
                        <FaRegPaperPlane />
                    </span>
                    <span>
                        hire me
                    </span>
                </button>
            </div>
        </section>
        </>
    )
}