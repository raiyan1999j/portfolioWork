"use client";
import AlertModal from "@/app/component/ui/alertmodal";
import { formDataConverter } from "@/lib/helper";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Anton, Caprasimo, Jost } from "next/font/google";
import { useContext, useState } from "react";
import DashLoading from "../../loading";
import { InfoProvider } from "@/app/contextprovider/contextprovider";

const caprasimo = Caprasimo({
    subsets:["latin"],
    weight:['400']
});

const anton = Anton({
    subsets:["latin"],
    weight:["400"]
});

const jost = Jost({
    subsets:["latin"]
});

export default function CreateCategory(){
    const context = useContext(InfoProvider);

    if(!context) throw new Error("context error");

    const {handleModal,setContentLoader} = context;

    const [inputData,setInputData] = useState<{title:string|null}>({
        title: null
    });

    const addCategroy = useMutation({
        mutationFn:async(formData:FormData)=>{
            const postData = await axios.post("/api/categoryadd",formData);
            const response = postData;
            
            if(response.status === 200){
                setContentLoader(prev=>({...prev,dashboard:false}));
                handleModal("success",response.data.message);
            }else{
                setContentLoader(prev=>({...prev,dashboard:false}))
                handleModal("danger",response.data.message)
            }
            return response;
        }
    })

    const formHandler=(event: { preventDefault: () => void; })=>{
        event.preventDefault();

        setContentLoader(prev=>({...prev,dashboard:true}));

        formDataConverter(inputData,(formData:FormData)=>addCategroy.mutate(formData));

        setInputData({title:null})
    }

    const inputHandler=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = event.target;

        setInputData({title:value});
    }
    return(
        <>
        <DashLoading/>
        <AlertModal/>
        <div className="flex flex-row justify-end">
            <h2 className={`${caprasimo.className} text-6xl capitalize text-[var(--darkDashTxt,rgba(0,0,0,0.8))] relative after:absolute after:h-2 after:w-[70%] after:bg-rose-500 after:bottom-[-10px] after:right-0`}>
                add new category
            </h2>
        </div>

        <div className="w-[50%] mt-20">
            <form onSubmit={formHandler}>
                <div className="flex flex-row items-center gap-x-5">
                    <div className="h-[50px] w-full">
                        <input type="text" name="title" value={inputData.title??""} className={`${jost.className} w-full h-full px-5 border border-[#2ecc71]/20 rounded-xl placeholder:text-black/20 placeholder:capitalize placeholder:font-normal placeholder:text-shadow-none font-bold text-xl text-[#2ecc71] text-shadow-black/50 text-shadow-2xs focus:outline-none focus:border-[#2ecc71]/80`} placeholder="create category" autoComplete="off" onChange={inputHandler}/>
                    </div>

                    <div>
                        <button className={`${anton.className} px-5 py-2.5 bg-[#2ecc71] rounded-2xl text-white transition-all duration-150 ease-linear hover:bg-[#27ae60] hover:shadow-md hover:shadow-[#16a085]`}>
                            create
                        </button>
                    </div>
                </div>
            </form>
        </div>
        </>
    )
}