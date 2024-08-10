export default async function handleDataPlaces (){
    const dataplaces = await fetch('http://localhost:3000/places')
    const response = await dataplaces.json()
    if(!dataplaces.ok){
    throw new Error("Failed to fetch places")   
    }
    return response.places
}