"use client";
import { Anton, Caprasimo, Jost } from "next/font/google";
import Image from "next/image";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";

type RoleContainerType = {
    logo:File | null,
    title: string | null,
    description: string | null
}

type HeadingContainerType = {
    mainHeadline: string | null,
    subHeadline : string | null
}

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
});
export default function Activities(){
    const [headingContainer,setHeadingContainer] = useState<HeadingContainerType>({
        mainHeadline:null,
        subHeadline: null
    })
    const [roleContainer,setRoleContainer] = useState<RoleContainerType>({
        logo:null,
        title:null,
        description:null
    });

    const [roleArray,setRoleArray] = useState<RoleContainerType[]>([]);

    const reusableInput=(category:string,label:string|null,type:string|null,accept:string|null,name:string|null,id:string|null,value:string|File|null)=>{
        return category == "fileCategory" ? <label htmlFor={label ?? ""} className="h-full w-full absolute flex justify-center items-center">
            {
                value instanceof File?
                <Image fill src={URL.createObjectURL(value)} alt="logoImg"/>: 
                null
            }

            <input type="file" accept="image/*" name="logo" id={id??""} className="h-full w-full absolute top-0 left-0 hidden" onChange={(event)=>{handleInput(event)}}/>

            <span className="text-xl hover:scale-90">
                <IoMdAdd />
            </span>
        </label>:
        category == "textCategory"?
        <input type={type ?? ""} name={name??""} value={typeof value == "string" ? value : ""} className={`${anton.className} font-semibold capitalize text-xl text-[var(--darkTxt,rgba(0,0,0,0.8))] border-b border-b-black/20 focus:outline-none focus:border-b-black/40`} placeholder="title" onChange={(event)=>{handleInput(event)}}/>:

        <textarea name={name ?? ""} value={typeof value == "string" ? value : ""} className={`${jost.className} text-base text-[var(--darkTxt,rgba(0,0,0,0.8))] h-[150px] w-full border border-black/20 rounded-xl focus:outline-none focus:border-black/40 px-2 py-4`} placeholder="write short description" onChange={(event)=>{handleInput(event)}}></textarea>
    }

    const handleInput=(event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const {name,value} = event.target;
        const files = (event.target as HTMLInputElement).files;

        if(files?.[0]){
            setRoleContainer(prev=>({...prev,[name]:files[0]}))
        }else{
            if(name == "mainHeadline" || name == "subHeadline"){
                setHeadingContainer(prev=>({...prev,[name]:value}))
            }else{
                setRoleContainer(prev=>({...prev,[name]:value}));
            }
        }
    }

    const headlineAdd=()=>{
        console.log(headingContainer)
    }

    const roleAdd=()=>{
        setRoleArray(prev=>([...prev,roleContainer]));

        setRoleContainer({logo:null,title:null,description:null})
    }
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
                        <input type="text" name="mainHeadline" id="mainHeadline" className={`${jost.className} text-[var(--darkDashTxt,rgba(0,0,0,0.8))] font-medium px-4 placeholder:text-[var(--darkDashTxt,rgba(0,0,0,0.5))] placeholder:px-4 focus:outline-none focus:border-black/40 h-full w-full border border-black/20 rounded-xl`} placeholder="main headline" onChange={(event)=>{handleInput(event)}}/>
                    </div>
                </div>

                <div className="w-[30%]">
                    <label htmlFor="subHeadline" className={`${anton.className} text-[var(--darkDashTxt,rgba(0,0,0,0.8))] text-xl font-semibold`}>sub headline</label>

                    <div className="w-full h-[50px] mt-4">
                        <input type="text" name="subHeadline" id="subHeadline" className={`${jost.className} text-[var(--darkDashTxt,rgba(0,0,0,0.8))] font-medium px-4 placeholder:text-[var(--darkDashTxt,rgba(0,0,0,0.5))] placeholder:px-4 focus:outline-none focus:border-black/40 h-full w-full border border-black/20 rounded-xl`} placeholder="sub headline" onChange={(event)=>{handleInput(event)}}/>
                    </div>
                </div>

                <div className="mt-10">
                    <button type="button" className={`${jost.className} text-white font-medium px-2 py-3 rounded-xl bg-[#2ecc71] transition-all duration-200 ease-linear hover:bg-[#27ae60] hover:cursor-pointer`} onClick={headlineAdd}>
                        add headline
                    </button>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-3 gap-x-5 mt-5">
            {
                roleArray.map((items,index)=>{
                    return <div key={index}>
                        <div className="px-5 py-5 rounded-xl shadow-[1px_2px_5px_rgba(0,0,0,0.2),inset_-1px_0px_2px_rgba(0,0,0,0.1)] space-y-5">
                            <div>
                                <div className="h-12 w-12 border border-black/20 rounded-lg relative overflow-hidden">
                                    {reusableInput("fileCategory","logoupload","file","image/*","logo","logoupload",items.logo)}
                                </div>
                            </div>
                            <div>
                                <div className="h-5 w-[80%]">
                                    {reusableInput("textCategory",null,"text",null,"title",null,items.title)}
                                </div>
                            </div>
                            <div>
                                {reusableInput("textareaCategory",null,null,null,"description",null,items.description)}
                            </div>
                        </div>

                        <div className="w-full flex justify-end gap-x-5 mt-5">
                         <button type="button" className={`${jost.className} text-white font-medium px-2 py-1 rounded-xl bg-[#2ecc71] transition-all duration-200 ease-linear hover:bg-[#27ae60] hover:cursor-pointer`} onClick={roleAdd}>
                            update role
                        </button>

                        <button type="button" className={`${jost.className} text-white font-medium px-2 py-1 rounded-xl bg-[#2ecc71] transition-all duration-200 ease-linear hover:bg-[#27ae60] hover:cursor-pointer`} onClick={roleAdd}>
                            remove role
                        </button>
            </div>
                    </div>
                })
            }
            <div>
            <div className="px-5 py-5 rounded-xl shadow-[1px_2px_5px_rgba(0,0,0,0.2),inset_-1px_0px_2px_rgba(0,0,0,0.1)] space-y-5">
                            <div>
                                <div className="h-12 w-12 border border-black/20 rounded-lg relative overflow-hidden">
                                    {reusableInput("fileCategory","logoupload","file","image/*","logo","logoupload",roleContainer.logo)}
                                </div>
                            </div>
                            <div>
                                <div className="h-5 w-[80%]">
                                    {reusableInput("textCategory",null,"text",null,"title",null,roleContainer.title)}
                                </div>
                            </div>
                            <div>
                                {reusableInput("textareaCategroy",null,null,null,"description",null,roleContainer.description)}
                            </div>
            </div>

            <div className="w-full flex justify-end mt-5">
                <button type="button" className={`${jost.className} text-white font-medium px-2 py-1 rounded-xl bg-[#2ecc71] transition-all duration-200 ease-linear hover:bg-[#27ae60] hover:cursor-pointer`} onClick={roleAdd}>
                    add role
                </button>
            </div>
            </div>
        </div>
        </>
    )
}