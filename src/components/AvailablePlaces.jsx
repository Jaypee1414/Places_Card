import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import axios from 'axios';
export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePalces] = useState([])

  // fetch('http://localhost:3000/places').then((res)=>{
  //   return res.json()
  // }).then((data)=>{
  //   setAvailablePalces(data.places)
  // })


  useEffect (()=>{
    const fecthData = async () =>{
      const data = await axios.get('http://localhost:3000/places')
      setAvailablePalces(data?.data)
  }
  fecthData();
  },[])

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
