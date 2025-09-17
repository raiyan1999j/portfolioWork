import cloudinary from "./cloudinaryconfig";

export function refactor<T>(obj:[string,T][]){
    const convertData = obj.reduce((acc,current)=>{
        const [key,value] = current;

        if((/\d/).test(key)){
            if(!acc.skills) acc.skills = [];

            if(typeof value == "string"){
                acc.skills.push(value.toString())
            }
        }else{
            (acc as any)[key] = value;
        }

        return acc;
    },{} as {skills?: string[]});

    return convertData;
}

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
        return  null;
    }
}