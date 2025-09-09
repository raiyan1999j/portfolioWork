import { Anton, Jost } from "next/font/google"
import { FiPhone } from "react-icons/fi"
import { IoLogoGithub } from "react-icons/io5"
import { MdOutlineLocationOn } from "react-icons/md"
import { SiMaildotru } from "react-icons/si"

const personalData = [
    {
        icon:<FiPhone />,
        content: "01866665158",
    },
    {
        icon:<SiMaildotru />,
        content: "raiyank317@gmail.com",
    },
    {
        icon:<MdOutlineLocationOn />,
        content: "Mirpur-2,Dhaka,Bangladesh",
    }
]

const skills = [
    {
        title:"technical",
        items:["Javascript/React/Typescript","Tailwindcss/Next.js","html/css"]
    },
    {
        title:"professional",
        items:["team work","communication","problem solver"]
    }
]

const jost = Jost({
    subsets:["latin"]
});

const anton = Anton({
    subsets:["latin"],
    weight:['400']
})
export default function Details(){
    return(
        <>
        <section className="px-4 mt-20">
            <div className="bg-[rgba(209,204,192,0.2)] w-full rounded-xl p-10">

                <div className="grid grid-cols-3 gap-x-5 py-5 border-b border-b-black/10">
                    <div className="col-span-2 space-y-4 border-r border-r-black/20">
                        <h2 className={`${anton.className} text-5xl text-[var(--combineColor)]`}>
                            Raiyan Khan
                        </h2>
                        <div>
                            <h3 className={`${jost.className} text-[var(--darkTxt,rgba(0,0,0,0.8))] text-xl capitalize font-semibold`}>
                                Frontend developer
                            </h3>
                        </div>
                    </div>

                    <div>
                        <ul className="flex flex-col gap-y-4">
                            {
                                personalData.map((items,index)=>{
                                    return <li className={`${jost.className} text-[var(--darkTxt,rgba(0,0,0,0.8))] flex flex-row items-center gap-x-4`} key={index}>
                                        <span>
                                            {items.icon}
                                        </span>
                                        <span className="font-medium">
                                            {items.content}
                                        </span>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                </div>

                <div className="grid grid-cols-3 items-center py-10 border-b border-b-black/10">
                    <div>
                        <div className="h-[150px] w-[150px] rounded-full bg-[var(--combineColor)]">

                        </div>
                    </div>

                    <div className="col-span-2">
                        <p className={`${jost.className} text-[var(--darkTxt,rgba(0,0,0,0.8))]`}>
                            Summarise your career here. You can make a PDF version of your resume using our free Sketch template here. Donec quam felis, ultricies nec, pellentesque eu. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-6 gap-x-5 py-5 border-b border-b-black/10">
                    <div className="col-span-4 border-r border-r-black/10 px-5">
                        <div className="border-l-[5px] border-l-[var(--combineColor)] px-4 mb-5">
                            <h3 className={`${anton.className} text-[var(--combineColor)] text-3xl capitalize`}>
                                Work experience
                            </h3>
                        </div>

                        <div className="space-y-10">
                            <div className="space-y-5">
                                <div className="flex flex-row justify-between">
                                <div>
                                    <h5 className={`${jost.className} text-[var(--darkTxt,rgba(0,0,0,0.8))] font-bold capitalize text-xl`}>
                                        Senior Software Engineer
                                    </h5>
                                </div>

                                <div className="flex flex-row gap-x-4">
                                    <span className={`${jost.className} text-[var(--darkTxt,rgba(0,0,0,0.4))] border-b border-b-black/20`}>
                                        google
                                    </span>
                                    <span className={`${jost.className} text-[var(--darkTxt,rgba(0,0,0,0.4))] border-b border-b-black/20`}>
                                        2023 - present
                                    </span>
                                </div>
                            </div>

                            <div>
                                <p className={`${jost.className} text-[var(--darkTxt,rgba(0,0,0,0.5))] text-justify`}>
                                    Role description goes here ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Donec pede justo, fringilla vel. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis.
                                </p>
                            </div>
                            </div>
                            
                            <div className="space-y-5">
                                <div className="flex flex-row justify-between">
                                <div>
                                    <h5 className={`${jost.className} text-[var(--darkTxt,rgba(0,0,0,0.8))] font-bold capitalize text-xl`}>
                                        Senior Software Engineer
                                    </h5>
                                </div>

                                <div className="flex flex-row gap-x-4">
                                    <span className={`${jost.className} text-[var(--darkTxt,rgba(0,0,0,0.4))] border-b border-b-black/20`}>
                                        google
                                    </span>
                                    <span className={`${jost.className} text-[var(--darkTxt,rgba(0,0,0,0.4))] border-b border-b-black/20`}>
                                        2023 - present
                                    </span>
                                </div>
                            </div>

                            <div>
                                <p className={`${jost.className} text-[var(--darkTxt,rgba(0,0,0,0.5))] text-justify`}>
                                    Role description goes here ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Donec pede justo, fringilla vel. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis.
                                </p>
                            </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-2">
                        <div className="border-l-[5px] border-l-[var(--combineColor)] px-4 mb-5">
                            <h3 className={`${anton.className} text-[var(--combineColor)] text-3xl capitalize`}>
                                Skills
                            </h3>
                        </div>

                        <div className="space-y-10">
                            {
                                skills.map((items,index)=>{
                                    return <div key={index}>
                                        <div>
                                            <h4 className={`${jost.className} text-[var(--darkTxt,rgba(0,0,0,0.8))] font-bold capitalize text-xl`}>
                                                {items.title}
                                            </h4>

                                            <ul className="flex flex-col gap-y-2.5 mt-5 list-disc px-5">
                                                {items.items.map((subItems,subIndex)=>{
                                                    return <li className={`${jost.className} text-[var(--darkTxt,rgba(0,0,0,0.8))]`} key={subIndex}>
                                                        {subItems}
                                                    </li>
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className="py-5 w-full flex flex-row justify-center">
                    <div className="flex flex-row items-center gap-x-2.5 group/socialLink">
                        <span className="h-10 w-10 rounded-full flex justify-center items-center border border-black/20 text-[var(--combineColor)] transition-all duration-150 ease-linear group-hover/socialLink:bg-[var(--combineColor)] group-hover/socialLink:text-white">
                            <IoLogoGithub />
                        </span>

                        <span>
                            <a href="https://github.com/raiyan1999j" className={`${jost.className} text-[var(--darkTxt,rgba(0,0,0,0.8))] transition-all duration-150 ease-linear group-hover/socialLink:text-[var(--combineColor)]`}>
                                github.com
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}