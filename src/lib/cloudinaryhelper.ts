import cloudinary from "./cloudinaryconfig";

export async function imageUpload(currentImg: FormDataEntryValue | null,previousImg: FormDataEntryValue | null){
    if(currentImg instanceof File){
    const bytes = await currentImg.arrayBuffer();
    const buffer= Buffer.from(bytes);

    if(typeof previousImg == "string"){
        await cloudinary.uploader.destroy(previousImg);
    }

    const upload:any = await new Promise((resolve,reject)=>{
        const stream = cloudinary.uploader.upload_stream(
            {folder:"portfolio"},
            (error,result)=>{
                if(error) reject(error);

                else resolve(result)
            }
        );

        stream.end(buffer)
    });

        return  upload.public_id;
    }else{
        return  previousImg;
    }
}

export async function imgUploadArray(imgcontainer:File[]|null){

    if(imgcontainer){
        const container = await Promise.all(imgcontainer.map(async(items,index)=> await imageUpload(items,null)));

        return container;
    }
}