
export async function getPopularEvents(){
   const res = await fetch("")
   if (!res.ok) {
    throw {
        message:"Failed to fetch popular events",
        statusText: res.statusText,
        status:res.status
    }
   }
   const data = await res.json()
   return data.vans

}