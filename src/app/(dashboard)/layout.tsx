import Header from "./dashboard/header/header"
import Sidenav from "./dashboard/sidenav/sidenav"

type ChildrenType = {
    children: React.ReactNode
}

export default function DashboarLayout({children}:ChildrenType){
    return(
        <>
        <section className="px-10 border-b border-b-gray-300 fixed top-0 left-0 w-full bg-[var(--darkDashBg,transparent)]">
            <Header/>
        </section>

        <section className="">
            <Sidenav/>
        </section>

        <section className="h-screen w-full bg-[var(--darkDashBg,white)]">

        </section>
        </>
    )
}