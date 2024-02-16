export const axiosOpts=(token)=>{
    return {
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }
}