"use client";
import {Jost} from "next/font/google";
import Link from "next/link";
import { AiFillFacebook, AiFillGithub, AiOutlineUser } from "react-icons/ai";
import { BsEnvelopeAtFill } from "react-icons/bs";
import { FaInstagram, FaLinkedinIn, FaRegPaperPlane, FaRegUser } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";
import { VscCode } from "react-icons/vsc";

const jost = Jost({
    subsets:["latin"]
})

const socialLink = [
    {
        icon: <AiFillFacebook />
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
        link:"#"
    },
    {
        title:"portfolio",
        icon:<VscCode />,
        link:"#"
    },
    {
        title:"resume",
        icon:<IoNewspaperOutline />,
        link:"#"
    },
    {
        title:"contact",
        icon:<BsEnvelopeAtFill />,
        link:"#"
    },
]

export default function SideNav(){
    const scrollbarStyle = `
        .custom-scrollbar::-webkit-scrollbar {
        width: 5px;
      }
      
      .custom-scrollbar::-webkit-scrollbar-track {
        background: #ecf0f1;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
      }
      
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #f1c40f;
        border-radius: 10px;
        min-height: 40px;
      }
    `;
    return(
        <>
        <style jsx>{scrollbarStyle}</style>
        <section className="custom-scrollbar px-5 py-5 overflow-y-scroll fixed top-0 left-0 w-1/4 h-screen">
            <div>
                <div className="flex justify-center mb-2.5">
                    <div className="h-20 w-20 rounded-full bg-amber-300 flex justify-center items-center">

                    </div>
                </div>
                
                <div className="text-center space-y-1 mb-5">
                    <h2 className={`${jost.className} text-2xl capitalize text-black/80 font-bold`}>
                        raiyan khan
                    </h2>
                    <h4 className={`${jost.className} text-sm capitalize text-black/80 font-normal`}>
                        Front end developer
                    </h4>
                </div>

                <div className="flex flex-row justify-center gap-x-2.5 mb-10">
                   {
                    socialLink.map((items,index)=>{
                        return <span className="h-[32px] w-[32px] rounded-full border border-amber-300 flex justify-center items-center text-amber-300" key={index}>
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
                        return <Link className={`${jost.className} flex flex-row gap-x-2.5 items-center w-full bg-amber-300 py-2 rounded-lg px-4 text-white text-base font-medium capitalize`} href={items.link} key={index}>
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
                <button className={`${jost.className} capitalize font-semibold gap-x-2 bg-amber-300 text-white px-2 py-1 rounded-full flex flex-row items-center`}>
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