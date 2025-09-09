import { Jost } from "next/font/google";
import ResuableIntro from "../reusable/introduction/introduction";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io5";

const social = [
    {
        icon:<FaFacebookF />,
        link:"www.facebook.com"
    },
    {
        icon:<FaInstagram />,
        link:"www.facebook.com"
    },
    {
        icon:<FaLinkedinIn />,
        link:"www.facebook.com"
    },
    {
        icon:<IoLogoGithub />,
        link:"www.facebook.com"
    }
]

const jost = Jost({
    subsets:["latin"]
})

export default function Introduction(){
    return(
        <>
        <ResuableIntro mainHeader={"reach out"} subHeader={"contact"}/>

        <section className="px-4 mt-5">
            <div className="w-[80%] mx-auto text-center">
                <p className={`${jost.className} text-[var(--dartTxt,rgba(0,0,0,0.8))]`}>
                    Interested in hiring me for your project or just want to say hi? You can fill in the contact form below or send me an email to <span className="text-[var(--combineColor)]">raiyank317@gmail.com</span> .Want to get connected? Follow me on the social channels below.
                </p>
            </div>
        </section>

        <section className="px-4 mt-5">
            <div className="flex flex-row justify-center gap-x-5">
                {
                    social.map((items,index)=>{
                        return <a href={items.link} target="_blank" key={index} className="h-10 w-10 rounded-full flex justify-center items-center border border-black/20 transition-all duration-150 ease-linear text-[var(--combineColor)] hover:bg-[var(--combineColor)] hover:text-white hover:border-none">
                            {items.icon}
                        </a>
                    })
                }
            </div>

            <span className="h-[1px] w-full block bg-black/10 mt-20"></span>
        </section>
        </>
    )
}