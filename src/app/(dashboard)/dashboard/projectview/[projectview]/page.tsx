import Details from "./details";

export default function Projectview({params}:{params:{projectview:string}}){
    const projectId = params.projectview;
    return(
        <>
        <Details/>
        </>
    )
}