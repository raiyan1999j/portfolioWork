export function formDataConverter(copy:any,fn:(formData:FormData)=>void){
    const formData = new FormData();

    Object.entries(copy).forEach(([key,value])=>{
        if(typeof value === "string"){
            formData.append(key,value)
        }

        if(value instanceof File){
            formData.append(key,value)
        }
    });

    fn(formData)
}