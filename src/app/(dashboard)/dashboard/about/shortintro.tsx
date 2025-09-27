"use client";
import AlertModal from "@/app/component/ui/alertmodal";
import { InfoProvider } from "@/app/contextprovider/contextprovider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CldImage } from "next-cloudinary";
import { Anton, Caprasimo, Jost } from "next/font/google"
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { FaBold } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { TbCaptureFilled } from "react-icons/tb";
import CommonLoadingUi from "@/app/loading";

type ShortIntroData = {
    id:string,
    intro:string | null,
    skills:string[] | null,
    bio:string,
    profilepic: string | null
}

type InfoContainerType = {
    id:string | null,
    intro: string | null,
    skillList: string[],
    skills:string | null,
    bio: string | null,
    profilePic: File | null,
    previousPic: string | null
}

const anton = Anton({
    subsets:['latin'],
    weight:['400']
});

const jost = Jost({
    subsets:['latin']
});

const caprasimo = Caprasimo({
    subsets:["latin"],
    weight:["400"]
})
export default function ShortIntro(){
    const context = useContext(InfoProvider);

    if(!context) throw new Error("context error");

    const {handleModal,setContentLoader} = context;
    const editRef = useRef<HTMLDivElement|null>(null);
    const [infoContainer,setContainer] = useState<InfoContainerType>({
        id:null,
        intro:null,
        skillList:[],
        skills:null,
        bio:null,
        profilePic: null,
        previousPic: null
    });

    const queryClient = useQueryClient();

    const {isLoading,isError,data} = useQuery<ShortIntroData>({
        queryKey:["shortIntro"],
        queryFn:async()=>{
            const get = await axios("/api/shortintroget");
            const data= get.data.data?.[0] ?? null;

            return data;
        }
    })
    
    const addIntro = useMutation({
        mutationFn:async (formData:FormData)=>{
            const postData = await axios.post("/api/shortintroadd",formData);
            const response = postData;

            if(response.status === 200){
                setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,fullLoad:false}}));

                handleModal("success",response.data.message)
            }else{
                setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,fullLoad:false}}));
                handleModal("danger",response.data.message)
            }
            return response;
        },
        onSuccess:()=>{queryClient.invalidateQueries({queryKey:["shortIntro"]})}
    });

    const updateIntro = useMutation({
        mutationFn:async(formData:FormData)=>{
            const putData = await axios.put("/api/shortintroupdate",formData);
            const response = putData;

            if(response.status === 200){
                setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,fullLoad:false}}));;

                handleModal("info",response.data.message)
            }else{
                setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,fullLoad:false}}));
                handleModal("danger",response.data.message)
            }
        },

        onSuccess:()=>{queryClient.invalidateQueries({queryKey:["shortIntro"]})}
    });

    const handleInput=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value,files} = event.target;

        if(files?.[0]){
            setContainer(prev=>({...prev,profilePic:files[0]}))
        }else{
            setContainer(prev=>({...prev,[name]:value}));
        }
    }

    const addSkill=()=>{
        if(!infoContainer.skills) return;

        const copy = [...infoContainer.skillList,infoContainer.skills];

        setContainer(prev=>({...prev,skillList:copy,skills:null}))
    }

    const removeSkill=(skillIndex:number)=>{
        const copy = infoContainer.skillList;
        const update = copy.filter((_,index)=> index !== skillIndex);

        setContainer(prev=>({...prev,skillList:update}));
    }

    const textEditorInput=(event:React.FormEvent<HTMLDivElement>)=>{
        const update = event.currentTarget.innerHTML;
        setContainer(prev=>({...prev,bio:update}))
    }

    const textEditorAction=(action:string)=>{
        document.execCommand(action,false)
    }

    const introAdd=()=>{
        setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,fullLoad:true}}));

        const copy = {
            intro: infoContainer.intro,
            skills: infoContainer.skillList,
            bio: infoContainer.bio,
            profilepic: infoContainer.profilePic
        }

        const formData = new FormData();

        Object.entries(copy).forEach(([key,value])=>{
            if(typeof value == "string"){
                formData.append(key,value)
            }

            if(value instanceof File){
                formData.append(key,value)
            }

            if(Array.isArray(value)){
                value.forEach((items,index)=>{
                    formData.append(`skills${index}`,items)
                })
            }
        });

        addIntro.mutate(formData);
    }

    const introUpdate=(idNum:string)=>{
        setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,fullLoad:true}}));

        const copy = {
            id:idNum,
            intro: infoContainer.intro,
            skills: infoContainer.skillList,
            bio: infoContainer.bio,
            profilepic: infoContainer.profilePic,
            previouspic: infoContainer.previousPic
        }
        const formData = new FormData();

        Object.entries(copy).forEach(([key,value])=>{
            if(typeof value == "string"){
                formData.append(key,value)
            }

            if(value instanceof File){
                formData.append(key,value)
            }

            if(Array.isArray(value)){
                value.forEach((items,index)=>{
                    formData.append(`skills${index}`,items)
                })
            }
        });

        updateIntro.mutate(formData)
    }

    useEffect(()=>{
        if(data){
            setContainer({id:data.id,intro:data.intro,skillList:data.skills ?? [],bio:data.bio,profilePic:null,previousPic:data.profilepic,skills:null});

            editRef.current!.innerHTML = data.bio;
        }
    },[data])
    return(
        <>
        <CommonLoadingUi/>
        <AlertModal/>
        <div className="text-right mt-5">
            <h2 className={`${caprasimo.className} text-6xl capitalize text-[var(--darkDashTxt,rgba(0,0,0,0.8))] relative after:absolute after:h-2 after:w-[25%] after:bg-rose-500 after:bottom-[-10px] after:right-0`}>
                provide short intro.
            </h2>
        </div>

        <div className="grid grid-cols-3 px-10 mt-10">
            <div className="col-span-2 space-y-10">
                <div className="space-y-2.5">
                    <div>
                        <h2 className={`${anton.className} text-4xl capitalize tracking-wider text-transparent`} style={{WebkitTextStroke:"2px var(--darkDashTxt,rgba(0,0,0,0.8))"}}>
                            who you are!!
                        </h2>
                    </div>

                    <div className="flex flex-row gap-x-5">
                        <div className="h-10 w-[80%]">
                            <input type="text" name="intro" value={infoContainer.intro ?? ""} className={`${jost.className} h-full w-full bg-[#ecf0f1]/50 rounded-lg px-5 text-[var(--darkDashTxt,rgba(0,0,0,0.8))] font-medium focus:outline-none placeholder:text-[var(--darkDashTxt,rgba(0,0,0,0.2))]`} onChange={(event)=>{handleInput(event)}} placeholder="short intro."/>
                        </div>
                    </div>
                </div>

                <div className="space-y-2.5">
                    <div>
                        <h2 className={`${anton.className} text-4xl capitalize tracking-wider text-transparent`} style={{WebkitTextStroke:"2px var(--darkDashTxt,rgba(0,0,0,0.8))"}}>
                            heighlight your skills
                        </h2>
                    </div>

                    <div className="flex flex-row gap-x-5">
                        <div className="h-10 w-[30%]">
                            <input type="text" name="skills" value={infoContainer.skills ?? ""} className={`${jost.className} h-full w-full bg-[#ecf0f1]/50 rounded-lg px-5 text-[var(--darkDashTxt,rgba(0,0,0,0.8))] font-medium focus:outline-none placeholder:text-[var(--darkDashTxt,rgba(0,0,0,0.2))]`} placeholder="add skills" onChange={(event)=>{handleInput(event)}}/>
                        </div>

                        <div>
                            <button type="button" className={`${jost.className} font-bold bg-[#2ecc71] py-2 px-4 rounded-xl text-white transition-all duration-150 ease-linear hover:bg-[#27ae60]`} onClick={addSkill}>
                                add
                            </button>
                        </div>
                    </div>

                    <div className="py-10 px-2.5 w-[80%] rounded-lg shadow-[0px_0px_4px_var(--darkDashTxt,rgba(0,0,0,0.2))] flex flex-row gap-x-2.5 gap-y-5">
                        {
                            infoContainer.skillList.map((items,index)=>{
                                return <span key={index} className={`bg-[var(--darkDashTxt,#ecf0f1)] px-4 py-2 rounded-full relative ${jost.className}`}>
                                    {items}

                                    <button type="button" className="absolute -top-4 text-rose-500 hover:cursor-pointer hover:scale-125" onClick={()=>{removeSkill(index)}}>
                                        <RxCross2 />
                                    </button>
                                </span>
                            })
                        }
                    </div>
                </div>

                <div className="space-y-2.5">
                    <div>
                        <h2 className={`${anton.className} text-4xl capitalize tracking-wider text-transparent`} style={{WebkitTextStroke:"2px var(--darkDashTxt,rgba(0,0,0,0.8))"}}>
                            write your short bio
                        </h2>
                    </div>

                    <div className={`${jost.className} text-[var(--darkDashTxt,rgba(0,0,0,0.8))] py-5 px-2.5 w-[80%] rounded-lg shadow-[0px_0px_4px_var(--darkDashTxt,rgba(0,0,0,0.2))] focus:outline-none`}
                    contentEditable
                    suppressContentEditableWarning
                    ref={editRef}
                    onInput={(event)=>{textEditorInput(event)}}
                    >

                    </div>

                    <div className="flex flex-row justify-end w-[80%]">
                        <button className={`${anton.className} text-xl capitalize tracking-wider text-[var(--darkDashBg,rgba(0,0,0,0.8))] p-3 bg-[var(--darkDashTxt,#ecf0f1)] rounded-xl transition-all duration-150 ease-linear hover:bg-[var(--darkDash,rgba(0,0,0,0.8))] hover:text-[var(--darkDashTxt,white)] hover:cursor-pointer`} onClick={()=>{textEditorAction("bold")}}>
                            <FaBold />
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <div className="h-[407px] w-[325px] relative rounded-lg shadow-lg shadow-black/20 overflow-hidden">
                        <label htmlFor="profileUpload" className="h-full w-full top-0 left-0 absolute flex justify-center items-center">
                            {
                                infoContainer.profilePic ?
                                <Image src={URL.createObjectURL(infoContainer.profilePic)} fill alt="profilePic"/>:
                                infoContainer.previousPic ?
                                <CldImage fill src={infoContainer.previousPic} alt="profilepic"/> : null
                            }

                            <input type="file" accept="image/*" name="profilePic" id="profileUpload" className="hidden" onChange={(event)=>{handleInput(event)}}/>

                            
                            <span className={`text-8xl ${infoContainer.profilePic?"text-white":"text-[var(--darkDashTxt,rgba(0,0,0,0.8))]"}  hover:scale-110 active:scale-90 z-10`}>
                                <TbCaptureFilled />
                            </span>
                        </label>
                </div>
            </div>
        </div>

        <div className="flex flex-row justify-end mt-10 py-5">
            <div>
                {
                    data?
                    <button className={`${jost.className} text-xl font-semibold px-4 py-1 rounded-xl bg-[#3498db] text-white transition-all duration-200 ease-linear hover:bg-[#2980b9] hover:cursor-pointer`} onClick={()=>{introUpdate(data.id)}}>
                    update info
                    </button>:
                    <button className={`${jost.className} text-xl font-semibold px-4 py-1 rounded-xl bg-[#2ecc71] text-white transition-all duration-200 ease-linear hover:bg-[#27ae60] hover:cursor-pointer`} onClick={introAdd}>
                    Add the info
                </button>
                }
            </div>
        </div>

        <span className="block h-[1px] w-full bg-gray-500/20 mt-10"></span>
        </>
    )
}