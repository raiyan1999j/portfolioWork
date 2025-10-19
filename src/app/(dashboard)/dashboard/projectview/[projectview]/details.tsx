"use client";
import DashLoading from "@/app/(dashboard)/loading";
import AlertModal from "@/app/component/ui/alertmodal";
import { InfoProvider } from "@/app/contextprovider/contextprovider";
import { formDataConverter } from "@/lib/helper";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CldImage } from "next-cloudinary";
import { Anton, Caprasimo, Jost } from "next/font/google";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { ImCross } from "react-icons/im";

type ProjectInfoTypes = {
    projectInfo: {type:string,id:string}
}

type ImageArray = {
    current:File | null,
    previous : string
}

type ProjectDetailsType = {
    id:string | null,
    parenttable: string,
    imageArray:ImageArray[],
    selectedImg:File | null,
    description:string | null,
    title:string | null,
    github: string | null,
    live: string | null
}

interface ProjectDetailsExtend extends ProjectDetailsType{
    id: string,
    imgcontainer:string[],
}

const anton = Anton({
    subsets:["latin"],
    weight:["400"]
})

const jost = Jost({
    subsets:["latin"]
})

const caprasimo = Caprasimo({
    subsets:["latin"],
    weight:["400"]
})

export default function Details({projectInfo}:ProjectInfoTypes){
    const context = useContext(InfoProvider);

    if(!context) throw new Error("context error");

    const {setContentLoader,handleModal} = context;

    const [projectDetails,setProjectDetails] = useState<ProjectDetailsType>({
        id:null,
        parenttable: projectInfo.id,
        imageArray:[],
        selectedImg:null,
        description:null,
        title:null,
        github:null,
        live:null
    });

    const {isLoading,isError,data} = useQuery<ProjectDetailsExtend>({
        queryKey:["projectDetails"],
        queryFn:async()=>{
            const getData = projectInfo.type === "childtable" ? await axios(`/api/projectdetailsget?tableId=${projectInfo.id}`) : null;

            const response = getData?.data.data ?? null;

            return response;
        }
    });

    const addProject= useMutation({
        mutationFn:async(formData:FormData)=>{
            const postData = await axios.post("/api/projectadd",formData);
            const getData = postData;

            if(getData.status === 200){
                handleModal("success",getData.data.message);

                setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,fullLoad:false}}));

                setProjectDetails({
                    id:null,
                    parenttable:projectInfo.id,
                    imageArray:[],
                    selectedImg:null,
                    description:null,
                    title:null,
                    github:null,
                    live:null
                });
            }else{
                handleModal("danger",getData.data.message);

                setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,fullLoad:false}}))
            }
        }
    });

    const removeProjectImg = useMutation({
        mutationFn:async({formData,indexNum,tableId}:{formData:FormData,indexNum:string,tableId:string})=>{
            const putData = await axios.put(`/api/projectimgremove?indexNum=${indexNum}&&tableId=${tableId}`,formData);

            const getData = putData;
            
            if(getData.status == 200){
                handleModal("success",getData.data.message)

                setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,fullLoad:false}}));
            }else{
                handleModal("danger",getData.data.message);

                setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,fullLoad:false}}));

                console.log(getData.data.message)
            }
        }
    })

    const inputHandler=(event:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
        const {name,value} = event.target;
        
        const files = (event.target as HTMLInputElement).files;

        if(files?.[0]){
            setProjectDetails(prev=>({...prev,imageArray:[...prev.imageArray,{current:files[0],previous:""}]}));
        }else{
            setProjectDetails(prev=>({...prev,[name]:value}));
        }
    }

    const projectAdd=()=>{
        const copy = projectDetails;
        const {selectedImg,...obj} = copy;

        const formData = new FormData();

        Object.entries(obj).forEach(([key,value])=>{
            if(typeof value == "string"){
                formData.append(key,value)
            }

            if(Array.isArray(value)){
                value.forEach((items,index)=>{
                    if(items.current instanceof File){
                        formData.append(`current${index}`,items.current)
                    }else{
                        formData.append(`current${index}`,items.current ?? "")
                    }

                    if(typeof items.previous == "string"){
                        formData.append(`previous${index}`,items.previous);
                    }
                })
            }
        });
        
        setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,fullLoad:true}}));

        addProject.mutate(formData);
    }

    const removeImgContainer=(indexNum:number | string)=>{
        if(typeof indexNum == "number"){
            setProjectDetails(prev=>({...prev,imageArray:prev.imageArray.filter((_,index)=> index !== indexNum)}));
        }else{
            const copy = projectDetails.imageArray.filter(items=>items.previous !== indexNum);
            const processArr = copy.map(items=>items.previous);

            setProjectDetails(prev=>({...prev,imageArray:copy}));

            formDataConverter(processArr,"imgcontainer",(formData)=>{removeProjectImg.mutate({formData,indexNum,tableId:projectInfo.id})});

            setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,fullLoad:true}}));
        }
    }

    useEffect(()=>{
        if(data){
            const {imgcontainer,...copy} = data;

            setProjectDetails({
                ...copy,
                imageArray: imgcontainer?.map((items,index)=>({
                    current: null,
                    previous: items
                })) || []
            })
        }
    },[data])
    return(
        <>
        <DashLoading/>
        <AlertModal/>
        <div className="mt-5">
            <h2 className={`${caprasimo.className} text-6xl capitalize text-[var(--darkDashTxt,rgba(0,0,0,0.8))] relative after:absolute after:h-2 after:w-[25%] after:bg-rose-500 after:bottom-[-10px] after:left-0`}>
                Project details
            </h2>
        </div>

        <div className="grid grid-cols-5 gap-x-5 mt-5">
            <div className="col-span-3 shadow-[3px_5px_5px_#3498db]/40 px-2.5 py-5 rounded-xl">
                <div className="w-full rounded-xl ">
                    <div className="h-[200px] w-full border border-black/20 rounded-lg relative">
                        {
                            projectDetails.imageArray[3]?.current instanceof File?
                            <Image src={URL.createObjectURL(projectDetails.imageArray[3].current)} fill alt="projectImg" className="absolute object-contain"/>:
                            projectDetails.imageArray[3]?.previous?
                            <CldImage fill src={projectDetails.imageArray[3].previous} alt="projectImg" className="absolute object-contain"/>:null
                        }
                    </div>

                    <div className="grid grid-cols-3 gap-x-5 mt-5">
                    {
                        [...Array(3)].map((_,index)=>{
                            return <div className="h-20 w-full border border-black/20 rounded-xl relative" key={index}>
                                {
                                    projectDetails.imageArray[index] ?

                                    projectDetails.imageArray[index].current instanceof File?
                                    <>
                                        <button className="absolute -top-2 -right-1 text-rose-200 transition-all duration-150 ease-linear hover:text-rose-500 hover:scale-125" onClick={()=>{removeImgContainer(index)}}>
                                            <ImCross />
                                        </button>
                                        <Image src={URL.createObjectURL(projectDetails.imageArray[index].current)} fill alt="projectImg" className="absolute object-contain"/>
                                    </>:

                                    projectDetails.imageArray[index]?.previous ?
                                    <>
                                        <button className="absolute -top-2 -right-1 text-rose-200 transition-all duration-150 ease-linear hover:text-rose-500 hover:scale-125" onClick={()=>{removeImgContainer(projectDetails.imageArray[index].previous)}}>
                                            <ImCross />
                                        </button>
                                        <CldImage src={projectDetails.imageArray[index].previous} fill alt="projectImg" className="absolute object-contain"/>
                                    </>:
                                    null
                                    :
                                    null
                                }
                            </div>
                        })
                    }
                </div>
                </div>

                <div className="w-[60%] h-10  rounded-xl mt-5 relative border border-black/20">
                    <label htmlFor="selectedImg" className={`absolute h-full w-full flex items-center px-2.5 ${projectDetails.imageArray.length >= 4 ? "hover:cursor-not-allowed":""}`}>
                        <input type="file" name="selectedImg" id="selectedImg" className="absolute h-full w-full hidden" accept="image/*" onChange={inputHandler} disabled={projectDetails.imageArray.length >= 4 ? true: false}/>

                        {
                            projectDetails.selectedImg?
                            <span className={`${jost.className} text-black/40 capitalize`}>
                                {projectDetails.selectedImg.name}
                            </span>:
                            <span className={`${jost.className} text-black/40 capitalize`}>
                            browse your image
                            </span>
                        }

                    </label>
                </div>

                <div className="w-full mt-5 rounded-xl  border border-black/20">
                    <textarea name="description" value={projectDetails.description??""} className={`${jost.className} font-medium text-base text-black/80 h-[300px] w-full rounded-xl p-2.5 focus:outline-none`} onChange={inputHandler}></textarea>
                </div>  
            </div>

            <div className="col-span-2 py-5 px-2.5">
                <div className="w-full h-10 shadow-[3px_5px_5px_#3498db]/20 rounded-lg">
                    <input type="text" name="title" value={projectDetails.title??""} className={`${jost.className} placeholder:text-black/20 placeholder:font-medium focus:outline-none focus:border-black/50 placeholder:capitalize px-2.5 h-full w-full border border-black/20 rounded-lg`} placeholder="title" autoComplete="off" onChange={inputHandler}/>
                </div>

                <div className="mt-10">
                    <div className="shadow-[5px_0px_3px_#3498db]/20 py-2.5 px-5 inline rounded-tl-lg rounded-tr-lg">
                        <label htmlFor="github" className={`${anton.className} tracking-widest text-black/70 capitalize`}>
                            github-link
                        </label>
                    </div>
                </div>
                <div className="w-full shadow-[5px_0px_5px_#3498db]/20 translate-y-[9px] py-2.5 rounded-xl px-2.5">
                    <div className="h-10 w-full">
                        <input type="text" name="github" value={projectDetails.github??""} id="github" className={`${jost.className} placeholder:text-black/20 placeholder:font-medium focus:outline-none focus:border-black/50 placeholder:capitalize px-2.5 h-full w-full border border-black/20 rounded-lg`} onChange={inputHandler}/>
                    </div>
                </div>

                 <div className="mt-10">
                    <div className="shadow-[5px_0px_3px_#3498db]/20 py-2.5 px-5 inline rounded-tl-lg rounded-tr-lg">
                        <label htmlFor="live" className={`${anton.className} tracking-widest text-black/70 capitalize`}>
                            live-link
                        </label>
                    </div>
                </div>
                <div className="w-full shadow-[5px_0px_5px_#3498db]/20 translate-y-[9px] py-2.5 rounded-xl px-2.5">
                    <div className="h-10 w-full">
                        <input type="text" name="live" value={projectDetails.live??""} id="live" className={`${jost.className} placeholder:text-black/20 placeholder:font-medium focus:outline-none focus:border-black/50 placeholder:capitalize px-2.5 h-full w-full border border-black/20 rounded-lg`} onChange={inputHandler}/>
                    </div>
                </div>

                <div className="flex flex-row justify-end w-full mt-10">
                    {
                        projectDetails.id?
                        <button className={`${anton.className} px-5 py-2.5 bg-[#3498db] text-white rounded-xl uppercase transtion-all duration-150 ease-linear hover:bg-[#2980b9]`} onClick={projectAdd}>
                        Update Project
                        </button>:
                        <button className={`${anton.className} px-5 py-2.5 bg-[#2ecc71] text-white rounded-xl uppercase transtion-all duration-150 ease-linear hover:bg-[#27ae60]`} onClick={projectAdd}>
                        Add project
                        </button>
                    }
                    
                </div>
            </div>
        </div>
        </>
    )
}