import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import axios from 'axios';
import {sortPlacesByDistance} from '../loc.js'
import Error from '../Error.jsx'
import handleDataPlaces from '../FetchData.js'
export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePalces] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error , setError] = useState();

  // fetch('http://localhost:3000/places').then((res)=>{
  //   return res.json()
  // }).then((data)=>{
  //   setAvailablePalces(data.places)
  // })

  useEffect(()=>{
    const FetchData = async()=>{
    setIsLoading(true)
     try {
      const response = await handleDataPlaces();
      navigator.geolocation.getCurrentPosition((position)=>{
        const places = sortPlacesByDistance(response , position.coords.latitude, position.coords.longitude)
        setAvailablePalces(places)
        setIsLoading(false)
      })
     } catch (error) {
      setError({message : "Failed to fetch the data, Please try again later" || error.messsage})
      setIsLoading(false)
     }
    }
    FetchData()
  },[])

  if(error){
    return <Error title="An error Occured!" message={error.message}/>
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isLoading}
      loadingtext="Fetching data places ..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
