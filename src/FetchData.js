export async function handleDataPlaces (){
    const dataplaces = await fetch('http://localhost:3000/places')
    const response = await dataplaces.json()
    if(!dataplaces.ok){
    throw new Error("Failed to fetch places")   
    }
    return response.places
}

export async function fetchDataplaces(places){
    const response = await fetch('http://localhost:3000/user-places',{
        method: 'PUT',
        body: JSON.stringify({places}),
        headers: {
            'Content-type' : 'application/json'
        }
    })

    const resData = await response.json();

    if (!response.ok) {
        throw new Error('Failed to insert a new data places, Please Try again Later.')
    }

    return resData.message
}
