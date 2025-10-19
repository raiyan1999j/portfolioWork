import Details from "./details";

type PagesProps = {
    params: {projectview:string}
    searchParams:{data?:string}
}

export default function Projectview({params,searchParams}:PagesProps){
    const passedData = searchParams.data? JSON.parse(searchParams.data) : null

    return(
        <>
        <Details projectInfo={passedData}/>
        </>
    )
}