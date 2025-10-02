export function refactor<T>(obj:[string,T][],customName:string|null){
    const convertData = obj.reduce((acc,current)=>{
        const [key,value] = current;

        if((/\d/).test(key)){
            if(customName){
                if(!acc[customName]) acc[customName] = [];

                if(value instanceof File){
                    acc[customName].push(value)
                }else{
                    acc[customName].push(value!.toString())
                }
            }
        }else{
            (acc as any)[key] = value;
        }

        return acc;
    },{} as Record<string,any>)

    return convertData;
}

export function formDataConverter(copy:any,customName:string|null,fn:(formData:FormData)=>void){
    const formData = new FormData();

    Object.entries(copy).forEach(([key,value])=>{
        if(typeof value === "string"){
            formData.append(key,value)
        }

        if(value instanceof File){
            formData.append(key,value)
        }

        if(Array.isArray(value)){
            value.forEach((items,index)=>{
                if(items instanceof File){
                    formData.append(`${customName}${index}`,items)
                }else{
                    formData.append(`${customName}${index}`,items)
                }
            })
        }
    });

    fn(formData)
}