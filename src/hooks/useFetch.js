import { useEffect,useState } from "react"


export function useFetch(handleUserDataPlaces, initialValue){
    const [loading , setLoading] = useState(false)
    const [userPlaces, setUserPlaces] = useState(initialValue);
    const [error, setError] = useState()
  useEffect(()=>{
    async function fetchData(){
      setLoading(true)
      try {
        const places = await handleUserDataPlaces()
        setUserPlaces(places)
      } catch (error) {
        setError({message: "Failed to fetch Data places. Please try again later ..." || error.message})
      }
      setLoading(false)
    }
    fetchData()
  },[])
  return {
    loading, 
    userPlaces,
    error,
    setUserPlaces,
    setLoading
}
}
