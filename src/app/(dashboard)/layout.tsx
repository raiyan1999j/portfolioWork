import Header from "./dashboard/header/header"

type ChildrenType = {
    children: React.ReactNode
}

export default function DashboarLayout({children}:ChildrenType){
    return(
        <>
        <section className="px-10 border-b border-b-gray-300 fixed top-0 left-0 w-full">
            <Header/>
        </section>

        <section>
            
        </section>
        </>
    )
}