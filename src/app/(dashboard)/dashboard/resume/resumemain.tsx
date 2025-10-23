import FileUpload from "./fileupload";
import Introduce from "./introduce";
import WorkSkill from "./workskill";


export default function ResumeMain(){
    return(
        <>
        <FileUpload/>
        <Introduce/>
        <span className="block h-[1px] w-full bg-black/10 mt-[80px]"></span>
        <WorkSkill/>
        </>
    )
}