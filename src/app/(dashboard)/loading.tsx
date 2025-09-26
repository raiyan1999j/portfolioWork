"use client";
import { useContext } from "react"
import { InfoProvider } from "../contextprovider/contextprovider"

export default function DashLoading(){
    const context = useContext(InfoProvider);

    if(!context) throw new Error("context error");

    const {pageLoader,contentLoader} = context;
    return( 
        <>
        {
            pageLoader.dashboard || contentLoader.dashboard?
            <div className={`fixed top-0 left-0 h-full w-screen flex justify-center items-center ${contentLoader.dashboard?"bg-white/40":"bg-white/80"} z-50`}>
                <div className="loader"></div>
            </div>:
            null
        }
        </>
    )
}