"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CldImage } from "next-cloudinary";
import { Anton, Caprasimo, Jost } from "next/font/google";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import Pagination from "./pagination";
import { InfoProvider } from "@/app/contextprovider/contextprovider";
import AlertModal from "@/app/component/ui/alertmodal";
import DashLoading from "../../loading";
import { formDataConverter } from "@/lib/helper";

type RoleDataType = {
    userData:RoleContainerType[],
    totalPage:number
}

type PageCofigTpe = {
    currentPage: number,
    offset: number
}

type RoleContainerType = {
    id:string | null,
    logo:File | null,
    previousLogo: string | File | null,
    title: string | null,
    description: string | null
}

type HeadingContainerType = {
    id: string | null,
    mainheadline: string | null,
    subheadline : string | null
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
    const context = useContext(InfoProvider);

    if(!context) throw new Error("context error");

    const {handleModal,setContentLoader} = context;

    const queryClinet = useQueryClient();

    const [pageConfig,setPageConfig] = useState<PageCofigTpe>({
        currentPage:1,
        offset:0
    });

    const [headingContainer,setHeadingContainer] = useState<HeadingContainerType>({
        id: null,
        mainheadline:null,
        subheadline: null
    });

    const [roleContainer,setRoleContainer] = useState<RoleContainerType>({
        id:null,
        logo:null,
        previousLogo:null,
        title:null,
        description:null
    });

    const [roleArray,setRoleArray] = useState<RoleContainerType[]>([]);

    const {isLoading:headlineLoad,isError:headlineError,data:headlineData} = useQuery<HeadingContainerType>({
        queryKey:["headLine"],
        queryFn:async()=>{
            const getData = await axios("/api/headlineget");
            const response= getData.data?.[0] ?? null;

            return response;
        }
    });

    const {isLoading:roleLoading,isError:roleError,data:roleData} = useQuery<RoleDataType>({
        queryKey:["userRole",pageConfig.offset],
        queryFn:async()=>{
            const getData = await axios(`/api/userroleget?skip=${pageConfig.offset}`);
            const response= getData.data;

            return response;
        }
    })

    const addHeadline = useMutation({
        mutationFn:async(formData:FormData)=>{
            const postData = await axios.post("/api/headlineadd",formData);
            const response = postData;

            if(response.status === 200){
                setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,fullLoad:false}}));
                handleModal("success",response.data.message)
            }else{
                setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,fullLoad:false}}));
                handleModal("danger",response.data.message);
            }

            return response;
        },

        onSuccess:()=>{queryClinet.invalidateQueries({queryKey:["headLine"]})}
    });

    const addRole = useMutation({
        mutationFn:async(formData:FormData)=>{
            const postData = await axios.post("/api/userroleadd",formData);
            const response = postData;

            if(response.status === 200){
                setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,fullLoad:false}}));
                handleModal("success",response.data.message)
            }else{
                setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,fullLoad:false}}));
                handleModal("danger",response.data.message);
            }

            return response;
        },

        onSuccess:()=>{queryClinet.invalidateQueries({queryKey:["userRole"]})}
    });

    const updateRole = useMutation({
        mutationFn:async(formData:FormData)=>{
            const updateData = await axios.put("/api/userroleupdate",formData);
            const response = updateData;

            if(response.status === 200){
                setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,fullLoad:false}}));
                handleModal("info",response.data.message)
            }else{
                setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,fullLoad:false}}));
                handleModal("danger",response.data.message);
            }

            return response
        }
    });

    const removeRole= useMutation({
        mutationFn:async(obj:{tableId:string|null,imgId:string|null})=>{
            const deleteData = await axios.delete("/api/userroledelete",{data:obj,
            headers:{
                "Content-Type" : "application/json"
            }
            });
            const response = deleteData;

            if(response.status === 200){
                setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,fullLoad:false}}));
                handleModal("warning",response.data.message)
            }else{
                setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,fullLoad:false}}));
                handleModal("danger",response.data.message);
            }

            return response;
        },
        
        onSuccess:()=>{queryClinet.invalidateQueries({queryKey:["userRole"]})}
    });

    const updateHeadline = useMutation({
        mutationFn:async(formData:FormData)=>{
            const updateData = await axios.put("/api/headlineupdate",formData);
            const response = updateData;

            if(response.status === 200){
                setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,fullLoad:false}}));
                handleModal("info",response.data.message)
            }else{
                setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,fullLoad:false}}));;
                handleModal("danger",response.data.message);
            }

            return response;
        },
        onSuccess:()=>{queryClinet.invalidateQueries({queryKey:["headLine"]})}
    });

    const reusableInput=(category:string,label:string|null,type:string|null,accept:string|null,name:string|null,id:string|null,value:string|File|null,stateIndex:number|null)=>{
        return category == "fileCategory" ? <label htmlFor={label ?? ""} className="h-full w-full absolute flex justify-center items-center">
            {
                value instanceof File?
                <Image fill src={URL.createObjectURL(value)} alt="logoImg"/>: 
                typeof value == "string" ?
                <CldImage fill src={value} alt="logo"/>:
                null
            }

            <input type={type??""} accept={accept ?? ""} name={name ?? ""} id={id??""} className="h-full w-full absolute top-0 left-0 hidden" onChange={(event)=>{handleInput(event,stateIndex)}}/>

            <span className="text-xl hover:scale-90">
                <IoMdAdd />
            </span>
        </label>:
        category == "textCategory"?
        <input type={type ?? ""} name={name??""} value={typeof value == "string" ? value : ""} className={`${anton.className} font-semibold capitalize text-xl text-[var(--darkDashTxt,rgba(0,0,0,0.8))] border-b border-b-black/20 focus:outline-none focus:border-b-black/40`} placeholder="title" onChange={(event)=>{handleInput(event,stateIndex)}}/>:

        <textarea name={name ?? ""} value={typeof value == "string" ? value : ""} className={`${jost.className} text-base text-[var(--darkDashTxt,rgba(0,0,0,0.8))] h-[150px] w-full border border-black/20 rounded-xl focus:outline-none focus:border-black/40 px-2 py-4`} placeholder="write short description" onChange={(event)=>{handleInput(event,stateIndex)}}></textarea>
    }

    const handleInput=(event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,index:number|null)=>{
        const {name,value} = event.target;

        const files = (event.target as HTMLInputElement).files;

        if(index !== null){
            setRoleArray(prev=>{
                const update = [...prev];

                update[index] = {
                    ...update[index],
                    [name] : files?.[0] ? files[0] : value
                }

                return update;
            })
        }else{
            if(name == "mainheadline" || name == "subheadline"){
                setHeadingContainer(prev=>({...prev,[name]:value}))
            }else{
                if(files?.[0]){
                    setRoleContainer(prev=>({...prev,[name]:files?.[0]}))
                }else{
                    setRoleContainer(prev=>({...prev,[name]:value}))
                }
            }
        }

        console.log(index);
    }

    const headlineAdd=()=>{
        const copy = headingContainer;

        setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,fullLoad:true}}));

        formDataConverter(copy,(formData)=>addHeadline.mutate(formData));
    }

    const headlineUpdate=()=>{
        const copy = headingContainer;

        setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,fullLoad:true}}));
        formDataConverter(copy,(formData)=>updateHeadline.mutate(formData))
    }

    const roleAdd=()=>{
        const copy = roleContainer;

        setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,fullLoad:true}}));

        formDataConverter(copy,(formData)=>addRole.mutate(formData));

        setRoleArray(prev=>([...prev,roleContainer]));

        setRoleContainer({id:null,logo:null,title:null,description:null,previousLogo:null})
    }

    const roleUpdate=(tableId:string|null)=>{
        const copy = roleArray.filter(items=>items.id == tableId)[0];

        setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,fullLoad:true}}));
        formDataConverter(copy,(formData)=>{updateRole.mutate(formData)});
    }

    const roleRemove=(tableId:string,imgId:string|null)=>{
        const obj = {tableId,imgId};

        setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,fullLoad:true}}));

        removeRole.mutate(obj)
    }

    const selectCurrentPage=(page:number)=>{
        const skip = (page * 5) === 5 ? 0 : pageConfig.currentPage * 5;

        setPageConfig(prev=>({currentPage:page,offset:skip}))
    }

    useEffect(()=>{
        if(headlineData){
            setHeadingContainer(headlineData)
        }
    },[headlineData]);

    useEffect(()=>{
        if(roleData){
            const update = roleData.userData.map((items:RoleContainerType)=>({...items,logo:null,previousLogo:items.logo}))

            setRoleArray(update);
        }
    },[roleData])
    return(
        <>
        <DashLoading/>
        <AlertModal/>
        <div className="mt-5">
            <h2 className={`${caprasimo.className} text-6xl capitalize text-[var(--darkDashTxt,rgba(0,0,0,0.8))] relative after:absolute after:h-2 after:w-[25%] after:bg-rose-500 after:bottom-[-10px] after:left-0`}>
                Brief your role.
            </h2>
        </div>

        <div className="mt-5">
            <div className="flex flex-row items-center w-full gap-x-5">
                <div className="w-[30%]">
                    <label htmlFor="mainheadline" className={`${anton.className} text-[var(--darkDashTxt,rgba(0,0,0,0.8))] text-xl font-semibold`}>main headline</label>

                    <div className="w-full h-[50px] mt-4">
                        <input type="text" name="mainheadline" value={headingContainer.mainheadline ?? ""} id="mainheadline" className={`${jost.className} text-[var(--darkDashTxt,rgba(0,0,0,0.8))] font-medium px-4 placeholder:text-[var(--darkDashTxt,rgba(0,0,0,0.5))] placeholder:px-4 focus:outline-none focus:border-black/40 h-full w-full border border-black/20 rounded-xl`} placeholder="main headline" onChange={(event)=>{handleInput(event,null)}}/>
                    </div>
                </div>

                <div className="w-[30%]">
                    <label htmlFor="subheadline" className={`${anton.className} text-[var(--darkDashTxt,rgba(0,0,0,0.8))] text-xl font-semibold`}>sub headline</label>

                    <div className="w-full h-[50px] mt-4">
                        <input type="text" name="subheadline" value={headingContainer.subheadline ?? ""} id="subheadline" className={`${jost.className} text-[var(--darkDashTxt,rgba(0,0,0,0.8))] font-medium px-4 placeholder:text-[var(--darkDashTxt,rgba(0,0,0,0.5))] placeholder:px-4 focus:outline-none focus:border-black/40 h-full w-full border border-black/20 rounded-xl`} placeholder="sub headline" onChange={(event)=>{handleInput(event,null)}}/>
                    </div>
                </div>
                {
                    headlineData?.id ?
                    <div className="mt-10">
                    <button type="button" className={`${jost.className} text-white font-medium px-2 py-3 rounded-xl bg-[#3498db] transition-all duration-200 ease-linear hover:bg-[#2980b9] hover:cursor-pointer`} onClick={headlineUpdate}>
                        update headline
                    </button>
                    </div>:
                    <div className="mt-10">
                    <button type="button" className={`${jost.className} text-white font-medium px-2 py-3 rounded-xl bg-[#2ecc71] transition-all duration-200 ease-linear hover:bg-[#27ae60] hover:cursor-pointer`} onClick={headlineAdd}>
                        add headline
                    </button>
                </div>
                }
                
            </div>
        </div>

        <div className="grid grid-cols-3 gap-x-5 gap-y-10 mt-5">
            {
                roleArray?.map((items,index)=>{
                    return <div key={index}>
                        <div className="px-5 py-5 rounded-xl shadow-[1px_2px_5px_rgba(0,0,0,0.2),inset_-1px_0px_2px_rgba(0,0,0,0.1)] space-y-5">
                            <div>
                                <div className="h-12 w-12 border border-black/20 rounded-lg relative overflow-hidden">
                                    {reusableInput("fileCategory",`logoupload${index}`,"file","image/*","logo",`logoupload${index}`,items.logo?items.logo:items.previousLogo,index)}
                                </div>
                            </div>
                            <div>
                                <div className="h-5 w-[80%]">
                                    {reusableInput("textCategory",null,"text",null,"title",null,items.title,index)}
                                </div>
                            </div>
                            <div>
                                {reusableInput("textareaCategory",null,null,null,"description",null,items.description,index)}
                            </div>
                        </div>

                        <div className="w-full flex justify-end gap-x-5 mt-5">
                         <button type="button" className={`${jost.className} text-white font-medium px-2 py-1 rounded-xl bg-[#3498db] transition-all duration-200 ease-linear hover:bg-[#2980b9] hover:cursor-pointer`} onClick={()=>{roleUpdate(items.id)}}>
                            update role
                        </button>

                        <button type="button" className={`${jost.className} text-white font-medium px-2 py-1 rounded-xl bg-[#ff6b6b] transition-all duration-200 ease-linear hover:bg-[#ee5253] hover:cursor-pointer`} onClick={()=>{roleRemove(items.id!,typeof items.previousLogo == "string" ? items.previousLogo : null)}}>
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
                                    {reusableInput("fileCategory","logoupload","file","image/*","logo","logoupload",roleContainer.logo,null)}
                                </div>
                            </div>
                            <div>
                                <div className="h-5 w-[80%]">
                                    {reusableInput("textCategory",null,"text",null,"title",null,roleContainer.title,null)}
                                </div>
                            </div>
                            <div>
                                {reusableInput("textareaCategroy",null,null,null,"description",null,roleContainer.description,null)}
                            </div>
            </div>

            <div className="w-full flex justify-end mt-5">
                <button type="button" className={`${jost.className} text-white font-medium px-2 py-1 rounded-xl bg-[#2ecc71] transition-all duration-200 ease-linear hover:bg-[#27ae60] hover:cursor-pointer`} onClick={roleAdd}>
                    add role
                </button>
            </div>
            </div>
        </div>

        {
            roleLoading?
            <div>
                loading will update soon...
            </div>:
            roleError?
            <div>
                error message will update soon...
            </div>:
            <Pagination 
            totalPage={roleData?.totalPage ?? null}
            currentPage={pageConfig.currentPage}
            currentPageSelection={(value)=>{selectCurrentPage(value)}}
            />
        }
        </>
    )
}