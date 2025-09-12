"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

type ChildrenTypes = {
    children : React.ReactNode
}

const queryClinet = new QueryClient();

export default function QueryProvider({children}:ChildrenTypes){
    return(
        <>
        <QueryClientProvider client={queryClinet}>
            {children}
        </QueryClientProvider>
        </>
    )
}