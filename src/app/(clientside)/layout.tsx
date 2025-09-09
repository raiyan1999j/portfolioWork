import Settings from "./pages/settings/settings"
import SideNav from "./sidenav/sidenav"


type Children = {
    children : React.ReactNode
}

export default function ClientLayout({children}:Children){
    return(
        <>
        <section className="">
            <div className="grid grid-cols-12 w-full">
                <div className="col-span-3">
                    <SideNav/>
                </div>

                <div className="col-span-9 bg-[var(--darkBg,white)] h-screen w-full">
                    <Settings/>
                    {children}
                </div>
            </div>
        </section>
        </>
    )
}