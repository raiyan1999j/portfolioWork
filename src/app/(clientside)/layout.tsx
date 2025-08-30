import SideNav from "./sidenav/page"

type Children = {
    children : React.ReactNode
}

export default function ClientLayout({children}:Children){
    return(
        <>
        <section>
            <div className="grid grid-cols-12">
                <div className="col-span-2">
                    <SideNav/>
                </div>

                <div className="col-span-10">
                    {children}
                </div>
            </div>
        </section>
        </>
    )
}