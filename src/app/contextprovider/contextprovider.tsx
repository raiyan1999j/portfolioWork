"use client";
import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react"

type ChildrenTypes = {
    children : React.ReactNode
}
type DarkModeTypes = {
    clientSide: boolean,
    dashboard : boolean
}

type PageLoaderType = {
    clientSide : boolean,
    dashboard : boolean
}

type ContentLoaderType = {
    clientSide:boolean,
    dashboard:{
        fullLoad:boolean,
        partialLoad:boolean
    }
}

type MessageTypeInfo = "success"|"info"|"warning"|"danger"|"neural";

type ModalInfoType = {
    id: number | null,
    messageType: MessageTypeInfo,
    message:string
}

type ContextType = {
    setCombine : (color:string|null)=>void,
    setModeEnable : React.Dispatch<React.SetStateAction<DarkModeTypes>>,
    setPageLoader: React.Dispatch<React.SetStateAction<PageLoaderType>>,
    setContentLoader: React.Dispatch<React.SetStateAction<ContentLoaderType>>,
    setModalInfo : React.Dispatch<React.SetStateAction<ModalInfoType[]>>,
    handleModal : (messageType:MessageTypeInfo,message:string)=>void;
    modalInfo: ModalInfoType[],
    pageLoader: PageLoaderType,
    contentLoader: ContentLoaderType,
    darkMode: DarkModeTypes,
}

export const InfoProvider = createContext<ContextType|null>(null);

export default function ContextProvider({children}:ChildrenTypes){
    const pathname = usePathname();
    let localCoutner = 0;

    const [pageLoader,setPageLoader] = useState({
        clientSide:false,
        dashboard : false
    });

    const [contentLoader,setContentLoader] = useState({
        clientSide:false,
        dashboard: {
            fullLoad:false,
            partialLoad:false
        }
    })

    const [combineColor,setCombine] = useState<string|null>("#FDBB2E");
    
    const [darkMode,setModeEnable] = useState<DarkModeTypes>({
        clientSide:false,
        dashboard:false
    })
    
    const [modalInfo,setModalInfo] = useState<ModalInfoType[]>([]);

    const handleModal=(messageType:MessageTypeInfo,message:string)=>{
        const newArrivalId = Date.now() + localCoutner++;
        const newModal = {id:newArrivalId,messageType,message};

        setModalInfo(prev=>[...prev,newModal]);

        setTimeout(()=>{
            setModalInfo(prev=>prev.filter(items=>items.id !== newArrivalId))
        },2000);
    }

    const infoContainer = {darkMode,pageLoader,modalInfo,contentLoader,setModalInfo,setCombine,setModeEnable,setPageLoader,setContentLoader,handleModal}

    useEffect(()=>{
        document.documentElement.style.setProperty('--combineColor',combineColor)

        if(darkMode.clientSide){
            document.documentElement.style.setProperty('--darkBg','#34495e');
            document.documentElement.style.setProperty('--darkTxt','white');
        }else{
            document.documentElement.style.removeProperty('--darkBg');
            document.documentElement.style.removeProperty('--darkTxt');
        }

        if(darkMode.dashboard){
            document.documentElement.style.setProperty('--darkDashBg','#34495e');
            document.documentElement.style.setProperty('--darkDashTxt','white');
        }else{
            document.documentElement.style.removeProperty('--darkDashBg');
            document.documentElement.style.removeProperty('--darkDashTxt');
        }
    },[combineColor,darkMode]);

    useEffect(()=>{
        if(pathname){
            setPageLoader({clientSide:false,dashboard:false})
        }
    },[pathname])
    return(
        <>
        
        <InfoProvider.Provider value={infoContainer}>
            {children}
        </InfoProvider.Provider>
        </>
    )
}