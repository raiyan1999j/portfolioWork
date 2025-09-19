import Header from "./dashboard/header/header"
import Sidenav from "./dashboard/sidenav/sidenav"
import DashLoading from "./loading"

type ChildrenType = {
    children: React.ReactNode
}

export default function DashboarLayout({children}:ChildrenType){
    return(
        <>
        <section className="px-10 border-b border-b-gray-300 fixed z-50 top-0 left-0 w-full bg-[var(--darkDashBg,white)]">
            <Header/>
        </section>

        <section className="">
            <Sidenav/>
        </section>

        <section className="h-full w-full bg-[var(--darkDashBg,white)] py-[68px] px-10">
            <DashLoading/>
            {children}
        </section>
        </>
    )
}