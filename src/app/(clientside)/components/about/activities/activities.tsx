import { Anton, Caprasimo, Jost } from "next/font/google"
import { IoLogoJavascript } from "react-icons/io5"
import ResuableIntro from "../../reusable/introduction/introduction"

const activitiesData = [
    {
        icon:<IoLogoJavascript />,
        title:"javascript",
        content:"List skills and technologies here. Customize as needed. Built on HTML5, Sass, and Bootstrap 5."
    },
    {
        icon:<IoLogoJavascript />,
        title:"javascript",
        content:"List skills and technologies here. Customize as needed. Built on HTML5, Sass, and Bootstrap 5."
    },
    {
        icon:<IoLogoJavascript />,
        title:"javascript",
        content:"List skills and technologies here. Customize as needed. Built on HTML5, Sass, and Bootstrap 5."
    },
    {
        icon:<IoLogoJavascript />,
        title:"javascript",
        content:"List skills and technologies here. Customize as needed. Built on HTML5, Sass, and Bootstrap 5."
    },
    {
        icon:<IoLogoJavascript />,
        title:"javascript",
        content:"List skills and technologies here. Customize as needed. Built on HTML5, Sass, and Bootstrap 5."
    },
    {
        icon:<IoLogoJavascript />,
        title:"javascript",
        content:"List skills and technologies here. Customize as needed. Built on HTML5, Sass, and Bootstrap 5."
    },
    {
        icon:<IoLogoJavascript />,
        title:"javascript",
        content:"List skills and technologies here. Customize as needed. Built on HTML5, Sass, and Bootstrap 5."
    }
]

const jost = Jost({
    subsets:["latin"]
})

const caprasimo = Caprasimo({
    subsets:["latin"],
    weight:['400']
})

const anton = Anton({
    subsets:["latin"],
    weight:["400"]
})
export default function Activites(){
    return(
        <>
        <section className="px-4 bg-[var(--darkBg)] mt-10 space-y-20">
            <ResuableIntro mainHeader="what I do" subHeader="activities"/>

            <div className="grid grid-cols-3 gap-x-5 gap-y-10">
                {
                    activitiesData.map((items,index)=>{
                        return <div className="px-5 py-5 rounded-xl shadow-[1px_2px_5px_rgba(0,0,0,0.2),inset_-1px_0px_2px_rgba(0,0,0,0.1)] space-y-5" key={index}>
                            <div>
                                <span className="text-5xl text-lime-500">
                                    {items.icon}
                                </span>
                            </div>
                            <div>
                                <h4 className={`${anton.className} font-semibold capitalize text-xl text-[var(--darkTxt,rgba(0,0,0,0.8))]`}>
                                    {items.title}
                                </h4>
                            </div>
                            <div>
                                <p className={`${jost.className} text-base text-[var(--darkTxt,rgba(0,0,0,0.8))]`}>
                                    {items.content}
                                </p>
                            </div>
                        </div>
                    })
                }
            </div>
        </section>
        </>
    )
}