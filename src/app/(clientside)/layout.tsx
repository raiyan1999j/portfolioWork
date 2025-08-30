import SideNav from "./sidenav/page"

type Children = {
    children : React.ReactNode
}

export default function ClientLayout({children}:Children){
    return(
        <>
        <section>
            <div className="grid grid-cols-12 w-full">
                <div className="col-span-3">
                    <SideNav/>
                </div>

                <div className="col-span-9">
                    {children}
                </div>
            </div>
        </section>
        </>
    )
}