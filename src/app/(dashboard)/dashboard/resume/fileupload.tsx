import { Jost } from "next/font/google";
import { FiUploadCloud } from "react-icons/fi";
import { GrClearOption } from "react-icons/gr";

const jost = Jost({
    subsets:["latin"]
});

export default function FileUpload(){
    return(
        <>
        <div className="flex flex-row justify-end mt-5">
            <div className="flex flex-col items-center gap-y-2.5">
                <div className="h-[150px] w-[120px] border border-black/20 rounded-lg">

                </div>

                <div className="flex flex-row justify-center gap-x-2.5">
                    <button type="button" className={`${jost.className} flex flex-row gap-x-1.5 items-center text-sm text-sky-500 border border-black/5 px-2.5 rounded-xl transition-all duration-150 ease-linear hover:bg-sky-500 hover:text-white`}>
                        upload
                        <span>
                            <FiUploadCloud />
                        </span>
                    </button>
                    
                    {/* <button className={`${jost.className} flex flex-row gap-x-1.5 items-center text-sm text-rose-500 border border-black/5 px-2.5 rounded-xl transition-all duration-150 ease-linear hover:bg-rose-500 hover:text-white`}>
                        clear
                        <span>
                            <GrClearOption />
                        </span>
                    </button> */}
                </div>
            </div>
        </div>
        </>
    )
}