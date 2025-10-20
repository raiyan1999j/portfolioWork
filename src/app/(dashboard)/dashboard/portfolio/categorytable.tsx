"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Anton, Caprasimo, Jost } from "next/font/google";
import DashLoading from "../../loading";
import { useContext, useEffect, useState } from "react";
import { InfoProvider } from "@/app/contextprovider/contextprovider";
import { AiFillEdit } from "react-icons/ai";
import { MdOutlineAssignment, MdOutlineDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { formDataConverter } from "@/lib/helper";
import { useRouter } from "next/navigation";
import ProjectTable from "./projecttable";
import { IoIosEye } from "react-icons/io";
import { FaEyeLowVision } from "react-icons/fa6";

type CategoryData = {
    id:string,
    title: string | null
}

const caprasimo = Caprasimo({
    subsets:["latin"],
    weight:['400']
})

const anton = Anton({
    subsets:["latin"],
    weight:["400"]
});

const jost = Jost({
    subsets:["latin"]
})

export default function CategoryTable(){
    const context = useContext(InfoProvider);

    if(!context) throw new Error("context error");

    const {setPageLoader,setContentLoader,handleModal} = context;

    const querylient = useQueryClient();

    const router = useRouter();
    const [editArray,setEditArray] = useState<number[]>([]);
    const [categoryData,setCategoryData] = useState<{id:string,title:string|null}[]>([]);
    const [selectedCategory,setSelecteCategory] = useState<string|null>(null);

    const {isLoading:categoryLoad,isError:categoryError,data:category} = useQuery<CategoryData[]>({
        queryKey:["categoryData"],
        queryFn:async()=>{
            const getData = await axios("/api/categoryget");
            const response= getData.data.data;

            setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,partialLoad:false}}));

            return response;
        }
    });

    const {isLoading:projectLoad,isError:projectError,data:projectData} = useQuery({
        queryKey:["projectData",selectedCategory],
        queryFn:async()=>{
            const getData = selectedCategory ? await axios(`/api/projectget?parenttable=${selectedCategory}`) : null;

            const response= getData?.data ?? null;

            setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,partialLoad:false}}));

            return response;
        }
    })

    const updateCategory = useMutation({
        mutationFn:async(formData:FormData)=>{
            const putData = await axios.put("/api/categoryupdate",formData);
            const response= putData;

            if(response.status === 200){
                setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,fullLoad:false}}))
                handleModal("info",response.data.message);
            }else{
                setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,fullLoad:false}}))
                handleModal("danger",response.data.message)
            }
        },

        onSuccess:()=>{querylient.invalidateQueries({queryKey:["categoryData"]})}
    });

    const removeCategory = useMutation({
        mutationFn:async(idNum:string)=>{
            const removeData = await axios.delete(`/api/categoryremove?tableId=${idNum}`);

            if(removeData.status === 200){
                handleModal("warning",removeData.data.message);

                setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,fullLoad:false}}));
            }else{
                handleModal("danger",removeData.data.message);

                setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,fullLoad:false}}));
                
            }
        },
        onSuccess:()=>{querylient.invalidateQueries({queryKey:["categoryData"]})}
    })
    
    const categoryUpdate=(indexNum:number)=>{
            if(editArray.includes(indexNum)){
                const copy = categoryData[indexNum];

                formDataConverter(copy,null,(formData:FormData)=>{updateCategory.mutate(formData)});

                setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,fullLoad:true}}))
                setEditArray(prev=>prev.filter(items=>items !== indexNum));
            }else{
                setEditArray(prev=>([...prev,indexNum]))
            }
    }

    const inputHandler=(event:React.ChangeEvent<HTMLInputElement>,id:number)=>{
        const {name,value} = event.target;

        setCategoryData(prev=>prev.map((items,index)=>{
            if(index === id){
                return {...items,[name]:value}
            }

            return {...items}
        }))
    }

    const selectParenttable=(idNum:string)=>{
        if(selectedCategory === idNum){
            setSelecteCategory(null)
        }else{
            setSelecteCategory(idNum);
        }
        
        setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,partialLoad:true}}));
    }

    const navigatePage=(idNum:string)=>{
        const projectData = {
            type:"parenttable",
            id:idNum
        }

        const searchParams = new URLSearchParams({
            data: JSON.stringify(projectData)
        })

        router.push(`/dashboard/projectview/details?${searchParams}`);

        setPageLoader(prev=>({...prev,dashboard:true}));
    }

    const categoryRemove=(idNum:string)=>{
        removeCategory.mutate(idNum);

        setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,fullLoad:true}}))
    }

    useEffect(()=>{
        if(category){
            setCategoryData(category)
        }
    },[category])

    useEffect(()=>{
        setContentLoader(prev=>({...prev,dashboard:{...prev.dashboard,partialLoad:true}}));
    },[]);
    return(
        <>
        <div className="mt-20">
            <h2 className={`${caprasimo.className} text-6xl capitalize text-[var(--darkDashTxt,rgba(0,0,0,0.8))] relative after:absolute after:h-2 after:w-[20%] after:bg-rose-500 after:bottom-[-10px] after:left-0`}>
                category table
            </h2>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-x-10">
            <div className="w-full rounded-xl">
                {
                    categoryLoad?
                    <div className="relative h-[300px] w-full">
                        <DashLoading/>
                    </div>:
                    categoryError?
                    <div>
                        <h2>
                            error message will update soon
                        </h2>
                    </div>:
                    category?
                    <table className="w-full border border-[#2ecc71]">
                    <thead className={`${anton.className} uppercase text-white bg-[#2ecc71]`}>
                        <tr>
                            <th className="py-2.5 w-[20%]">
                                serial
                            </th>
                            <th className="py-2.5 w-[40%]">
                                title
                            </th>
                            <th className="py-2 w-[40%]">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoryData.map((items,index)=>{
                            return <tr key={index} className={`${jost.className} text-[#2ecc71]/80 font-medium even:bg-[#2ecc71]/20 transition-all duration-150 ease-linear hover:text-[#27ae60] hover:font-bold`}>
                                <td className="py-2.5 text-center">
                                    {index + 1}
                                </td>
                                <td className="py-2.5 text-center">
                                    {
                                        editArray.includes(index) ?
                                        <input type="text" name="title" value={items.title??""} className="border-b border-b-[#2ecc71]/20 px-2 focus:outline-none focus:border-b-[#2ecc71]" autoComplete="off" onChange={(event)=>{inputHandler(event,index)}}/>:
                                        items.title
                                    }
                                </td>
                                <td className="flex flex-row justify-center items-center w-full py-2.5 gap-x-10 text-2xl text-gray-500">
                                    {
                                        editArray.includes(index) ?
                                        <button className="transition-all duration-150 ease-linear hover:text-[#3498db] hover:scale-125" onClick={()=>{categoryUpdate(index)}}>
                                            <FaCheck />
                                        </button>:
                                        <button className="transition-all duration-150 ease-linear hover:text-[#27ae60] hover:scale-125" onClick={()=>{categoryUpdate(index)}}>
                                        <AiFillEdit />
                                        </button>
                                    }
                                    <button className="transition-all duration-150 ease-linear hover:text-[#27ae60] hover:scale-125" onClick={()=>{navigatePage(items.id)}}>
                                        <MdOutlineAssignment />
                                    </button>

                                    <button className="transition-all duration-150 ease-linear hover:text-[#e74c3c] hover:scale-125" onClick={()=>{categoryRemove(items.id)}}>
                                        <MdOutlineDelete />
                                    </button>
                                    
                                    <button onClick={()=>{selectParenttable(items.id)}}>
                                        {
                                            selectedCategory === items.id ?
                                            <FaEyeLowVision />:
                                            <IoIosEye />
                                        }
                                        
                                    </button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>:
                null
                }
                
            </div>

            <div>
                {
                    projectLoad?
                    <DashLoading/>:
                    projectError?
                    <div>
                        <h4>
                            error message will update soon
                        </h4>
                    </div>:
                    projectData?
                    <ProjectTable projectInfo={projectData}/>:
                    null
                }
            </div>
        </div>
        </>
    )
}