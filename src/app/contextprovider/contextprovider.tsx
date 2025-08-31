"use client";
import { createContext, useEffect, useState } from "react"

type ChildrenTypes = {
    children : React.ReactNode
}

type ContextType = {
    combineColor : string|null
    setCombine : (color:string|null)=>void
}

export const InfoProvider = createContext<ContextType|null>(null);

export default function ContextProvider({children}:ChildrenTypes){
    const [combineColor,setCombine] = useState<string|null>("#f9ca24");
    
    const infoContainer = {combineColor,setCombine}
    return(
        <>
        
        <InfoProvider.Provider value={infoContainer}>
            {children}
        </InfoProvider.Provider>
        </>
    )
}