"use client";
import { createContext, useEffect, useState } from "react"

type ChildrenTypes = {
    children : React.ReactNode
}

type ContextType = {
    setCombine : (color:string|null)=>void,
    setModeEnable :(value:boolean)=>void,
    darkMode: boolean
}

export const InfoProvider = createContext<ContextType|null>(null);

export default function ContextProvider({children}:ChildrenTypes){
    const [combineColor,setCombine] = useState<string|null>("#f9ca24");
    const [darkMode,setModeEnable] = useState(false);
    
    const infoContainer = {darkMode,setCombine,setModeEnable}

    useEffect(()=>{
        document.documentElement.style.setProperty('--combineColor',combineColor)

        if(darkMode){
            document.documentElement.style.setProperty('--darkBg','#34495e');
            document.documentElement.style.setProperty('--darkTxt','white');
        }else{
            document.documentElement.style.removeProperty('--darkBg');
            document.documentElement.style.removeProperty('--darkTxt');
        }
    },[combineColor,darkMode])
    return(
        <>
        
        <InfoProvider.Provider value={infoContainer}>
            {children}
        </InfoProvider.Provider>
        </>
    )
}