"use client";
import { useContext } from "react"
import { InfoProvider } from "../contextprovider/contextprovider"

export default function DashLoading(){
    const context = useContext(InfoProvider);

    if(!context) throw new Error("context error");

    const {contentLoader} = context;
    return( 
        <>
        {
            contentLoader.dashboard.fullLoad?
            <div className={`fixed top-0 left-0 h-full w-screen flex justify-center items-center bg-white/40 z-50`}>
                <div className="loader"></div>
            </div>:
            null
        }

        {
            contentLoader.dashboard.partialLoad?
            <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center z-50">
                <div className="loader"></div>
            </div>:
            null
        }
        </>
    )
}