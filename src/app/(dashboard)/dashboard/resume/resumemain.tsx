import { Anton, Caprasimo, Jost } from "next/font/google";
import FileUpload from "./fileupload";


const anton = Anton({
    subsets:["latin"],
    weight:'400'
});

const caprasimo = Caprasimo({
    subsets:["latin"],
    weight:['400']
});

const jost = Jost({
    subsets:["latin"]
});

export default function ResumeMain(){
    return(
        <FileUpload/>
    )
}