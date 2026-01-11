
export async function getHomeData(){
   const res = await fetch("http://localhost:8082/api/v1/home")
   if (!res.ok) {
    throw {
        message:"Failed to fetch popular events",
        statusText: res.statusText,
        status:res.status
    }
   }
   const data = await res.json()
   return data
}
