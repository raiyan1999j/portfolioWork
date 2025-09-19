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
type ContextType = {
    setCombine : (color:string|null)=>void,
    setModeEnable : React.Dispatch<React.SetStateAction<DarkModeTypes>>,
    setPageLoader: React.Dispatch<React.SetStateAction<PageLoaderType>>
    pageLoader: PageLoaderType,
    darkMode: DarkModeTypes,
}

export const InfoProvider = createContext<ContextType|null>(null);

export default function ContextProvider({children}:ChildrenTypes){
    const pathname = usePathname();

    const [pageLoader,setPageLoader] = useState({
        clientSide:false,
        dashboard : false
    })

    const [combineColor,setCombine] = useState<string|null>("#FDBB2E");
    
    const [darkMode,setModeEnable] = useState<DarkModeTypes>({
        clientSide:false,
        dashboard:false
    })
    
    const infoContainer = {darkMode,pageLoader,setCombine,setModeEnable,setPageLoader}

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