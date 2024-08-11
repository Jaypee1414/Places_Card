import Places from './Places.jsx';
import {sortPlacesByDistance} from '../loc.js'
import Error from '../Error.jsx'
import {handleDataPlaces} from '../FetchData.js'
import {useFetch} from '../hooks/useFetch.js'

async function FetchPlacesData(){
  const Fetchaplaces = await handleDataPlaces()
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position)=>{
      const places = sortPlacesByDistance(Fetchaplaces , position.coords.latitude, position.coords.longitude)
      resolve(places)
    })
  })
}

export default function AvailablePlaces({ onSelectPlace }) {

  const {userPlaces: availablePlaces, error,loading: isLoading} = useFetch(FetchPlacesData,[])
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
